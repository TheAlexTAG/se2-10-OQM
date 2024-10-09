import { Ticket, ServedStatus } from "../components/ticket";
import db from "../db/db"
import { TicketNotFoundError } from "../errors/ticketErrors";

class ticketDAO {
    addTicket(serviceID: number, waitlistCode: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO ticket(ticketID, serviceID, waitlistCode, counterID, servedTime, ticketDate) 
            VALUES(null, ?, ?, null, null, DATETIME('now'))`
            db.run(sql, [serviceID, waitlistCode], (err: Error) => {
               if(err)
                    reject(err);
               else
                    resolve(); 
            })
        })
    }

    getTicketByID(ticketID: number): Promise<Ticket> {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ticket WHERE ticketID = ?`
            db.get(sql, [ticketID], (err, row: {
                ticketID: number,
                serviceID: number,
                waitlistCode: number,
                counterID: number | null,
                servedTime: string | null,
                ticketDate: string,
                served: ServedStatus}) => {
                    if(err) reject(err);
                    row ? 
                    resolve(new Ticket(row.ticketID, row.serviceID, row.waitlistCode, row.counterID, row.servedTime, row.ticketDate, row.served)) 
                    : reject(new TicketNotFoundError());
            })
        })
    }
}