import React, { useEffect, useState } from "react";
import API from "../API"; // Assicurati che questa importazione sia corretta
import "../styles/CallCustomer.css";

interface Service {
  id: number;
  tag: string; // Aggiungi il tag del servizio qui
  name: string; // Se hai bisogno del nome del servizio
}

interface CalledTicket {
  ticketID: number;
  serviceID: number;
  waitlistCode: number;
  counterID: number | null;
}

export default function CallCustomer() {
  const [calledTickets, setCalledTickets] = useState<CalledTicket[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalledTickets = async () => {
      try {
        // Carica i ticket chiamati
        const ticketsResponse = await API.getAllTickets();
        if (Array.isArray(ticketsResponse)) {
          setCalledTickets(ticketsResponse);
        } else {
          setError("Unexpected response format for tickets");
          return;
        }

        // Carica i servizi
        const servicesResponse = await API.getAllServices(); // Assicurati di avere questa funzione nell'API
        if (Array.isArray(servicesResponse)) {
          setServices(servicesResponse);
        } else {
          setError("Unexpected response format for services");
        }
      } catch (err) {
        console.error("Failed to load tickets or services:", err);
        setError("Failed to load tickets or services");
      } finally {
        setLoading(false);
      }
    };

    fetchCalledTickets();
  }, []);

  if (loading) {
    return <div className="centered-container">Loading tickets...</div>;
  }

  if (error) {
    return <div className="centered-container text-danger">{error}</div>;
  }

  return (
    <div className="table-container">
      <table className="ticket-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Ticket Number</th>
            <th>Counter</th>
          </tr>
        </thead>
        <tbody>
          {calledTickets.slice(0, 6).map((ticket, index) => {
            const service = services.find(s => s.id === ticket.serviceID);
            return (
              <tr key={index}>
                <td>{service ? service.tag : "Unknown Service"}</td>
                <td>{ticket.waitlistCode}</td>
                <td>{ticket.counterID ? ticket.counterID : "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
