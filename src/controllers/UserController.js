const Users = require("../models/users");
const {hash, compare, Auth} = require("../lib/auth");

module.exports = class UserController {
    constructor(router) {
        this.initRoutes(router);
    }

    initRoutes(router) {
        router.post('/authenticate', this.authenticate);
        router.get('/setup', this.setup);
        router.post('/adduser', this.addUser);
        router.get('/users', this.getUsers);
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

    async getUsers(req, res) {
        let users = await Users.getUsers();
        res.json(users);
    }

    async setup(req, res) {
        await Users.addUser({
            name: 'default',
            password: await hash('password'),
            admin: true
        });

        res.send({
            success: true,
        });
    }

    async addUser(req, res) {
        if (req.body.name && req.body.password)
            await Users.getUser({
                name: req.body.name,
                password: await hash(req.body.password),
                admin: req.body.admin || false
            });

        res.json({
            success: true
        });
    }
};