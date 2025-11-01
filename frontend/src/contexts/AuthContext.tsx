import axios from "axios";
import { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (employeeId: string, password: string) => Promise<boolean>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     localStorage.getItem("isAuthenticated") === "true"
//   );
    const [token,setToken]=useState<string|null>(localStorage.getItem('token'));
    const [isAuthenticated,setIsAuthenticated]=useState<boolean>(!!token);
    const [user,setUser]=useState<any|null>(()=>{
        const storedUser=localStorage.getItem('user');
        if(storedUser){
            try{
                return JSON.parse(storedUser);
            }catch{
                return null;
            }
        }
        return null;
    });
    useEffect(()=>{
        setIsAuthenticated(!!token);
    },[token])
  const login = async (employeeId: string, password: string) => {
    try{
        const response=await axios.post('http://localhost:8003/api/login',{employeeId,password});
        const data=response.data;
        if(data.success){
            localStorage.setItem('token',data.token);
            localStorage.setItem('user',JSON.stringify({
                employeeId:data.employeeId,
                userId:data.userId,
            }));
            setToken(data.token);
            setUser({
                employeeId:data.employeeId,
                userId:data.userId,
            });
            return true;
        }
        else
        {return false}

    }
    catch(err){
        console.error("login error",err);
        return false;
    }
    // if (employeeId === "admin@example.com" && password === "password") {
    //   localStorage.setItem("isAuthenticated", "true");
    //   setIsAuthenticated(true);
    //   return true;
    // }
    // return false;
  };

  const logout = async() => {
    try {
        await axios.post('http://localhost:8003/api/logout');
      } catch (error) {
        console.error("Logout error:", error);
      }
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth ust be used within an AuthProvider");
  }
  return context;
};
