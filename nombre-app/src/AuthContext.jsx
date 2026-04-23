import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    // 👇 Añadimos el estado para el rol del usuario
    const [userRole, setUserRole] = useState(localStorage.getItem('rol') || null);

    // 👇 Actualizamos la función login para recibir también el rol
    const login = (token, rol) => {
        localStorage.setItem('token', token);
        localStorage.setItem('rol', rol); // Guardamos el rol en localStorage
        setIsLoggedIn(true);
        setUserRole(rol);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rol'); // Limpiamos el rol al salir
        setIsLoggedIn(false);
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider")
    }
    return context;
};