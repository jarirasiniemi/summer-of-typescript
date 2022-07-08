
import express from 'express';
import * as http from 'http';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import {CommonRoutesConfig} from './routes/common.routes.config';
import { HomeRoute } from './routes/home';
import {UsersRoutes} from './routes/users.routes.config';
import debug from 'debug';

// https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1
// https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-2
// https://github.com/typicode/lowdb
// https://medium.com/geekculture/how-to-build-a-rest-api-with-express-js-and-typescript-part-ii-organising-routes-ee293eeb16eb
const port = process.env.SERVER_PORT || 3000;

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

// here we are adding middleware to parse all incoming requests as JSON
app.use(express.json());

// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

routes.push(new HomeRoute(app));
routes.push(new UsersRoutes(app));

const runningMessage = `Server running at http://localhost:${port}`;

server.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
    // our only exception to avoiding console.log(), because we
    // always want to know when the server is done starting up
    console.log(runningMessage);
});
