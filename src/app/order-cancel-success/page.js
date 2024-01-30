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
              <h2>Zamówienie anulowane, środki na twoje konto zostaną zwrócone w ciągu 3 dni roboczych.</h2>
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
