"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductHorizontalCard from '../components/ProductHorizontalCard/ProductHorizontalCard';

export default function Cart() {
    const router = useRouter();

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log('Stored Cart:', storedCart);
        setCart(storedCart);
    }, []);
    

    return (
        <div>
            {cart.map(element => (
                <ProductHorizontalCard key={element.product.id} product={element.product} />
            ))}
        </div>
    );
}
