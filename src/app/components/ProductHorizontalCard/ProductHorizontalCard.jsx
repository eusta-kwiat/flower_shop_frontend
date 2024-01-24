// ProductHorizontalCard.jsx
"use client";
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addToCart, removeItem } from '@/app/services/cart';
import { RowDiv, Thumbnail, mg, ProductTitle } from './styles';

const ProductHorizontalCard = ({ product, onCartChange }) => {
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
  }, [product.product_id]);

  const onAddClick = () => {
    addToCart(product, 1);
    setIsInCart(true);
    setQuantity(quantity + 1);
    onCartChange(JSON.parse(localStorage.getItem('cart')));
  }

  const onRemoveClick = () => {
    removeItem(product);
    setIsInCart(false);
    setQuantity(0);
    onCartChange(JSON.parse(localStorage.getItem('cart')));
  }

  const onIncreaseClick = () => {
    setQuantity(quantity + 1);
    addToCart(product, 1);
    onCartChange(JSON.parse(localStorage.getItem('cart')));
  };

  const onDecreaseClick = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      addToCart(product, -1);
      onCartChange(JSON.parse(localStorage.getItem('cart')));
    }
  };

  return (
    isInCart && <RowDiv>
      <Thumbnail src={product.img} alt={product.name} style={{marginLeft: '10px', width: '50px', objectFit: 'cover', width: 'resize'}} />
      <ProductTitle style={mg}>{product.name}</ProductTitle>
      <div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <div>
              <span style={{ margin: '0 10px' }}>{product.price} zł</span>
                <Button variant="primary" onClick={onDecreaseClick} style={{margin: '10px'}} disabled={quantity === 1}>-</Button>
                <span style={{ margin: '0 10px' }}>{quantity}</span>
                <Button variant="primary" onClick={onIncreaseClick} style={{margin: '10px'}}>+</Button>
              </div>
              <Button variant="danger" onClick={onRemoveClick} style={{margin: '10px'}}>Usuń</Button>
            </div>
        </div>
    </RowDiv>
  )
};

export default ProductHorizontalCard;
