import { Ticket, ServedStatus } from "../components/ticket";
import db from "../db/db"
import { TicketNotFoundError } from "../errors/ticketErrors";

class ticketDAO {
    addTicket(serviceID: number, waitlistCode: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO ticket(ticketID, serviceID, waitlistCode, counterID, servedTime, ticketDate) 
            VALUES(null, ?, ?, null, null, DATETIME('now'))`
            db.run(sql, [serviceID, waitlistCode], (err: Error) => {
               if(err) reject(err);
               else resolve(); 
            })
        })
    }

    getTicketByID(ticketID: number): Promise<Ticket> {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ticket WHERE ticketID = ?`
            db.get(sql, [ticketID], (err: Error, row: {
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

    getTicketByWaitlistCode(waitlistCode: number): Promise<Ticket> {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ticket WHERE waitlistCode = ? AND strftime('%Y-%m-%d', ticketDate) = DATE('now')` 
            db.get(sql, [waitlistCode], (err: Error, row: {
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

    setTicketCounter(ticketID: number, counterID: number): Promise<void>{
        return new Promise((resolve, reject) => {
            const sql = `UPDATE ticket 
            SET counterID = ? WHERE ticketID = ?`
            db.run(sql, [counterID, ticketID], (err: Error) => {
                if(err) reject(err);
                else resolve();
            })
        })
    }
}

export {ticketDAO};