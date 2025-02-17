import { createContext, useCallback, useState } from "react";

const inicialValue = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(inicialValue);

  const login = (email, password) => {};
  const register = (name, email, password) => {};
  const verifyToken = useCallback(() => {}, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        register,
        verifyToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
