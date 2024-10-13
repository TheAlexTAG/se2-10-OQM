import { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Button, Card, Container, Spinner } from "react-bootstrap";

// Define the types for the data you might receive from the API
interface Ticket {
  ticketId: number;
  serviceId: number;
  waitlistCode: number;
  counterId: number;
  servedTime: Date;
  ticketTime: Date;
  served: number;
}

interface CounterService {
  counterId: number;
  serviceId: number;
}

const CallNextCustomer = () => {
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // We assume the counter officer has a fixed counterId (e.g., 1) (testing)
  const counterId = 1;

  const fetchCurrentCustomer = async () => {
    setLoading(true);
    setError(null); // Reset error
    try {
      const response = await axios.post<Ticket>("/api/current-customer", {
        counterId: counterId,
      });
      setCurrentTicket(response.data);
    } catch (err) {
      setError("No more customers in the queue or an error occurred.");
    } finally {
      setLoading(false);
    }
  };
  const fetchNextCustomer = async () => {
    setLoading(true);
    setError(null); // Reset error
    try {
      const response = await axios.post<Ticket>("/api/next-customer", {
        counterId: counterId,
      });
      setCurrentTicket(response.data);
    } catch (err) {
      setError("No more customers in the queue or an error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Mark the current request as done
  const markCurrentAsDone = async () => {
    if (!currentTicket) return;

    setLoading(true);
    setError(null); // Reset error
    try {
      await axios.post("/api/mark-done", {
        //ticketCode: currentTicket.code,
        //counterId: counterId,
      });
      setCurrentTicket(null); // Clear the current ticket
    } catch (err) {
      setError("Failed to mark the ticket as done.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch the current customer automatically when the page loads
    fetchCurrentCustomer();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">
        Counter {counterId} - Call Next Customer
      </h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {currentTicket ? (
        <Card className="text-center mb-3">
          <Card.Header>Current Ticket</Card.Header>
          <Card.Body>
            <Card.Title>Ticket ID: {currentTicket.ticketId}</Card.Title>
            <Card.Text>Service Type: {currentTicket.serviceId}</Card.Text>
            <Card.Text>Waitlist Code: {currentTicket.waitlistCode}</Card.Text>
            <Button
              variant="success"
              onClick={markCurrentAsDone}
              disabled={loading}
            >
              Mark as Done
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="info" className="text-center">
          No active ticket. Call the next customer.
        </Alert>
      )}

      <div className="text-center">
        <Button
          variant="primary"
          onClick={fetchNextCustomer}
          disabled={loading || !!currentTicket}
        >
          Call Next Customer
        </Button>
      </div>
    </Container>
  );
};

export default CallNextCustomer;
