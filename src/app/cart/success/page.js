"use client"

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const OrderConfirmationPage = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="text-center">
            <Card.Body>
              <FontAwesomeIcon icon={faCheckCircle} size="5x" color="green" className="mb-3" />
              <h2>Twoje zamówienie zostało złozone</h2>
              <p>Link do płatności wysłaliśmy na Twój adres email. Dziękujemy za zakupy w Eustakwiat!</p>
              <Button variant="primary" href="/">
                Powrót do sklepu
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderConfirmationPage;
