import express from "express";

class TicketRoutes {
    private app: express.Application;

    constructor(app: express.Application) {
        this.app = app;
    }
}