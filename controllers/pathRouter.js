const { Router } = require('express');

const auth = require('../middleware/auth');
const { Project, Pledge, User } = require('../models');
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

    const pledges = await Pledge.findAll({
        where: {
            ProjectId: id,
        },
    });

    const totalPledged = pledges.reduce((sum, pledge) => {
        return sum + pledge.amount;
    }, 0);

    let userPledge = null;
    if (req.user) {
        userPledge = await Pledge.findOne({
            where: {
                ProjectId: project.id,
                UserId: req.user.id,
            },
        });
        userPledge = userPledge.get({ simple: true });
    }

    res.render('project', {
        project: projectSimple,
        isCreator: req.user?.id === project.creatorId,
        isLoggedIn: !!req.user,
        userPledge,
        totalPledged,
    });
});

module.exports = pathRouter;