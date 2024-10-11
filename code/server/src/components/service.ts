/**
 * Represents a service offered by a Counter
 */
class ServiceType {
    id: number
    name: string
    description: string | null
    serviceTime: number

    /**
     * Creates a new instance of the Service class.
     * @param id Service ID
     * @param name Name of the service offered 
     * @param description Description of the service offered 
     * @param serviceTime Service time for request type
     */
    constructor(id: number, name: string, description: string | null, serviceTime: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.serviceTime = serviceTime;
    }
}

export { ServiceType }