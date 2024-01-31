"use client"

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { getProductById } from '@/app/services/api';
import { usePathname, useSearchParams, useParams } from 'next/navigation';
import { addToCart, removeItem } from '@/app/services/cart';

const ProductDescriptionPage = () => {
    const params = useParams();
    const productId = parseInt(params.productId);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        img: '',
        discount: {},
    });
    const [isInCart, setIsInCart] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const { name, description, price, img, discount } = product;

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const itemIndex = cart.findIndex(el => el.product.product_id === productId);
        
        if (itemIndex !== -1) {
        setIsInCart(true);
        setQuantity(cart[itemIndex].quantity);
        } else {
        setIsInCart(false);
        setQuantity(0);
        }
        
    }, [])

    useEffect(() => {
        getProductById(productId)
            .then((res) => {
                const foundProduct = res.data.filter(prod => prod.product_id === productId)[0];
                foundProduct.img = `/flower_images/${productId}.jpg`;
                setProduct(foundProduct);
                console.log(foundProduct);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const hasDiscount = discount && Object.keys(discount).length > 0;
    const firstDiscount = discount ? Object.values(discount)[0] : null;

    const onAddClick = () => {
        console.log(product);
        addToCart(product, 1);
        setIsInCart(true);
        setQuantity(quantity + 1);
    }
    
      const onRemoveClick = () => {
        removeItem(product);
        setIsInCart(false);
        setQuantity(0);
    }
    
      const onIncreaseClick = () => {
        setQuantity(quantity + 1);
        addToCart(product, 1);
    };
    
      const onDecreaseClick = () => {
        if (quantity > 1) {
          setQuantity(quantity - 1);
          addToCart(product, -1);
        }
    };

  

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Image src={img} alt={name} className='mx-auto d-block' style={{width: '200px', height: '200px'}} />
              <h2 className="mt-3">{name}</h2>
              <p>{description}</p>
              <div className="d-flex justify-content-between align-items-center mb-6">
                <h4>
                  {price && parseFloat(price).toFixed(2)}zł
                </h4>
                <div>
                {hasDiscount && <p className='text-success'>Dostępna promocja: {firstDiscount.percentage}%</p>}
                {hasDiscount && <p className='text-success'>Kod {firstDiscount.code} za {firstDiscount.pointsCost} pyłków</p>}
                </div>
              </div>
              {isInCart ? (<Row>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <div>
                        <Button variant="primary" onClick={onDecreaseClick}>-</Button>
                        <span style={{ margin: '0 10px' }}>{quantity}</span>
                        <Button variant="primary" onClick={onIncreaseClick}>+</Button>
                    </div>
                    <Button variant="danger" onClick={onRemoveClick}>Usuń</Button>
                    </div>
                    </Row>) : (
                    <Button variant="primary" onClick={onAddClick}>Dodaj</Button>
              )}
            </Card.Body>
          </Card>
        </Col>
        
      </Row>
      <Row>
          
      </Row>
    </Container>
  );
};

export default ProductDescriptionPage;
