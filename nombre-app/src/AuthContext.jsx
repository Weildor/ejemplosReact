import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [userRole, setUserRole] = useState(localStorage.getItem('rol') || null);
    
    // Inicialización segura para evitar el error de JSON "undefined"
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user');
        if (!stored || stored === "undefined") return null;
        try {
            return JSON.parse(stored);
        } catch {
            return null;
        }
    });

    const login = (token, rol, userData) => {
        if (!userData || !userData.id) {
            console.error("Error: El backend no envió el ID del usuario");
        }
        localStorage.setItem('token', token);
        localStorage.setItem('rol', rol);
        localStorage.setItem('user', JSON.stringify(userData));
        
        setIsLoggedIn(true);
        setUserRole(rol);
        setUser(userData); 
    };

    const logout = () => {
        localStorage.clear(); // Limpia todo de golpe
        setIsLoggedIn(false);
        setUserRole(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userRole, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);