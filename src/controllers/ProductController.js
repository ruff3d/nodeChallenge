const fetch = require('node-fetch');
const {ReviewService: {host: reviewHost}} = require('../config');

module.exports = class ProductController {
    constructor(router, logger) {
        this.logger = logger;
        this.initRoutes(router);
    }

    initRoutes(router) {
        router.get('/api/app/:product_id', this.getProduct);
    }

    async getProduct(req, res) {
        let token = await this.getToken('default', 'password');
        if (token) this.logger.info('GOT the token');
        this.logger.info(`Processing ${req.params.product_id}`);
        Promise.all([
            ProductController.request(`https://www.adidas.co.uk/api/products/${req.params.product_id}`),
            ProductController.request(`${reviewHost}/api/review-statistic/${req.params.product_id}?token=${req.query.token || token}`),
        ]).then(([product, rows]) => res.send({
            reviews: rows,
            product: product
        })).catch(err => res.send('Ops, something has gone wrong'))
    }

    static request(url, options = {method: 'GET', body: ''}) {
        return new Promise((resolve, reject) => {
            fetch(url, {accept: 'application/json', ...options})
                .then(res => res.json())
                .then(json => console.log(json))
                .then(data => resolve(data))
                .catch(err => reject(err))
        })
    }

    async getToken(user, password) {
        let authCreds = await ProductController.request(`${reviewHost}/api/authenticate`,
            {
                method: 'POST',
                body: {
                    user: user,
                    password: password
                }
            });
        if (authCreds.success) {
            return authCreds.token;
        }
    }
};