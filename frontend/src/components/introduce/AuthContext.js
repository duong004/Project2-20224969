import React, { createContext, useState } from "react";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = Cookies.get("user");
        return storedUser ? JSON.parse(decodeURIComponent(storedUser)) : null;
    });

    const login = (userData, token) => {
        // Lưu thông tin người dùng và token
        setUser(userData);
        Cookies.set("user", JSON.stringify(userData), { expires: 7 });
        Cookies.set("token", token, { expires: 7 });
    };

    const logout = () => {
        setUser(null);
        Cookies.remove("user");
        Cookies.remove("token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};