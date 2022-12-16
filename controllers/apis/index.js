const { Router } = require("express");

const usersRouter = require('./users');
const projectsRouter = require('./projects');

const apiRouter = new Router();

apiRouter.use('/user', usersRouter);
apiRouter.use('/project', projectsRouter);

module.exports = apiRouter;