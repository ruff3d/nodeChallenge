import {Users} from "../models/users";
import {Reviews} from "../models/reviews";
import {authMiddleware, hash, compare, Auth} from "../lib/auth";

export default class ReviewsController {
    constructor(router) {
        this.initRoutes(router);
    }

    initRoutes(router){
        router.post('/authenticate', this.authenticate);
        router.use(authMiddleware);
        router.get('/users', this.getUsers);
        router.get('/review/:product_id', this.getReview);
        router.post('/review/', this.addReview);
        router.put('/review/:product_id', this.editReview);
        router.delete('/review/:product_id', this.deleteReview);

        router.get('/', this.home);
    }

    async authenticate(req, res) {
        let user = await Users.getUser(req.body.name);
        if (!user) {
            res.status(401).json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        }
        if (await compare(res.body.password, user.password)) {
            const payload = {
                admin: user.admin
            };
            let token = Auth.sign(payload);
            res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });
        }
        res.status(401).json({
            success: false,
            message: 'Authentication failed. Wrong password.'
        });
    }

    home(req, res) {
        res.json({
            message: 'Welcome to the product reviews API'
        });
    }

    async getUsers(req, res) {
        let users = await Users.getUsers();
        res.json(users);
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
}