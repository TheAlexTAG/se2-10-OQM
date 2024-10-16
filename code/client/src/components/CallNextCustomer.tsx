import { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Card,
  Container,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
import API from "../app/services/API";

interface Ticket {
  ticketID: number;
  serviceID: number;
  waitlistCode: number;
  counterId: number;
  servedTime: Date;
  ticketTime: Date;
  served: number;
}

const CallNextCustomer = () => {
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { counterId } = useAuthContext();
  const fetchCurrentCustomer = async () => {
    setLoading(true);
    setError(null); // Reset error

    try {
      const ticketData = await API.getCurrentCustomer(counterId);

      setCurrentTicket(ticketData);
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
      const myData = await API.getServedNextCustomer(counterId);
      setCurrentTicket(myData.data);
    } catch (err) {
      setError("No more customers in the queue or an error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Mark the current request as done
  /*const markCurrentAsDone = async () => {
    if (!currentTicket) return;

    setLoading(true);
    setError(null); // Reset error
    try {
      await axios.post("/api/mark-done", {
        // ticketCode: currentTicket.code,
        // counterId: counterId,
      });
      setCurrentTicket(null); // Clear the current ticket
    } catch (err) {
      setError("Failed to mark the ticket as done.");
    } finally {
      setLoading(false);
    }
  };*/

  useEffect(() => {
    // Fetch the current customer automatically when the page loads
    fetchCurrentCustomer();
  }, []);
  console.log(!!currentTicket);
  return (
    <Container className="mt-5 d-flex flex-column align-items-center">
      <h2 className="text-center mb-4">Counter {counterId}</h2>
      {/* Loading Spinner */}
      {loading && (
        <div className="text-center mb-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {/* Error Message */}
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}
      {/* Current Ticket Information */}
      {currentTicket ? (
        <Card
          className="text-center mb-4 shadow"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <Card.Header as="h5">Current Ticket</Card.Header>
          <Card.Body>
            <Card.Title>Ticket ID: {currentTicket.ticketID}</Card.Title>
            <Card.Text>Service Type: {currentTicket.serviceID}</Card.Text>
            <Card.Text>Waitlist Code: {currentTicket.waitlistCode}</Card.Text>
            <Button
              variant="success"
              onClick={fetchNextCustomer}
              disabled={loading}
              className="mt-3"
            >
              Call Next Customer
            </Button>

            {/*<Button
              variant="success"
              onClick={markCurrentAsDone}
              disabled={loading}
            >
              Mark as Done
            </Button>*/}
          </Card.Body>
        </Card>
      ) : (
        <>
          <Alert
            variant="info"
            className="text-center"
            style={{ maxWidth: "500px", width: "100%" }}
          >
            No active ticket. Call the next customer.
          </Alert>
          <Row className="justify-content-center">
            <Col xs="auto">
              <Button
                variant="primary"
                onClick={fetchNextCustomer}
                disabled={loading || !!currentTicket}
                className="mt-3"
              >
                (Mark as served) Call Next Customer
              </Button>
            </Col>
          </Row>
        </>
      )}
      {/* Call Next Customer Button */}
      {/* <Row className="justify-content-center">
        <Col xs="auto">
          <Button
            variant="primary"
            onClick={fetchNextCustomer}
            disabled={loading || !!currentTicket}
            className="mt-3"
          >
            Call Next Customer
          </Button>
        </Col>
      </Row>*/}
    </Container>
  );
};

export default CallNextCustomer;
