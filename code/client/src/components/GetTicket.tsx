import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GetTicket.css';
import API from '../API.ts'; 
import { Container } from 'react-bootstrap';
interface Service {
  id: number;
  tag: string;
  name: string;
  description: string;
  serviceTime: number;
}

export default function GetTicket() {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await API.getAllServices(); 
        if (Array.isArray(response)) {
          setServices(response);
        } else {
          setError('Unexpected response format');
        }
        setLoading(false);
      } catch (err) {
        console.error(err); 
        setError('Failed to load services');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleSelectService = async (service: Service) => {
    try {
      const response = await API.addTicket(service.name);

      const waitlistCode = response.waitlistCode; // Ottieni il codice della lista d'attesa
      
      // Reindirizza alla pagina di conferma del ticket passando il numero e il servizio
      navigate(`/ticket/${service.tag}/${waitlistCode}`);
    } catch (err) {
      console.error('Failed to add ticket:', err);
      setError('Failed to add ticket');
    }
  };

  if (loading) {
    return <div className="centered-container">Loading services...</div>;
  }

  if (error) {
    return <div className="centered-container text-danger">{error}</div>;
  }

  return (
    <Container className ="sm-5">
      <div className="card p-4">
        <h1 className="text-center">Select a Service</h1>
        <div className="d-flex justify-content-center my-4">
          {Array.isArray(services) && services.length > 0 ? (
            services.map((service) => (
              <button
                key={service.id}
                onClick={() => handleSelectService(service)}
                className="btn btn-primary mx-2"
              >
                {service.name}
              </button>
            ))
          ) : (
            <div>No services available</div>
          )}
        </div>
      </div>
    </Container>
  );
}