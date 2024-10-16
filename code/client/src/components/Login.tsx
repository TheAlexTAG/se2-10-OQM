import { useState, FormEvent } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import API from "../app/services/API";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) {
      setError("Please enter your username.");
      return;
    } else if (!password) {
      setError("Please enter your password.");
      return;
    } else {
      API.login(username, password)
        .then((response: any) => {
          navigate("/officer");
        })
        .catch((err: any) => {
          setError(err.response.data.message);
        });
    }

    setError("");
  };

  return (
    <Container>
      <Row className="justify-content-center w-100 mt-4">
        <Col md={8} className="border rounded" style={{ padding: "50px" }}>
          <h2>Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form className="w-100" onSubmit={handleSubmit}>
            <Form.Group
              controlId="formBasicusername"
              className="text-left mb-4"
            >
              <Form.Label>username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              controlId="formBasicPassword"
              className="text-left mb-4"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
