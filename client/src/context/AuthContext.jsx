import { createContext, useEffect, useState } from "react";

import api from "@/api/axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const { data } = await api.get("/auth/me");

      setUser(data);

    } catch (error) {
      console.log(error);

      localStorage.removeItem("token");

    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  const fetchUser = async () => {
    await getCurrentUser();
  };

  fetchUser();

}, []);

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,

        loading,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;