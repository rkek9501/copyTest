import express from 'express';

const appRouter = express.Router();

appRouter.get('/', function (req, res) {
  res.render('index', {});
});
appRouter.get('/test', function (req, res) {
  res.render('index', {});
});

export default appRouter;
