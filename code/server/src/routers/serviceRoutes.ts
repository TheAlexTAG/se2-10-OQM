import express from "express";
import { serviceController } from "../controllers/serviceController";
import { param } from "express-validator"
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
        this.initRoutes();
    }

    initRoutes(): void {
        this.app.get("/api/getAllServices", (req: any, res: any, next: any) => this.controller.getAllServices()
        .then((services: ServiceType[]) => res.status(200).json(services))
        .catch((err: Error) => res.status(500).json(err)))

        this.app.get("/api/getService/:serviceName", [
            param("serviceName").notEmpty().isString(),
            this.errorHandler.validateRequest
        ],(req: any, res: any, next: any) => this.controller.getServiceByName(req.params.serviceName)
        .then((service: ServiceType) => res.status(200).json(service))
        .catch((err: Error) => res.status(500).json(err)))
    }
}

export { ServiceRoutes };