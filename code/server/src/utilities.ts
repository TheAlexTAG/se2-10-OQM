import { Role } from './components/user';
import { CounterController } from './controllers/counterController';
import { Counter } from "./components/counter";

class Utilities{
    private controller: CounterController;

    constructor() {
        this.controller = new CounterController();
    }
    
    public isOfficer(req:any, res:any, next:any) {
        if(req.user.role==Role.OFFICER) {
          return next();
        }
        return res.status(401).json({error: 'Not authorized'});
    }

    public async isEnabled(req:any, res:any, next:any) {
        const counter: Counter = await this.controller.getCounter(req.user.id);
        if (counter.status==true)
            return next();
        else
            return res.status(401).json({error: 'Not authorized'});
    }
}

export {Utilities};