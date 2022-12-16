const { Router } = require('express');

const auth = require('../../middleware/auth');
const { Pledge } = require('../../models');

const pledgesRouter = new Router();

pledgesRouter.post('/', auth, async (req, res) => {
    const { amount, projectId } = req.body;

    const pledge = await Pledge.findOne({
        where: {
            ProjectId: projectId,
            UserId: req.user.id,
        },
    });

    if (pledge) {
        res.status(409).end('You have already pledged');
        return;
    }

    const newPledge = await Pledge.create({
        amount,
        ProjectId: projectId,
        UserId: req.user.id,
    });

    res.json({
        id: newPledge.id,
    });
});

pledgesRouter.put('/:project_id', auth, async (req, res) => {
    // because I am lazy this is a project id and not a pledge id. Arrest me.
    const { project_id } = req.params;
    const { amount } = req.body;

    const pledge = await Pledge.findOne({
        where: {
            ProjectId: project_id,
            UserId: req.user.id,
        },
    });

    if (!pledge) {
        res.status(404).end("cannot find that pledge");
        return;
    }

    await pledge.update({
        amount,
    });

    res.end();
});

module.exports = pledgesRouter;