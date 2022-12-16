const { Router } = require('express');

const auth = require('../../middleware/auth');
const Project = require('../../models/Project');

const projectsRouter = new Router();

projectsRouter.post('/', auth, async (req, res) => {
    const { name, description, goal, fundBy } = req.body;

    const project = await Project.create({
        name,
        description,
        goal,
        fundBy,
        creatorId: req.user.id,
    });

    res.json({
        id: project.id,
    });
});

module.exports = projectsRouter;