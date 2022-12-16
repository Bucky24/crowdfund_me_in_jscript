const jwt = require('jsonwebtoken');

const User = require('../models/User');

module.exports = async (req, res, next) => {
    const { logintoken } = req.cookies;

    try {
        const data = jwt.verify(logintoken, process.env.JWT_KEY);
        const { id } = data;

        const user = await User.findByPk(id);
        if (!user) {
            next();
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.message === "invalid token" || error.message === "jwt must be provided") {
            next();
        } else {
            console.error(error);
            res.status(500).end("Bad thing happen");
        }
    }
}