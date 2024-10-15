import express from 'express';
import { QueueController } from '../controllers/queueController';
import { CounterController } from '../controllers/counterController';
import { Ticket } from '../components/ticket';
import { Role } from '../components/user';
import { Counter } from "../components/counter";


/**
 * Represents a class that defines the routes for handling queue.
 */
class QueueRoutes {
    private app: express.Application;
    private isLoggedIn: (req: any, res: any, next: any) => any;
    private controller: QueueController;
    private controllerCounter: CounterController;

    constructor(app: express.Application, isLoggedIn: (req: any, res: any, next: any) => any) {
        this.app = app;
        this.isLoggedIn= isLoggedIn;
        this.controller = new QueueController();
        this.controllerCounter = new CounterController();
        this.initRoutes();
    }

    initRoutes(): void{  
        const isOfficer = (req:any, res:any, next:any) => {
            if(req.user.role==Role.OFFICER) {
              return next();
            }
            return res.status(401).json({error: 'Not authorized'});
        }
    
        const isEnabled = async (req:any, res:any, next:any) => {
            const counter: Counter = await this.controllerCounter.getCounter(req.user.id);
            if (counter.status==true)
                return next();
            else
                return res.status(401).json({error: 'Not authorized'});
        }


        this.app.get('/api/tickets',
            (req: any, res: any, next: any) => this.controller.getAllTickets()
                .then((users: Ticket[]) => res.status(200).json(users))
                .catch((err: any) => next(err))
        );

        /**
         * Route for saving served current customer and retrieving next customer to call to a specific counter.
         * It requires as request parameter the counterID of the counter that has finished.
         * It returns the code of the customer to call to this counter.
         */
        this.app.get('/api/served/:counterID', this.isLoggedIn, isOfficer, isEnabled, async(req: any, res: any) => {
            try {
                const customer: number = await this.controller.setServed(req.params.counterID);
                res.status(200).json(customer);
            } catch {
              res.status(500).json({error: 'Internal server error'});
            }
        });


        /**
         * Route for saving not served current customer and retrieving next customer to call to a specific counter.
         * It requires as request parameter the counterID of the counter that has rejected.
         * It returns the code of the customer to call to this counter.
         */
        this.app.get('/api/notserved/:counterID', this.isLoggedIn, isOfficer, isEnabled, async(req: any, res: any) => {
            try {
                const customer: number = await this.controller.setNotServed(req.params.counterID);
                res.status(200).json(customer);
            } catch {
              res.status(500).json({error: 'Internal server error'});
            }
        });

    }
}

export {QueueRoutes};