import {Ticket} from "../components/ticket";
import { ServedStatus } from "../components/ticket";
import dayjs from 'dayjs';
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

    /**
     * Returns the list of code numbers of customers that are waiting for a specific service.
     * @param id The serviceID of a service. 
     * @returns A Promise that resolves the list of waitlistCode for a specidic service.
     */
    getQueueByService(id: number): Promise<number[]> {
        return new Promise<number[]>((resolve, reject) => {
            try{
                const sql = 'SELECT * FROM queue WHERE serviceID=?';
                db.all(sql, [id], (err: Error | null, rows: any) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        const waitlistCode: number[] = rows.map((row: any)=> (row.waitlistCode));
                        resolve(waitlistCode);
                    }
                });
            }catch (err){
                reject(err)
            };
        });
    };

    /**
     * Delete an istance from queue.
     * @param code The waitlistCode of the ticket which has to be deleted. 
     * @returns true if it has been done correclty.
     */
    deleteWaitlistCode(code: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try{
                const sql = 'DELETE FROM queue WHERE waitlistCode=?';
                db.run(sql, [code], (err: Error | null) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
            }catch (err){
                reject(err)
            };
            
        });
    };

    /**
     * Save counterId of the couter which had to hadle a specific ticket.
     * @param code The waitlistCode of the ticket. 
     * @param counter The counterID of the counter. 
     * @returns true if it has been done correclty.
     */
    updateTicketCounter(code: number, counter: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try{
                const sql = 'UPDATE ticket SET counterID=? WHERE waitlistCode=? AND DAY(ticketDate)=? AND MONTH(ticketDate)=? YEAR(ticketDate)=? ';
                db.run(sql, [counter, code, dayjs().get('date'), dayjs().get('month'), dayjs().get('year')], (err: Error | null) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
            }catch (err){
                reject(err)
            };
            
        });
    };

    /**
     * Marks a ticket as served.
     * @param id The counterID of the counter that has handle it. 
     * @returns true if it has been done correclty.
     */
    setTicketServed(id: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try{
                const sql = 'UPDATE ticket SET served=?, servedTime=? WHERE counterID=? AND served=?';
                db.run(sql, [ServedStatus.Served, dayjs().format('YYYY-MM-DD HH:mm:ss'), id, ServedStatus.Pending], (err: Error | null) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
            }catch (err){
                reject(err)
            };
            
        });
    };

    /**
     * Marks a ticket as not served.
     * @param id The counterID of the counter that has been associated to it. 
     * @returns true if it has been done correclty.
     */
    setTicketNotServed(id: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try{
                const sql = 'UPDATE ticket SET served=? WHERE counterID=? AND served=?';
                db.run(sql, [ServedStatus.NotServed, id, ServedStatus.Pending], (err: Error | null) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
            }catch (err){
                reject(err)
            };
            
        });
    };


}

export {QueueDAO};