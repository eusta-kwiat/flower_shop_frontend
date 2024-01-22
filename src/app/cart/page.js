"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductHorizontalCard from '../components/ProductHorizontalCard/ProductHorizontalCard';
import { getTotalPrice } from '../services/cart';
import { DoubleDiv } from './styles';
import { getDiscounts } from '../services/api';




export default function Cart() {
    const router = useRouter();

    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0.00);
    const [discounts, setDiscounts] = useState([])

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    useEffect(() => {
        setTotalPrice(getTotalPrice(cart));
    }, [cart]);

    useEffect(() => {
        const localCart = JSON.parse(localStorage.getItem('cart'));
        getDiscounts(localCart)
            .then((res) => {
                setDiscounts(res.data)
            })
            .catch((err) => console.log(err));
        console.log(discounts);
    }, []);

    const calculateTotalPrice = () => {
        setTotalPrice(getTotalPrice(cart));
    }
    

    return (
        <DoubleDiv>
            <div styles={{flex: 1, marginLeft: '20px'}}>
                {cart.map(element => (
                    <ProductHorizontalCard key={element.product.id} product={element.product} />
                ))}
                <p style={{margin: '10px'}}>Cena całkowita: {totalPrice.toFixed(2)}zł</p>
            </div>
            <div style={{ flex: 1, marginLeft: '50px' }}>
                <h2>Znizki</h2>
            </div>
        </DoubleDiv>
    );
}
