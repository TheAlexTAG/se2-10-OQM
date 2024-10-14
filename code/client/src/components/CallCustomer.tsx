import React from 'react';
import '../styles/CallCustomer.css';

interface CalledTicket {
  ticketNumber: number;
  service: string;
  desk?: number; // Desk sarà opzionale
}

// Elenco statico dei ticket chiamati
const calledTickets: CalledTicket[] = [
  { ticketNumber: 124, service: 'Service 1', desk: 3 },
  { ticketNumber: 125, service: 'Service 2' }, // Nessun desk assegnato
  { ticketNumber: 126, service: 'Service 3', desk: 2 },
  { ticketNumber: 127, service: 'Service 1' }, // Nessun desk assegnato
  { ticketNumber: 128, service: 'Service 2', desk: 1 },
];

export default function CallCustomer() {
  return (
    <div className="table-container">
      <table className="ticket-table">
        <thead>
          <tr>
            <th>Servizio</th>
            <th>Numero del Ticket</th>
            <th>Bancone</th>
          </tr>
        </thead>
        <tbody>
          {calledTickets.map((ticket, index) => (
            <tr key={index}>
              <td>{ticket.service}</td>
              <td>{ticket.ticketNumber}</td>
              <td>{ticket.desk ? ticket.desk : '—'}</td> {/* Se desk non esiste, visualizza "—" */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
