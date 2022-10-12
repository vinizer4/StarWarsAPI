import React, { createContext, useContext } from "react";

interface Props {
  children: React.ReactNode;
}

interface AuthContextData {
  signed: boolean;
  login(user: string, password: string): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [signed, setSigned] = React.useState(false);

  function login(user: string, password: string) {
    setSigned(user === "admin" && password === "password");
  }

  return (
    <AuthContext.Provider value={{ signed, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
