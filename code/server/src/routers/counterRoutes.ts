import express from 'express';
import { CounterController } from '../controllers/counterController';
import { Counter } from "../components/counter";
import { Utilities } from '../utilities';


/**
 * Represents a class that defines the routes for handling counter.
 */
class CounterRoutes {
    private app: express.Application;
    private isLoggedIn: (req: any, res: any, next: any) => any;
    private controller: CounterController;
    private utilities: Utilities;

    constructor(app: express.Application, isLoggedIn: (req: any, res: any, next: any) => any) {
        this.app = app;
        this.isLoggedIn= isLoggedIn;
        this.controller = new CounterController();
        this.utilities= new Utilities();
        this.initRoutes();
    }

    initRoutes(): void{    
        /**
         * Route for retrieving a counter associated to a user.
         * It requires the user to be logged in and to be either an officier.
         * It requires as request parameter the userID, a number.
         * It returns the Counter objects.
         */
        this.app.get('/api/counter/:userID', this.isLoggedIn, this.utilities.isOfficer, async(req: any, res: any) => {
            try {
                console.log('ok');
                const counter: Counter = await this.controller.getCounter(req.params.userID);
                res.status(200).json(counter);
            } catch {
              res.status(500).json({error: 'Internal server error'});
            }
        });

    }
}

export {CounterRoutes};