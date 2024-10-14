import { QueueDAO } from "../dao/queueDAO";
import { Ticket } from "../components/ticket";

class QueueController{
    private dao: QueueDAO;

    constructor() {
        this.dao = new QueueDAO;
    }

    /**
     * Adds a new review for a product
     * @returns A Promise that resolves to an array of users
     */
    async getAllTickets(): Promise<Ticket[]> {
        return this.dao.getAllTickets();
     } 
}

export {QueueController}