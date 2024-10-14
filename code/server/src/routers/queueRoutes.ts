import express from 'express';
import { QueueController } from '../controllers/queueController';
import { Ticket } from '../components/ticket';


/**
 * Represents a class that defines the routes for handling queue.
 */
class QueueRoutes {
    private app: express.Application;
    private controller: QueueController;


    constructor(app: express.Application) {
        this.app = app;
        this.controller = new QueueController();
        this.initRoutes();
    }

    initRoutes(): void{
        this.app.get('/api/tickets', (req: any, res: any) => {
            (req: any, res: any, next: any) => this.controller.getAllTickets()
                .then((users: Ticket[]) => res.status(200).json(users))
                .catch((err: any) => next(err))
        }
      )

    }
}

export {QueueRoutes};