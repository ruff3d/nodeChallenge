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
        if (!user) {
            res.status(401).json({
                success: false,
                message: `Authentication failed. User ${req.body.name} not found.`
            });
        } else if (await compare(req.body.password, user.password)) {
            const payload = {
                admin: user.admin,
                name: user.name,
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
        res.json(users.map(user => ({name: user.name, admin: user.admin})));
    }

    async getUser(req, res) {
        let user = await Users.getUser(req.param.name);
        res.json({name: user.name, admin: user.admin});
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