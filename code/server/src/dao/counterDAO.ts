import { Counter } from "../components/counter";
import { ServiceType } from "../components/service";
import { ServedStatus } from "../components/ticket";
import db from '../db/db';

class CounterDAO{
    /**
     * Returns a counter object from the database based on the userid.
     * @param id The userID of the counter to retrieve
     * @returns A Promise that resolves the information of the associated counter
     */
    getCounter(id: number): Promise<Counter> {
        return new Promise<Counter>((resolve, reject) => {
            try {
                const sql = 'SELECT * FROM counter C, serviceInCounter SC, service S WHERE C.counterID=SC.counterID AND SC.serviceID=S.serviceID AND C.userID = ?';
                db.all(sql, [id], (err: Error | null, rows: any) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        let services: ServiceType[] = rows.map((row: any) => (
                            new ServiceType(row.serviceID, row.serviceName, row.description,row.serviceTime)
                        ));
                        const counter: Counter = new Counter(rows[0].counterID, services, rows[0].status );
                        resolve(counter);
                    }
                })
            }
            catch (err){
                reject(err)
            };
        });
    };

    /**
     * Returns the list of services handled by a specific counter.
     * @param id The counterID of the counter by which services are handled. 
     * @returns A Promise that resolves the list of ServiceType
     */
    getServicesByCounter(id: number): Promise<ServiceType[]> {
        return new Promise<ServiceType[]>((resolve, reject) => {
            try{
                const sql = 'SELECT * FROM serviceInCounter SC, service S WHERE SC.serviceID=S.serviceID AND SC.counterID = ?';
                db.all(sql, [id], (err: Error | null, rows: any) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        let services: ServiceType[] = rows.map((row: any)=> (
                            new ServiceType(row.serviceID, row.serviceName, row.description,row.serviceTime)
                        ));
                        resolve(services);
                    }
                });
            }catch (err){
                reject(err)
            };
            
        });
    };
   
    /**
     * Returns the list of active counters that can handle a specific service.
     * @param id The serviceID of a specific service. 
     * @returns A Promise that resolves the list of Counter
     */
    getActiveCountersByService(id: number): Promise<Counter[]> {
        return new Promise<Counter[]>((resolve, reject) => {
            try{
                const sql = 'SELECT * FROM serviceInCounter SC, counter C WHERE SC.counterID=C.counterID AND C.status=true AND SC.serviceID = ?';
                db.all(sql, [id], (err: Error | null, rows: any) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        let counters: Counter[] = [];
                        rows.forEach(async (row: any)=> {
                            let services: ServiceType[] = await this.getServicesByCounter(row.counterID);
                            counters.push(new Counter(row.counterID, services, row.status));
                        });
                        resolve(counters);
                    }
                });
            }catch (err){
                reject(err)
            };
        });
    };
    
}



export {CounterDAO};