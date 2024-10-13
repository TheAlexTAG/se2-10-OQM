import { NavLink, Outlet } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";

function TopBar() {
  const { loggedIn } = useAuthContext();
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            Screen selection
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as="div">
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to="/"
                >
                  Customer
                </NavLink>
              </Nav.Link>
              <Nav.Link as="div">
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to={`/login`}
                >
                  Counter officer
                </NavLink>
              </Nav.Link>
              <Nav.Link as="div">
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to={`/display`}
                >
                  Monitor in the waiting room
                </NavLink>
              </Nav.Link>
              <Nav.Link as="div">
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to={`/officer`}
                >
                  Bypass login for officer (dev only)
                </NavLink>
              </Nav.Link>
              {loggedIn ? (
                <Nav.Link as="div">
                  <div>LoggedIn</div>
                </Nav.Link>
              ) : (
                <Nav.Link as="div">
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "")}
                    to="/login"
                  >
                    Login
                  </NavLink>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr />
      <Outlet />
    </div>
  );
}

export default TopBar;
