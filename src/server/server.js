import express from 'express';
import path from 'path';
// import models from './models';
import morgan from 'morgan';
import redis from 'redis';
import session from 'express-session';
import connRedis from 'connect-redis';
import { morganFormat, morganOptions } from './middleware/log';
import { EXTERNAL_API, REDIS_CONFIG, SERVER_PORT, IS_DEV, CLIENT_HOST, ADMIN_HOST } from './env';
import { appRouter } from './routes';
import timeout from 'connect-timeout';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

const app = express();
app.use(compression());
app.use(timeout('180s'));
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'","'unsafe-eval'", ADMIN_HOST],
        styleSrc: ["'self'", "'unsafe-inline'","https://fonts.googleapis.com"],
        fontSrc: ["'self'","https://fonts.googleapis.com","https://fonts.gstatic.com", "data:"],
      },
    })
);
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.use(cors({
  origin: [
    CLIENT_HOST,
    ADMIN_HOST
  ]
}));
app.use(express.static(path.join(__dirname, '../public')));

const startServer = async () => {
  const redisConnection = redis.createClient(REDIS_CONFIG.PORT, REDIS_CONFIG.HOST, {}, 'uplus');
  if(EXTERNAL_API){
    await AgendaManager.set(redisConnection);
  }
  app.set('trust proxy', true);
  app.use((req, res, next) => {
    req.headers['x-forwarded-proto'] = 'https';
    next();
  })
  const RedisStore = connRedis(session);
  app.use(session({
    secret: REDIS_CONFIG.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({ client: redisConnection, ttl: 3600 }),
    cookie: {
      secure: true,
      proxy: true
    }
  }));
  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, '../src/templates'));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  //middleware - log
  app.use(morgan(morganFormat, morganOptions));
  
  if(!IS_DEV){
    app.use((req, res, next) => {
      const userAgent = req.header('User-Agent');
      if(
        userAgent &&
        userAgent.indexOf('lgupluskiosk') !== -1 &&
        userAgent.indexOf('doorder-lg-kiosk') !== -1 &&
        userAgent.indexOf('Electron') !== -1
        ){
        next();
      } else if(req.path === '/health'){
        next();
      } else {
        res.status(401).json({
          error: '허가되지 않은 접근',
          error_description: '잘못된 접근입니다.',
        });
      }
    });
  }

  
  app.use('/', appRouter);
  // models.sequelize.sync().then(()=>{
  //   console.log('sequelize db synced');
  // });
  app.listen(SERVER_PORT, () => {
    console.log(`${process.env.NODE_ENV} server!`);
    console.log(`Express App on port ${SERVER_PORT}!`);
  });
}

console.log("MODE_ENV",process.env.MODE_ENV);
console.log("NODE_ENV",process.env.NODE_ENV);
if (process.env.MODE_ENV === 'test') {
  const webpackDevServer = require('webpack-dev-server');
  const webpack = require('webpack');
  const config = require('./../webpack.config.js');
  const options = {
    contentBase: './public/js', hot: true, host: 'localhost', historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
      https: true,
    }
  };
  webpackDevServer.addDevServerEntrypoints(config, options);
  const compiler = webpack(config);
  const server = new webpackDevServer(compiler, options);
  server.listen(5000, 'localhost', () => { console.log('dev server listening on port 5000'); });
} else {
  startServer();
}
