"use client"
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useParams } from 'next/navigation';
import { getOrderDetails } from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCreditCard, faMapMarkerAlt, faComment } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function OrderDetails() {
  const params = useParams();
  const orderId = params.orderId;
  const [details, setDetails] = useState(null);

  useEffect(() => {
    getOrderDetails(orderId)
      .then((res) => {
        setDetails(res.data)
        console.log(res.data);
      })
      .catch((err) => { console.log(err) })
  }, []);

  const onComplaintClick = () => {
    // TODO
  }

  const calculateTotalPrice = () => {
    return details?.order_products?.reduce((total, product) => {
      return parseFloat(total + product.quantity * product.price).toFixed(2);
    }, 0);
  };

  return (
    <Container>
      <h1>Zamówienie nr {orderId}</h1>
      <Row className="align-items-stretch">
        {/* Client Info */}
        <Col md={6}>
          <Card>
            <Card.Body className="d-flex align-items-center">
              <FontAwesomeIcon icon={faUser} size="3x" className="mr-3" />
              <ul>
                <li>{details?.client?.firstName} {details?.client?.lastName}</li>
                <li>{details?.client?.phone}</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        {/* Payment Info */}
        <Col md={6} className='d-flex flex-column'>
          <Card>
            <Card.Body className="d-flex align-items-center">
              <FontAwesomeIcon icon={faCreditCard} size="3x" className="mr-3" />
              <ul>
                <li>{details?.payment?.paymentMethod?.name}</li>
                <li>{details?.payment?.paymentStatus?.name}</li>
                <li>{details?.payment?.paymentDate}</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: '15px' }}>
        {/* Address */}
        <Col md={6}>
          <Card>
            <Card.Body className="d-flex align-items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" className="mr-3" />
              <ul>
                <li>{details?.address?.street} {details?.address?.apartmentNumber}</li>
                <li>{details?.address?.city}, {details?.address?.province}</li>
                <li>{details?.address?.postalCode}</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        {/* Remarks */}
        <Col md={6}>
          <Card>
            <Card.Body className="d-flex align-items-center">
              <FontAwesomeIcon icon={faComment} size="3x" className="mr-3" />
              <p style={{marginLeft: '20px'}}>{details?.remarks}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: '15px' }}>
        {/* Products Info */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <h4>Produkty w zamówieniu:</h4>
              <ul>
                {details?.order_products?.map((product, index) => (
                  <li key={index}>
                    <strong>{product.name}</strong> - {product.quantity} szt. x {product.price.toFixed(2)} zł
                  </li>
                ))}
              </ul>
              <p className="mt-3">Suma zamówienia: {calculateTotalPrice()} zł</p>
            </Card.Body>
          </Card>
          <Button variant='danger' onClick={onComplaintClick} style={{marginTop: '10px'}}>Reklamacja</Button>
        </Col>
      </Row>
    </Container>
  );
}
