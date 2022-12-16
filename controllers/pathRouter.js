const { Router } = require('express');

const auth = require('../middleware/auth');
const Project = require('../models/Project');
const optionalAuth = require('../middleware/optionalAuth');

const pathRouter = new Router();

pathRouter.get('/', auth, async (req, res) => {
    const plainUser = req.user.get({ plain: true });

    const projects = await Project.findAll({
        where: {
            creatorId: req.user.id,
        },
    });

    const plainProjects = projects.map((project) => project.get({ plain: true }));

    res.render('home', {
        user: plainUser,
        projects: plainProjects,
    });
});

pathRouter.get('/login', (req, res) => {
    res.render('login');
});

pathRouter.get("/project/:id", optionalAuth, async (req, res) => {
    const { id } = req.params;

    const project = await Project.findByPk(id);

    if (!project) {
        res.status(404).end("No such project");
        return;
    }

    const projectSimple = project.get({ simple: true });

    res.render('project', {
        project: projectSimple,
        isCreator: req.user?.id === project.creatorId,
        isLoggedIn: !!req.user,
    });
});

module.exports = pathRouter;