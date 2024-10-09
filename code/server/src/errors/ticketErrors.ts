const TICKET_NOT_FOUND = "Ticket not found"

class TicketNotFoundError extends Error {
    customMessage: string
    customCode: number

    constructor() {
        super();
        this.customMessage = TICKET_NOT_FOUND;
        this.customCode = 404;
    }
}

export {TicketNotFoundError};