import {CommonRoutesConfig} from './common.routes.config';
import express from 'express';

export class BlogsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'BlogRoutes');
    }

    configureRoutes() {
        this.app.route(`/blog-posts`)
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send(`List of blog posts`);
            })
            .post((req: express.Request, res: express.Response) => {
                res.status(200).send(`Post to blog posts`);
            });
    
        this.app.route(`/blog-posts/:id`)
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                // this middleware function runs before any request to /blog-posts/:id
                // but it doesn't accomplish anything just yet---
                // it simply passes control to the next applicable function below using next()
                next();
            })
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send(`GET requested for id ${req.params.id}`);
            })
            .put((req: express.Request, res: express.Response) => {
                res.status(200).send(`PUT requested for id ${req.params.id}`);
            })
            .patch((req: express.Request, res: express.Response) => {
                res.status(200).send(`PATCH requested for id ${req.params.id}`);
            })
            .delete((req: express.Request, res: express.Response) => {
                res.status(200).send(`DELETE requested for id ${req.params.id}`);
            });
    
        return this.app;
    }
}
