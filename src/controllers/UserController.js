const Users = require("../models/users");
const {hash, compare, Auth, authMiddleware} = require("../lib/auth");

module.exports = class UserController {
    constructor(router) {
        this.initRoutes(router);
    }

    initRoutes(router) {
        router.post('/authenticate', this.authenticate);
        router.get('/setup', this.setup);
        router.use(authMiddleware); // JWT validation starts here
        router.post('/adduser', this.addUser);
        router.get('/users', this.getUsers);
        router.get('/user/:name', this.getUser);
    }

    async authenticate(req, res) {
        let user = await Users.getUser(req.body.name);
        console.log(user.password);
        if (!user) {
            res.status(401).json({
                success: false,
                message: `Authentication failed. User ${req.body.name} not found.`
            });
            // return;
        } else if (await compare(res.body.password, user.password)) {
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

    async getUser(req, res) {
        let users = await Users.getUser(req.param.name);
        res.json(users);
    }

    async setup(req, res) {
        await Users.createUser(
            'default',
            await hash('password'),
            true
        );

        res.send({
            success: true,
        });
    }

    async addUser(req, res) {
        if (!req.decoded.admin) {
            res.status(401).json({
                success: false,
                message: 'You do not have enough permissions'
            });
        }
        if (req.body.name && req.body.password)
            await Users.createUser(
                req.body.name,
                await hash(req.body.password),
                req.body.admin || false
            );

        res.json({
            success: true
        });
    }
};