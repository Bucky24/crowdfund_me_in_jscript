const { Router } = require("express");

const usersRouter = require('./users');
const projectsRouter = require('./projects');
const pledgesRouter = require('./pledges');

const apiRouter = new Router();

apiRouter.use('/user', usersRouter);
apiRouter.use('/project', projectsRouter);
apiRouter.use('/pledge', pledgesRouter);

module.exports = apiRouter;