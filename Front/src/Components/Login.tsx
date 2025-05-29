import { useRef, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

export default function Login() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('Login must be used within an AuthProvider');

    const { handleLogin, isLoading: loginLoading, isError: loginError } = context;

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const email = emailRef.current?.value ?? '';
            const password = passwordRef.current?.value ?? '';
            if (!email || !password) return;

            await handleLogin(email, password);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-sm mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow"
        >
            <input
                ref={emailRef}
                placeholder="Correo"
                className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                type="password"
                ref={passwordRef}
                placeholder="Contraseña"
                className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            >
                {loginLoading ? 'Ingresando…' : 'Ingresar'}
            </button>

            {loginError && (
                <p className="mt-2 text-sm text-red-600">Credenciales incorrectas</p>
            )}
        </form>
    );
}
