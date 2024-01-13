"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image'
import styles from './page.module.css'
import ProductList from './components/ProductList/ProductList';
import { useEffect } from 'react';
import { initializeCart } from './services/cart';

export default function Home() {
    useEffect(() => {
        initializeCart();
    }, []);
    
    return (
        <ProductList />
    )
}
