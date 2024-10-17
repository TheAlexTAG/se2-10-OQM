import { describe, test, expect, beforeAll, afterAll } from "@jest/globals"
import request from 'supertest';

import { app, server } from "../index";
import { cleanup } from "../src/db/cleanup";
import db from "../src/db/db";

const baseURL = "/api";

//Default user information. We use them to create users and evaluate the returned values
const manager = { username: "john", password: "pwd"};
const officer = { username: "george", password: "pwd"};

//Cookies for the users. We use them to keep users logged in. Creating them once and saving them in a variables outside of the tests will make cookies reusable
let managerCookie: string;
let officerCookie: string;

/* Tickets */ 
const ticketsList: any[]= [
    {serviceName: "Package delivery"},
    {serviceName: "General assistence"},
    {serviceName: "General assistence"},
    {serviceName: "Package delivery"},
    {serviceName: "Package delivery"},
    {serviceName: "Tax payment"},
    {serviceName: "Package delivery"},
    {serviceName: "Tax payment"},
    {serviceName: "Tax payment"},
    {serviceName: "Package delivery"},
    {serviceName: "Package delivery"},
    {serviceName: "Tax payment"},
    {serviceName: "Package delivery"}
];


//Helper function that logs in a user and returns the cookie
const login = async (userInfo: any) => {
    return new Promise<string>((resolve, reject) => {
        request(app)
            .post(`${baseURL}/sessions`)
            .send(userInfo)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res.header["set-cookie"][0])
            })
    })
}


async function createTickets(tickets: any[]) {
    for (let ticket of tickets){
        await request(app).post(`${baseURL}/addTicket`).send(ticket).expect(200);
    } 
}

function countQueue(){
    return new Promise<number>((resolve, reject) => {
        db.all("select * from queue;", [], (err:Error|null, rows:any)=>{
            if(err){
                return reject(reject(err));  
            } 
            resolve(rows.length);
        });
    });
}

function getTicket(id: number) {
    return new Promise<number>((resolve, reject) => {
        db.get("select * from ticket where ticketID=?", [id], (err: Error | null, row: any) => {
            if (err) {
                return reject(err);
            }
            resolve(row.served);
        })
    });
}

afterAll(() => {
    server.close(); // Chiude il server al termine dei test
});

/* TEST:  GET /api/served/:counterID  */
describe("GET served/:counterID --> integration", () => {
    beforeAll(async () => {
        await cleanup();
        managerCookie = await login(manager);
        officerCookie = await login(officer);
    });

    afterAll(async () => {
        await cleanup();
    });

    test("Test success served the customer and call next customer", async () => {
        await createTickets(ticketsList);
                
        const first= await request(app).get(`${baseURL}/served/1`).set("Cookie", officerCookie).expect(200);
        expect(first).toBeDefined(); //We expect the user we have created to exist in the array. The parameter should also be equal to those we have sent
        expect(first.body).toBe(1);

        const queueLen1= await countQueue();
        expect(queueLen1).toBe(12);

        const second= await request(app).get(`${baseURL}/served/1`).set("Cookie", officerCookie).expect(200);
        expect(second).toBeDefined();
        expect(second.body).toBe(2);

        const queueLen2= await countQueue();
        expect(queueLen2).toBe(11);
        
        const servedTicket= await getTicket(1);
        expect(servedTicket).toBe(1);
    });

    test("Test error 401 --> not logged in", async () => {
        const result= await request(app).get(`${baseURL}/served/2`).expect(401);
    });

    test("Test error 500 --> not Officer", async () => {
        const result= await request(app).get(`${baseURL}/served/1`).set("Cookie", managerCookie).expect(401);
    });

    test("Test error 401 --> not a counter", async () => {
        const result= await request(app).get(`${baseURL}/served/counter`).set("Cookie", officerCookie).expect(401);
    });

    test("Test error 401 --> counter not active", async () => {
        const result= await request(app).get(`${baseURL}/served/5`).set("Cookie", officerCookie).expect(401);
    });

});

/* TEST:  GET /api/notserved/:counterID */
describe("GET notserved/:counterID --> integration", () => {
    beforeAll(async () => {
        await cleanup();
        managerCookie = await login(manager);
        officerCookie = await login(officer);
    });

    afterAll(async () => {
        await cleanup();
    });

    test("Test success discard the cuurent customer and call the next customer", async () => {
        await createTickets(ticketsList);
                
        const first= await request(app).get(`${baseURL}/notserved/1`).set("Cookie", officerCookie).expect(200);
        expect(first).toBeDefined(); 
        expect(first.body).toBe(1);

        const queueLen1= await countQueue();
        expect(queueLen1).toBe(12);

        const second= await request(app).get(`${baseURL}/notserved/1`).set("Cookie", officerCookie).expect(200);
        expect(second).toBeDefined();
        expect(second.body).toBe(2);

        const queueLen2= await countQueue();
        expect(queueLen2).toBe(11);
        
        const servedTicket= await getTicket(1);
        expect(servedTicket).toBe(2);
    });

    test("Test error 401 --> not logged in", async () => {
        const result= await request(app).get(`${baseURL}/served/2`).expect(401);
    });

    test("Test error 500 --> not Officer", async () => {
        const result= await request(app).get(`${baseURL}/served/1`).set("Cookie", managerCookie).expect(401);
    });

    test("Test error 401 --> not a counter", async () => {
        const result= await request(app).get(`${baseURL}/served/counter`).set("Cookie", officerCookie).expect(401);
    });

    test("Test error 401 --> counter not active", async () => {
        const result= await request(app).get(`${baseURL}/served/5`).set("Cookie", officerCookie).expect(401);
    });

});