import express from 'express';
import { CounterController } from '../controllers/counterController';
import { Role } from '../components/user';
import { Counter } from "../components/counter";


/**
 * Represents a class that defines the routes for handling counter.
 */
class CounterRoutes {
    private app: express.Application;
    private controller: CounterController;

    constructor(app: express.Application) {
        this.app = app;
        this.controller = new CounterController();
        this.initRoutes();
    }

    initRoutes(): void{

        const isLoggedIn = (req:any, res:any, next:any) => {
            if(req.isAuthenticated()) {
              return next();
            }
            return res.status(401).json({error: 'Not authorized'});
        }
    
        const isOfficer = (req:any, res:any, next:any) => {
            if(req.user.role==Role.OFFICER) {
              return next();
            }
            return res.status(401).json({error: 'Not authorized'});
        }

        /**
         * Route for retrieving a counter associated to a user.
         * It requires the user to be logged in and to be either an officier.
         * It requires as request parameter the userID, a number.
         * It returns the Counter objects.
         */
        this.app.get('/api/counter/:userID', isLoggedIn, isOfficer, async(req: any, res: any) => {
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