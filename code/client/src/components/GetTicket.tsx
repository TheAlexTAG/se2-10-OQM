import { useState } from "react";
import "../styles/GetTicket.css";
import { Container } from "react-bootstrap";
interface Service {
  id: number;
  name: string;
  waitTime: number;
}

const services: Service[] = [
  { id: 1, name: "Service 1", waitTime: 5 },
  { id: 2, name: "Service 2", waitTime: 10 },
  { id: 3, name: "Service 3", waitTime: 15 },
];

export default function GetTicket() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [ticketNumber, setTicketNumber] = useState<number | null>(null);

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    const randomTicketNumber = Math.floor(Math.random() * 1000) + 1;
    setTicketNumber(randomTicketNumber);
  };

  return (
    <Container className="mt-5">
      {/*<div className="centered-container d-flex flex-column justify-content-center align-items-center">*/}

      <h1 className="text-center">Select a Service</h1>
      <div className="d-flex justify-content-center my-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => handleSelectService(service)}
            className="btn btn-primary mx-2"
          >
            {service.name}
          </button>
        ))}
      </div>

      {selectedService && ticketNumber && (
        <div className="alert alert-success mt-4 text-center" role="alert">
          <h4 className="alert-heading">Il tuo ticket:</h4>
          <p>
            Numero: <strong>{ticketNumber}</strong>
          </p>
          <p>
            Servizio: <strong>{selectedService.name}</strong>
          </p>
          <p>
            Tempo di attesa stimato:
            <strong>{selectedService.waitTime} minuti</strong>
          </p>
        </div>
      )}
      {/*</div>*/}
    </Container>
  );
}
