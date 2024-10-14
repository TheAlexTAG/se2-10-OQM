import { ticketDAO } from "../dao/ticketDAO";
import { Ticket } from "../components/ticket";
import { ServiceDAO } from "../dao/serviceDAO";
import { ServiceType } from "../components/service";

class ticketController {
    private dao: ticketDAO
    constructor() {
        this.dao = new ticketDAO
    }

    async addTicket(serviceName: string): Promise<Ticket> {
        try {
            let nextwaitlistCode = await this.dao.getNextWaitlistCode();
            let service = await ServiceDAO.prototype.getServiceByName(serviceName);
            await this.dao.addTicket(service.id, nextwaitlistCode);
            await this.dao.addTicketToQueue(service.id, nextwaitlistCode);
            let ticket = await this.dao.getTicketByWaitlistCode(nextwaitlistCode);
            return ticket;
        }
        catch (err) {
            throw err;
        }
    }
}

export { ticketController };