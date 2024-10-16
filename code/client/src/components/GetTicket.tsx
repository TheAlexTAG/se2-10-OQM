import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GetTicket.css';
import API from '../API'; 
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

      const waitlistCode = response.waitlistCode;
      
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
    <Container className="centered-container sm-5">
      <div className="border rounded col-md-8 custom-class">
        <h1 className="text-center">Choose your Service</h1>
        <div className="d-flex flex-column align-items-center my-4">
          {Array.isArray(services) && services.length > 0 ? (
            services.map((service) => (
              <button
                key={service.id}
                onClick={() => handleSelectService(service)}
                className="btn btn-primary my-2"
                style={{ width: "100%", maxWidth: "300px" }}
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