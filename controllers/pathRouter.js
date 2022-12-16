const { Router } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const pathRouter = new Router();

pathRouter.get('/', async (req, res) => {
    const { logintoken } = req.cookies;

    try {
        const data = jwt.verify(logintoken, process.env.JWT_KEY);
        const { id } = data;

        const user = await User.findByPk(id);
        const plainUser = user.get({ plain: true })

        res.render('home', {
            user: plainUser,
        });
    } catch (error) {
        if (error.message === "invalid token" || error.message === "jwt must be provided") {
            res.redirect('/login');
        } else {
            console.error(error);
            res.status(500).end("Bad thing happen");
        }
    }
});

pathRouter.get('/login', (req, res) => {
    res.render('login');
});

module.exports = pathRouter;