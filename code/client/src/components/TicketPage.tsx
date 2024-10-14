import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/TicketPage.css";

export default function TicketPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ticketNumber, service } = location.state || {};

  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      navigate("/");
    }, 30000);

    // Cleanup timer
    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  const handlePrintTicket = () => {
    window.print(); // Apre la finestra di dialogo di stampa
    navigate("/");
  };

  if (!ticketNumber || !service) {
    return <p>No ticket data available.</p>;
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div
        className="printable-ticket alert alert-success mt-4 text-center"
        role="alert"
      >
        <h4 className="alert-heading">Il tuo ticket:</h4>
        <p>
          Numero: <strong>{ticketNumber}</strong>
        </p>
        <p>
          Servizio: <strong>{service.name}</strong>
        </p>
        <p>
          Tempo di attesa stimato: <strong>{service.waitTime} minuti</strong>
        </p>
      </div>

      <p className="timer-text mt-3">
        Entro <strong>{secondsLeft}</strong> secondi sarai reindirizzato alla
        pagina iniziale.
      </p>

      <button className="btn btn-primary mt-4" onClick={handlePrintTicket}>
        Salva il ticket in PDF
      </button>
    </div>
  );
}
