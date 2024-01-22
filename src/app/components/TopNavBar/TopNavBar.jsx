"use client"
import React, { useState } from 'react';
import { Navbar, Nav, NavbarBrand, NavLink } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const TopNavbar = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleLoginClick = () => {
        router.push('/login');
    }

    useEffect(() => {
        const checkLoginStatus = () => {
            const localItem = localStorage.getItem('isLoggedIn');
            console.log('localStorage', localItem);
            const isLoggedInLocalStorage = localStorage.getItem('isLoggedIn') === 'true';
            setIsLoggedIn(isLoggedInLocalStorage);
            setIsLoading(false);
            console.log(isLoggedIn);
        };
    
        checkLoginStatus();
      }, []);

    const onLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.setItem('isLoggedIn', 'false');
        setIsLoggedIn(false);
    }

    const onCartClick = () => {
        router.push('/cart');
    }

    const onClear = () => {
        localStorage.clear()
    }

    const onProfileClick = () => {
        router.push('/orders');
    }

    return (
        <Navbar bg="dark" variant="dark">
            <NavbarBrand href='/' style={{ marginLeft: '10px' }}>Eustakwiat</NavbarBrand>
            <Nav className="ml-auto">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/">Products</NavLink>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/contact">Contact</NavLink>
            </Nav>
            <div style={{ display: 'flex', flexDirection: 'row-reverse', width: '100%' }}>
                <Button variant='info' style={{ width: '100px', marginRight: '15px' }} onClick={onCartClick}>Kosz</Button>
                {isLoading ? (
                    <></>
                    ) : isLoggedIn ? (
                    <Button variant="danger" style={{ width: '100px', marginRight: '15px' }} onClick={onLogout}>
                        Wyloguj
                    </Button>
                    ) : (
                    <Button variant="success" style={{ width: '100px', marginRight: '15px' }} onClick={handleLoginClick}>
                        Zaloguj
                    </Button>
                )}
                <Button variant='success' style={{ width: '100px', marginRight: '15px' }} onClick={onProfileClick}>Profil</Button>
                <Button variant='info' style={{ width: '100px', marginRight: '15px' }} onClick={onClear}>Clear</Button>

            </div>
        </Navbar>
    );
};

export default TopNavbar;
