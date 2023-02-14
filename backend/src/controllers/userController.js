const model = require('../models'),
    { genSalt, hash, compareSync } = require('bcrypt'),
    { generateToken, setTokenInRedis } = require('../middleware')

const cryptPassword = async (password) => {
    const salt = await genSalt(12);
    const hashPassword = await hash(password, salt);
    return hashPassword;
}

module.exports = {
    register: async (req, res) => {
        try {
            const data = await model.User.create({
                ...req.body,
                password: await cryptPassword(req.body.password)
            })
            return res.status(200).json({
                "message": "User created successfully",
                "error": null,
                "success": true,
                "data": data
            })
        } catch (error) {
            return res.status(500).json({
                "message": error.message,
                "error": error,
                "success": false,
                "data": null
            })
        }
    },
    login: async (req, res) => {
        try {
            const user = await model.User.findOne({ where: { email: req.body.email } })
            if (!user) {
                return res.status(400).json({
                    message: "User not found",
                    error: null,
                    success: false,
                    data: null
                })
            }
            const isMatch = compareSync(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: "Password is incorrect",
                    error: null,
                    success: false,
                    data: null
                })
            }
            const token = generateToken(user);
            setTokenInRedis(req, res, () => {
                return res.status(200).json({
                    message: "User logged in successfully",
                    error: null,
                    success: true,
                    data: {
                        user,
                        token
                    }
                })
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message,
                error: error,
                success: false,
                data: null
            })
        }
    },
    logout: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            req.redisClient.DEL(token, (err, reply) => {
                if (err) {
                    return res.status(500).json({
                        message: err.message,
                        error: err,
                        success: false,
                        data: null
                    })
                }
                return res.status(200).json({
                    message: "User logged out successfully",
                    error: null,
                    success: true,
                    data: null
                })
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message,
                error: error,
                success: false,
                data: null
            })
        }
    },
    // whoami: async (req, res) => {
    //     try {
    //         const tokenParams = req.params.token;

    //     } catch (error) {
    //         return res.status(500).json({
    //             message: error.message,
    //             error: error,
    //             success: false,
    //             data: null
    //         })
    //     }
    // }
}
