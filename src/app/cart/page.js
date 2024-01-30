"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductHorizontalCard from '../components/ProductHorizontalCard/ProductHorizontalCard';
import { getTotalPrice, transformCartToOrder } from '../services/cart';
import { DoubleDiv } from './styles';
import { getDiscounts, placeOrder } from '../services/api';
import Form from 'react-bootstrap/Form'
import { Container, Row, Col, Button } from 'react-bootstrap';



const AddressForm = () => {
    return (
        <>
            <Form.Label htmlFor="inputCity">Miasto</Form.Label>
            <Form.Control
                id="inputCity"
                name="inputCity" // Add name attribute
            />

            <Form.Label htmlFor="inputProvince">Województwo</Form.Label>
            <Form.Control
                id="inputProvince"
                name="inputProvince" // Add name attribute
            />

            <Form.Label htmlFor="inputStreet">Ulica</Form.Label>
            <Form.Control
                id="inputStreet"
                name="inputStreet" // Add name attribute
            />

            <Form.Label htmlFor="inputApartNumber">Nr lokalu</Form.Label>
            <Form.Control
                id="inputApartNumber"
                name="inputApartNumber" // Add name attribute
            />

            <Form.Label htmlFor="inputPostalCode">Kod pocztowy</Form.Label>
            <Form.Control
                id="inputPostalCode"
                name="inputPostalCode" // Add name attribute
            />
        </>
    );
};



export default function Cart() {
    const router = useRouter();

    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0.00);
    const [inputPromoCode, setInputPromoCode] = useState("");
    const [discountMsg, setDiscountMsg] = useState("");
    const [useDefaultAddress, setUseDefaultAddress] = useState(false);
    const [formMsg, setFormMsg] = useState("");
    const [discountStyle, setDiscountStyle] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
        setIsLoggedIn(localStorage.getItem('isLoggedIn') === true);
    }, []);

    useEffect(() => {
        setTotalPrice(getTotalPrice(cart));
    }, [cart]);

    const onShoppingClick = () => {
        router.push('/');
    }

    const onPromoCodeClick = () => {
        getDiscounts(cart, inputPromoCode)
            .then((res) => {
                console.log(res.data);
                setDiscountMsg('Uzyto kodu. Nowa cena: ' + res.data.price.toFixed(2) + 'zł');
                setDiscountStyle('text-success');
            })
            .catch((err) => {
                console.log(err);
                setDiscountMsg('Nieprawidłowy kod');
                setDiscountStyle('text-danger');
            })
    }

    const onContinueClick = () => {
        router.push('/cart/order');
    }

    const handleSwitchChange = () => {
        setUseDefaultAddress(!useDefaultAddress);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let addressData = null;
        const formData = new FormData(event.target);
    
        if (!useDefaultAddress) {
            addressData = {
                province: formData.get('inputProvince'),
                city: formData.get('inputCity'),
                street: formData.get('inputStreet'),
                apartmentNumber: formData.get('inputApartNumber'),
                postalCode: formData.get('inputPostalCode')
            };
        }
    
        const orderData = {
            ...(addressData && { address: addressData }), // Conditionally include address
            remarks: formData.get('remarks'),
            ...(inputPromoCode && inputPromoCode.length > 0 && { discount_code: inputPromoCode }),
            products: transformCartToOrder(cart), // Assuming you have the transformCart function defined
            payment_method: parseInt(formData.get('paymentMethod'), 10), // Assuming paymentMethod is an integer
        };
    
        console.log(orderData);

        placeOrder(orderData)
            .then((res) => {
                console.log(res.data);
                localStorage.removeItem('cart');
                router.push('/cart/success');
            })
            .catch((err) => {
                console.log('err', err);
                setFormMsg(err.message);
            })

    };
    
    if (cart.length <= 0)
    return (
        <Container className="mt-5">
            <Row>
                <Col className="text-center">
                    <h2>Twój koszyk jest pusty</h2>
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    <Button variant='info' onClick={onShoppingClick} className='mx-auto'>
                        Wróć do sklepu
                    </Button>
                </Col>
            </Row>
        </Container>
      );

      return (
        <Container className="mt-5">
            <Row>
                <Col xs={12} lg={8}>
                    {cart.map(element => (
                        <ProductHorizontalCard key={element.product.id} product={element.product} onCartChange={setCart} />
                    ))}
                    <p className="mt-3">Cena całkowita: {totalPrice.toFixed(2)}zł</p>
                </Col>
                <Col xs={12} lg={4} style={{paddingLeft: '50px'}}>
                    <Form style={{marginBottom: '25px'}}>
                        
                        <Form.Group className='mb-3' controlId='formPromoCode'>
                            <Form.Label>Wprowadź kod promocyjny</Form.Label>
                            <Form.Control
                                placeholder='kod'
                                value={inputPromoCode}
                                onChange={(e) => setInputPromoCode(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant='primary' onClick={onPromoCodeClick}>
                            Zastosuj
                        </Button>
                        {discountMsg && <p className={"mt-2 " + discountStyle}>{discountMsg}</p>}
                    </Form>
                    <Form className='mt-4' onSubmit={handleSubmit}>
                <Form.Check 
                    type='switch'
                    id='useUserAddressSwitch'
                    label='Użyj swojego domyślnego adresu'
                    checked={useDefaultAddress}
                    onChange={handleSwitchChange}
                />

                {!useDefaultAddress && <AddressForm />}

                <Form.Group className='mb-3'>
                    <Form.Label>Wybierz metodę płatności</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            type='radio'
                            id='paymentMethod1'
                            label='Przelew'
                            name='paymentMethod'
                            value={1}
                        />
                        <Form.Check
                            inline
                            type='radio'
                            id='paymentMethod2'
                            label='Karta płatnicza'
                            name='paymentMethod'
                            value={2}
                        />
                        <Form.Check
                            inline
                            type='radio'
                            id='paymentMethod3'
                            label='BLIK'
                            name='paymentMethod'
                            value={3}
                            variant='primary'
                        />
                    </div>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Uwagi do zamówienia</Form.Label>
                    <Form.Control name='remarks' as='textarea' rows={3} placeholder='Dodaj uwagi...' />
                </Form.Group>
                {formMsg && formMsg.length > 0 && <p className='mt-3 text-danger'>{
                'Wystąpił błąd przy przetwarzaniu zamówienia. Sprawdź czy poprawnie wypełniłeś/aś cały formularz.'
                }</p>}
                { isLoggedIn ? 
                    <Button variant='success' type='submit' style={{marginBottom: '75px'}}>Zamawiam</Button> :
                    <p className='mt-3 text-secondary'>Zaloguj się w celu złożenia zamówienia</p>}
            </Form>
                </Col>
            </Row>

            {/* Order form */}
            
            
        </Container>
    );
}
