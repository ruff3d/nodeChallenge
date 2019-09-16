const fetch = require('node-fetch');

module.exports = class ProductController {
    constructor(router, logger) {
        this.logger = logger;
        this.initRoutes(router);
    }

    initRoutes(router) {
        router.get('/api/app/:product_id', this.getProduct);
    }

    async getProduct(req, res) {
        this.logger.info("Processing ${req.params.product_id}");
        Promise.all([
            ProductController.get(`https://www.adidas.co.uk/api/products/${req.params.product_id}`),
            ProductController.get(`http://localhost:3027/api/review/${req.params.product_id}?token=${req.query.token}`),
        ]).then(([product, rows]) => res.send({
            reviews: rows,
            product: product
        })).catch(err => res.send('Ops, something has gone wrong'))
    }

    static get(url) {
        return new Promise((resolve, reject) => {
            fetch(url, {accept: 'application/json'})
                .then(res => res.json())
                .then(json => console.log(json))
                .then(data => resolve(data))
                .catch(err => reject(err))
        })
    }
};