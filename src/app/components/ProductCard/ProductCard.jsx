"use client"
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addToCart, removeItem } from '@/app/services/cart';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const itemIndex = cart.findIndex(el => el.product.product_id === product.product_id);
    
    if (itemIndex !== -1) {
      setIsInCart(true);
      setQuantity(cart[itemIndex].quantity);
    } else {
      setIsInCart(false);
      setQuantity(0);
    }
    
  }, [product.product_id])

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
    
    <Card style={{ width: '15rem' , margin: '1rem'}} href={'/products/' + product.product_id}>
      <Link href={`/products/${product.product_id}`} passHref>
      <Card.Img
        variant="top"
        src={product.img}
        alt={product.name}
        style={{ height: '250px', objectFit: 'cover' }}
      />
      </Link>
      <Card.Body>
      <Link href={`/products/${product.product_id}`} passHref style={{textDecoration: 'none'}}>
        <Card.Title>
          <a href="/product_with_id" style={{textDecoration: 'none', color: 'black'}}>{product.name}</a>
        </Card.Title>
      </Link>  
        <Card.Text>
          Cena: {product.price}zł
        </Card.Text>
        <div>
          {isInCart ? (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <div>
                <Button variant="primary" onClick={onDecreaseClick}>-</Button>
                <span style={{ margin: '0 10px' }}>{quantity}</span>
                <Button variant="primary" onClick={onIncreaseClick}>+</Button>
              </div>
              <Button variant="danger" onClick={onRemoveClick}>Usuń</Button>
            </div>
          ) : (
            <Button variant="primary" onClick={onAddClick}>Dodaj</Button>
          )}
        </div>

      </Card.Body>
    </Card>
    
  );
};

export default ProductCard;
