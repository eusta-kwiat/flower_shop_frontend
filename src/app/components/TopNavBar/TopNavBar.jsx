"use client"
import React, { useState } from 'react';
import { Navbar, Nav, NavbarBrand, NavLink } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faUser, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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
        router.push('/');
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
        <Navbar style={{backgroundColor: '#B1B7D1'}}>
            <NavbarBrand href='/' style={{ marginLeft: '10px' }}>Eustakwiat</NavbarBrand>
            <Nav className="ml-auto">
                <NavLink href="/">Produkty</NavLink>
                <NavLink href="/promo">Rabaty</NavLink>
                <NavLink href="/about">Kontakt</NavLink>
            </Nav>
            <div style={{ display: 'flex', flexDirection: 'row-reverse', width: '100%' }}>
                <Nav.Link onClick={onCartClick} style={{marginRight: '20px'}}>
                <FontAwesomeIcon icon={faShoppingBasket} /> Kosz
                </Nav.Link>
                {isLoading ? (
                <></>
                ) : isLoggedIn ? (
                <Nav.Link onClick={onLogout} style={{marginRight: '20px'}}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Wyloguj
                </Nav.Link>
                ) : (
                <Nav.Link onClick={handleLoginClick} style={{marginRight: '20px'}}>
                    <FontAwesomeIcon icon={faSignInAlt} /> Zaloguj
                </Nav.Link>
                )}
                {isLoggedIn && <Nav.Link onClick={onProfileClick} style={{marginRight: '20px'}}>
                <FontAwesomeIcon icon={faUser} /> Profil
                </Nav.Link>}
                {/* <Nav.Link onClick={onClear} style={{marginRight: '20px'}}>
                Clear
                </Nav.Link> */}
            </div>
        </Navbar>
    );
};

export default TopNavbar;
