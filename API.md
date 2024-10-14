## API Server

#### Service API

- GET `/api/getAllServices`
    - description: route for getting all the services;
    - request body: none;
    - response body: 
    ``` json
    [
        {
        "id": 1,
        "tag": "TP01",
        "name": "Tax payment",
        "description": null,
        "serviceTime": 5
        },
        {
        "id": 2,
        "tag": "PD02",
        "name": "Package delivery",
        "description": null,
        "serviceTime": 10
        },
        {
        "id": 3,
        "tag": "GA03",
        "name": "General assistence",
        "description": null,
        "serviceTime": 30
        }
    ]
    ```
    - response:
      It should return status code `200 Ok` on success.
      It should return status code `500 Internal Server Error` if the database query throws and error.

- GET `/api/getService/:serviceName`
    - description: route for getting a service given its name;
    - params: 
      `serviceName`: The service name of the service to get.
    - request body: none;
    - response body: 
    ``` json
    {
    "id": 1,
    "tag": "TP01",
    "name": "Tax payment",
    "description": null,
    "serviceTime": 5
    }
    ```
    - response:
      It should return status code `200 Ok` on success.
      It should return status code `404 Not Found` if there are no matches in the database.
      It should return status code `500 Internal Server Error` if the database query throws and error.

#### Ticket API
- POST `/api/addTicket`
    - description: route for inserting a ticket in the database;
    - request body:
    ``` json
    {
    "serviceName" : "Package delivery"
    }
    ```
    - response body: 
    ``` json
    {
    "ticketID": 1,
    "serviceID": 1,
    "waitlistCode": 1,
    "counterID": null,
    "servedTime": null,
    "ticketDate": "2024-10-14 18:28:26",
    "served": 0
    }
    ```
    - response:
      It should return status code `200 Ok` on success.
      It should return status code `404 Not Found` if the service specified in the body is not found.
      It should return status code `500 Internal Server Error` if the database query throws and error.