import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaExchangeAlt, FaSignOutAlt } from 'react-icons/fa';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import '../css/navbar.css';

interface NavBarProps {
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onLogout }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <span className="brand-text">AgentRAG</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/chat-ui" className="d-flex align-items-center">
              <FaHome className="me-2" />
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/transactions" className="d-flex align-items-center">
              <FaExchangeAlt className="me-2" />
              Transactions
            </Nav.Link>
          </Nav>
          <Button 
            variant="outline-light" 
            onClick={onLogout}
            className="d-flex align-items-center"
          >
            <FaSignOutAlt className="me-2" />
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;