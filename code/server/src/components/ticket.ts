class Ticket {
    ticketID: number
    serviceID: number
    waitlistCode: number
    counterID: number | null
    servedTime: string | null
    ticketDate: string
    served: ServedStatus

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