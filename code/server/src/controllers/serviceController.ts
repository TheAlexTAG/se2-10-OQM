import { ServiceDAO } from "../dao/serviceDAO";
import { ServiceType } from "../components/service";

/**
 * Represents a controller for managing services.
*/

class serviceController {
    private dao: ServiceDAO
    constructor() {
        this.dao = new ServiceDAO 
    }

    async getAllServices(): Promise<ServiceType[]> {
        try {
            let serviceArray = await this.dao.getAllServices();
            return serviceArray;
        }
        catch (err) {
            throw err;
        }
    }

    async getServiceByName(serviceName: string): Promise<ServiceType> {
        try {
            let service = await this.dao.getServiceByName(serviceName);
            return service;
        }
        catch (err) {
            throw err;
        }
    }
}

export {serviceController};