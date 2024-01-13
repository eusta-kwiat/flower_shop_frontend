"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from '../components/LoginForm/LoginForm';
import { login } from '../services/api';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
    const router = useRouter();
    const onLogin = async (email, password) => {
        try {
            const response = await login(email, password);
            console.log('login successful', response);
            window.location.reload();
        } catch (error) {
            alert('Nieudane logowanie');
        }
    }

    useEffect(() => {
        const isLoggedInLocalStorage = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedInLocalStorage) {
            router.push('/');
        }
    })

    const onRegister = () => {
        const access = localStorage.getItem('access');
        console.log('onRegister', access);
    }

    return (
        <LoginForm onLogin={onLogin} onRegister={onRegister} />
    )
}
