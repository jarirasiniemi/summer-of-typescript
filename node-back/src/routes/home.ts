import {CommonRoutesConfig} from './common.routes.config';
import express from 'express';

export class HomeRoute extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'HomeRoute');
    }
    configureRoutes() {
        this.app.route(`/`)
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send('Hello from home');
            });

        return this.app;    
    }
}