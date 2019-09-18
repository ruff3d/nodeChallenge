const Reviews = require("../models/reviews");

module.exports = class ReviewsController {
    constructor(router) {
        this.initRoutes(router);
    }

    initRoutes(router) {
        router.get('/review-statistic/:product_id', this.getReviewStatistic.bind(this));
        router.get('/reviews/:product_id', this.getReviews.bind(this));
        router.post('/review/:product_id', this.addReview.bind(this));
        router.put('/review/:id', this.editReview.bind(this));
        router.get('/review/:id', this.getReview.bind(this));
        router.delete('/review/:id', this.deleteReview.bind(this));

        router.get('/', this.home.bind(this));
    }

    home(req, res) {
        res.json({
            message: 'Welcome to the product reviews API'
        });
    }

    async getReviews(req, res) {
        try {
            let reviews = await Reviews.getReviewsByProductId(req.params.product_id);
            res.json(reviews);
        } catch {
            res.status(500).json({
                success: false,
                message: 'Something went wrong!!'
            });
        }
    }

    async addReview(req, res) {
        try {
            let review = await Reviews.addReview(
                req.params.product_id,
                req.body.description,
                req.body.score,
                req.decoded.name
            );
            res.json(review);
        } catch {
            res.status(500).json({
                success: false,
                message: 'Something went wrong!!'
            });
        }
    }

    async editReview(req, res) {
        try {
            let review = await Reviews.updateReview(
                req.body.id,
                req.body.description,
                req.body.score,
            );
            res.json(review);
        } catch {
            res.status(500).json({
                success: false,
                message: 'Something went wrong!!'
            });
        }
    }

    async deleteReview(req, res) {
        try {
            await Reviews.deleteReview(req.params.id);
            res.json({
                success: true,
                message: `Review with id ${req.params.id} has been deleted`
            });
        } catch {
            res.status(500).json({
                success: false,
                message: 'Something went wrong!!'
            });
        }
    }

    async getReview(req, res) {
        try {
            let review = await Reviews.getReviewById(req.body.id);
            res.json(review);
        } catch {
            res.status(500).json({
                success: false,
                message: 'Something went wrong!!'
            });
        }
    }

    async getReviewStatistic(req, res) {
        try {
            let reviewStat = await Reviews.getReviewStatisticByProductId(req.params.product_id);
            let stat = reviewStat.pop().dataValues;
            res.json({
                product_id: stat.product_id,
                num_of_reviews: stat.num_of_reviews,
                avg_review_score: stat.avg_review_score
            });
        } catch {
            res.status(500).json({
                success: false,
                message: 'Something went wrong!!'
            });
        }
    }
};