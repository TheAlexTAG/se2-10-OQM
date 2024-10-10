import { ServiceType } from "./service";

/**
 * Represents a counter
 */
class Counter {
    id: number
    counterNumber: number
    serviceType: ServiceType[]
    /**
     * Creates a new instance of the Service class.
     * @param id ID for unique record 
     * @param counterNumber Counter ID
     */
    constructor(id: number, counterNumber: number) {
        this.id = id;
        this.counterNumber = counterNumber;
        this.serviceType= [];
    }
}

export { Counter }