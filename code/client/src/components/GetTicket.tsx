import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GetTicket.css";

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
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleSelectService = (service: Service) => {
    const randomTicketNumber = Math.floor(Math.random() * 1000) + 1;

    // Reindirizza alla pagina di conferma del ticket passando il numero e il servizio
    navigate(`/ticket/${service.id}`, {
      state: { ticketNumber: randomTicketNumber, service },
    });
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="card p-4">
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
      </div>
    </div>
  );
}
