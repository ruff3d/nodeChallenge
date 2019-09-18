const {token} = require("../config");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class Auth {
    static sign(payload) {
        return jwt.sign(payload, token.Secret, {
            expiresIn: token.expiresIn
        });
    }

    static verify(token, callback) {
        return jwt.verify(token, token.Secret, callback);
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

 async function hash(value){
    let salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(value, salt)
}

async function compare(value, hash){
    await bcrypt.compare(value, hash);
}

module.exports = {
    compare,
    hash,
    authMiddleware,
    Auth
};