const {Secret} = require('../config');
const jwt = require('jsonwebtoken');

class Auth {
    static sign(payload) {
        return jwt.sign(payload, Secret, {
            expiresIn: 1440
        });
    }

    static verify(token, callback) {
        return jwt.verify(token, Secret, callback);
    }
}

function authMiddleware(req, res, next)  {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        Auth.verify(token, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}


module.exports = {
    Auth,
    authMiddleware
};
