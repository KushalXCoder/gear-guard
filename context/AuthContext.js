'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const checkUserLoggedIn = async () => {
        try {
            const res = await fetch('/api/me');
            const data = await res.json();

            if (res.ok && data.status === 'success') {
                setUser(data.data);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error(error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok && data.status === 'success') {
                setUser(data.user);
                router.push('/dashboard');
                return { success: true };
            } else {
                return { success: false, error: data.message };
            }

        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Something went wrong' };
        }
    };

    const signup = async (userData) => {
        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await res.json();

            if (res.ok && data.status === 'success') {
                // Determine if we should auto-login or redirect to login
                return { success: true };
            } else {
                return { success: false, error: data.message };
            }

        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, error: 'Something went wrong' };
        }
    }

    const logout = async () => {
        try {
            await fetch('/api/logout', { method: 'POST' });
            setUser(null);
            router.push('/auth');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
