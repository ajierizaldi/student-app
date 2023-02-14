require('dotenv').config();
const jwt = require('jsonwebtoken');
const redis = require('redis');
const redisClient = redis.createClient();
const JWTRedis = require('jwt-redis')(redisClient)

// generate token
const generateToken = (user) => {
    const token = jwt.sign(
        user,
        process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

// middleware to get JWT token and store it to redis
const setTokenInRedis = (req, res, next) => {
    const token = generateToken(req.user);
    JWTRedis.set(token, req.user, (err, reply) => {
        if (err) {
            console.log(err.message);
            return res.status(400).json({
                message: err.message,
                error: err,
                success: false,
                data: null
            })
        }
        console.log(reply);
        req.token = token;
        next();
    })
}

module.exports = {
    generateToken,
    setTokenInRedis
}