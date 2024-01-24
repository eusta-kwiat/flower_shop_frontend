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

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
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
            })
            .catch((err) => {
                console.log(err);
                setDiscountMsg('Nieprawidłowy kod');
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
                description: formData.get('inputCity'), // Modify this based on your actual address structure
                // Include other address properties like province, street, etc.
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
        <>
            <DoubleDiv>
                <div styles={{flex: 1, marginLeft: '20px'}}>
                    {cart.map(element => (
                        <ProductHorizontalCard key={element.product.id} product={element.product} onCartChange={setCart} />
                    ))}
                    <p style={{margin: '10px'}}>Cena całkowita: {totalPrice.toFixed(2)}zł</p>
                </div>
                <div style={{ flex: 1, margin: '0 50px 0 50px' }}>
                    <Form>
                        <Form.Group className='mb-3' controlId='formPromoCode'>
                            <Form.Label>Wprowadź kod promocyjny</Form.Label>
                            <Form.Control
                                placeholder='kod'
                                value={inputPromoCode}
                                onChange={(e) => setInputPromoCode(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant='primary' onClick={onPromoCodeClick}>
                            Zastostuj
                        </Button>
                        {discountMsg && <p>{discountMsg}</p>}
                    </Form>
                </div>
            </DoubleDiv>
            <div style={{display: 'flex', justifyContent: 'flex-end', margin: '5px 5vw'}}>
                {cart.length > 0 && <Button variant='success'>Kontynuuj</Button>}
            </div>

            {/* order form */}
            <Form style={{margin: '20px'}} onSubmit={handleSubmit}>
                <Form.Check 
                    type='switch'
                    id='useUserAddressSwitch'
                    label='Uzyj swojego domyślnego adresu'
                    checked={useDefaultAddress}
                    onChange={handleSwitchChange}
                />

                {!useDefaultAddress && <AddressForm />}

                <Form.Group className='mb-3'>
                <Form.Label>Wybierz metodę dostawy</Form.Label>
                <div>
                    <Form.Check
                        inline
                        type='radio'
                        id='deliveryMethod1'
                        label='Metoda 1'
                        name='deliveryMethod'
                        value={1}
                    />
                    <Form.Check
                        inline
                        type='radio'
                        id='deliveryMethod2'
                        label='Metoda 2'
                        name='deliveryMethod'
                        value={2}
                    />
                    <Form.Check
                        inline
                        type='radio'
                        id='deliveryMethod3'
                        label='Metoda 3'
                        name='deliveryMethod'
                        value={3}
                    />
                </div>
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Wybierz metodę płatności</Form.Label>
                <div>
                    <Form.Check
                        inline
                        type='radio'
                        id='paymentMethod1'
                        label='Metoda 1'
                        name='paymentMethod'
                        value={1}
                    />
                    <Form.Check
                        inline
                        type='radio'
                        id='paymentMethod2'
                        label='Metoda 2'
                        name='paymentMethod'
                        value={2}
                    />
                    <Form.Check
                        inline
                        type='radio'
                        id='paymentMethod3'
                        label='Metoda 3'
                        name='paymentMethod'
                        value={3}
                    />
                </div>
            </Form.Group>


                <Form.Group className='mb-3'>
                    <Form.Label>Uwagi do zamówienia</Form.Label>
                    <Form.Control name='remarks' as='textarea' rows={3} placeholder='Dodaj uwagi...' />
                </Form.Group>
                <Button variant='success' type='submit'>Zamawiam</Button>
            </Form>
            {formMsg && formMsg.length > 0 && <p className='mt-3 text-danger' style={{marginLeft: '15px'}}>*Wystąpił błąd przy przetwarzaniu zamówienia. Upewnij się, ze wypełniłeś wszystkie pola w formularzu</p>}
        </>
    );
}
