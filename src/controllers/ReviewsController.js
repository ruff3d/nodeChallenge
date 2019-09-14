const Reviews = require("../models/reviews");
const {authMiddleware} = require("../lib/auth");

module.exports = class ReviewsController {
    constructor(router) {
        this.initRoutes(router);
    }

    initRoutes(router) {
        router.use(authMiddleware);
        router.get('/review/:product_id', this.getReview);
        router.post('/review/', this.addReview);
        router.put('/review/:product_id', this.editReview);
        router.delete('/review/:product_id', this.deleteReview);

        router.get('/', this.home);
    }

    home(req, res) {
        res.json({
            message: 'Welcome to the product reviews API'
        });
    }

    async getReview(req, res) {
        let product_id = req.params.product_id;
        try {
            let review = await Reviews.getReview(product_id);
            res.json(review);
        } catch {
            res.status(500).json({
                success: false,
                message: 'Something went wrong!!'
            });
        }
    }

    async addReview(req, res) {
        let input = req.body;
        let data = {
            product_id: input.product_id,
            avg_review_score: input.avg_review_score,
            num_of_reviews: input.num_of_reviews
        };
        try {
            let review = await Reviews.updateReview(data.product_id, data.avg_review_score, data.num_of_reviews);
            res.json(review);
        } catch {
            res.status(500).json({
                success: false,
                message: 'Something went wrong!!'
            });
        }
    }

    async editReview(req, res) {
        const input = req.body;
        let data = {
            product_id: req.params.product_id,
            avg_review_score: input.avg_review_score,
            num_of_reviews: input.num_of_reviews
        };
        try {
            let review = await Reviews.updateReview(data.product_id, data.avg_review_score, data.num_of_reviews);
            res.json(review);
        } catch {
            res.status(500).json({
                success: false,
                message: 'Something went wrong!!'
            });
        }
    }

    async deleteReview(req, res) {
        let product_id = req.params.product_id;
        try {
            await Reviews.deleteReview(product_id);
            res.json();
        } catch {
            res.status(500).json({
                success: false,
                message: 'Something went wrong!!'
            });
        }
    }
};