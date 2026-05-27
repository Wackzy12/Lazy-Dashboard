import React, { useState } from 'react';
import { supabase } from '../services/supabase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const { error } = 
        await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) {
            console.error('Error logging in:', error);
        }else {
            console.log('Login successful!');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md rounded-2xl bg-slate-800 p-8">
                <h1 className="mb-6 text-3xl font-bold">
                    Login
                </h1>

                <form className="space-y-4" onSubmit={handleLogin}>
                    <input
                        type="email"    
                        placeholder="Email"
                        className="w-full rounded-lg p-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full rounded-lg p-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="w-full rounded-lg bg-blue-500 p-3">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )

}