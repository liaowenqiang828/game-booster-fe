import { ReactNode, createContext, useState } from "react";

export interface AuthContextType {
  user: string;
  login: (user: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string>(
    () => window.localStorage.getItem("userName") || ""
  );

  const login = (user: string) => {
    setUser(user);
  };
  const logout = () => {
    setUser("");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
