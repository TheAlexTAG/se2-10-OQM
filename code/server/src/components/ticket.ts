/**
 * Represents a ticket in the system
 */
class Ticket {
    ticketID: number
    serviceID: number
    waitlistCode: number
    counterID: number | null
    servedTime: string | null
    ticketDate: string
    served: ServedStatus

    /**
     * Creates a new instance of the Ticket class.
     * @param ticketID ticket ID, unique in the database
     * @param serviceID ID of the service asked 
     * @param waitlistCode is the unique code of the ticket in a specific date 
     * @param counterID the id of the counter that takes care of the service
     * @param servedTime the time and date of the end of the service
     * @param ticketDate time and date when the ticket is taken
     * @param served indicates the status of the ticket
     */

    constructor(ticketID: number, serviceID: number, waitlistCode: number, counterID: number | null, servedTime: string | null, ticketDate: string, served: ServedStatus) {
        this.ticketID = ticketID;
        this.serviceID = serviceID;
        this.waitlistCode = waitlistCode;
        this.counterID = counterID;
        this.servedTime = servedTime;
        this.ticketDate = ticketDate;
        this.served = served;
    }
}

enum ServedStatus {
    Pending = 0,
    Served = 1,
    NotServed = 2
}

export {Ticket, ServedStatus};