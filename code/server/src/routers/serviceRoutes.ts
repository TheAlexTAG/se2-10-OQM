import express from "express";
import { serviceController } from "../controllers/serviceController";
import ErrorHandler from "../helper";
import { ServiceType } from "../components/service";

class ServiceRoutes {
    private app: express.Application
    private controller: serviceController 
    private errorHandler: ErrorHandler

    constructor(app: express.Application) {
        this.app = app;
        this.controller = new serviceController();
        this.errorHandler = new ErrorHandler();
    }

    initRoutes(): void {
        this.app.get("/api/getAllServices", (req: any, res: any, next: any) => this.controller.getAllServices()
        .then((services: ServiceType[]) => res.status(200).json(services))
        .catch((err: Error) => next(err))
    )
    }
}

export { ServiceRoutes };