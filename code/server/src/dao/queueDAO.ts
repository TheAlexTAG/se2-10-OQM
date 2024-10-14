import {Ticket} from "../components/ticket";
import db from "../db/db";

/**
 * A class that implements the interaction with the database for all ticket-related operations.
 */
class QueueDAO {
    /**
     * Returns an array of tickets
     * @returns A Promise that resolves the information of the requested queue
     */
    getAllTickets(): Promise<Ticket[]> {
        return new Promise<Ticket[]>((resolve, reject) => {
            try {
                const sql = "SELECT * FROM ticket WHERE served= 0"
                db.all(sql, [], (err: Error | null, rows: any) => {
                    const res = [];
                    if (err) {
                        reject(err)
                        return
                    }
                    for (let row of rows) {
                        res.push(new Ticket(row.ticketID, row.serviceID, row.waitlistCode, row.counterID, row.servedTime, row.ticketDate, row.served));
                    }
                    resolve(res);
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export {QueueDAO};