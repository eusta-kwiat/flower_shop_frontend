"use client"
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const LoginForm = ({ onLogin, onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = () => {
	console.log(email, password);
	onLogin(email, password);
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row style={{width: '600px'}}>
        <Col md={{ span: 6, offset: 3 }}>
          <Form>
            <Form.Group style={{margin: '20px'}} controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group style={{margin: '20px'}} controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

			<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
				<Button variant="primary" onClick={handleLoginClick}>
				Login
				</Button>

				<Button variant="success" onClick={onRegister}>
				Register
				</Button>
			</div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
