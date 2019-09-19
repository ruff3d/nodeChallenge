const fetch = require('node-fetch');
const {ReviewService: {host: reviewHost}} = require('../config');

module.exports = class ProductController {
    constructor(router, logger) {
        this.logger = logger;
        this.initRoutes(router);
    }

    initRoutes(router) {
        router.get('/api/app/:product_id', this.getProduct.bind(this));
    }

    async getProduct(req, res) {
        let token = await this.getToken('default', 'password');
        if (token) this.logger.info('GOT the token');
        this.logger.info(`Processing ${req.params.product_id}`);
        Promise.all([
            // this.request(`https://www.adidas.co.uk/api/products/${req.params.product_id}`),
            this.request(`https://swapi.co/api/people/1`), // just because fetch is unable to get the response for www.adidas.co.uk
            this.request(`${reviewHost}/api/review-statistic/${req.params.product_id}?token=${req.query.token || token}`),
        ]).then(([product, rows]) => res.json({
                reviews: rows,
                product: product
            })).catch(err => res.send('Ops, something has gone wrong'))
    }

    async request(url, options = {method: 'GET'}) {
        return fetch(url, {
            headers: {
                'Connection': 'keep-alive',
            },
            redirect: 'follow',
            accept: 'application/json', ...options
        }).then(res => res.json())

    }

    async getToken(user, password) {
        let urlencoded = new URLSearchParams();
        urlencoded.append("name", user);
        urlencoded.append("password", password);
        let authCreds = await this.request(`${reviewHost}/api/authenticate`,
            {
                method: 'POST',
                body: urlencoded
            });
        if (authCreds && authCreds.success) {
            return authCreds.token;
        } else {
            await this.request(`${reviewHost}/api/setup`);
            return await this.getToken(user, password)
        }
    }
};