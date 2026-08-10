

/* this file help to mange data gllobally accross app */

import {useContext,createContext,useState, Children} from "react"
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const getStoredUser = () => {
    try {
        const item = localStorage.getItem('user');
        return item ? JSON.parse(item) : null;
    } catch (error) {
        return null;
    }
};

export const AuthProvider = ({children})=>{
      
    const [user, setuser] = useState(getStoredUser());
    const [msg, setmsg] = useState(null);
    const [token, setToken] = useState(
    localStorage.getItem('token') || null
  );
    const login = (userData,authtoken)=> {
    setuser(userData);
    setToken(authtoken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authtoken);
  };

    const navigate = useNavigate();



 const logout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/logout/`, {
        method: "POST",
        headers: {
          "Authorization": `Token ${token}`,   // needed since LogoutView requires IsAuthenticated
        },
      });

      if (res.ok) {
        setmsg("user logout successfully");
         navigate("/");
      } else {
        setmsg("Internal server issue");
      }
    } catch (error) {
      console.error("ERROR WHILE LOGOUT:", error);
    } finally {
      setuser(null);
      setToken(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  };

    return (
    <AuthContext.Provider value={{ user, token, msg, logout, login, isAuthenticated: !!token }}>
             {children}
    </AuthContext.Provider>
    )
};

export const useAuth = ()=> useContext(AuthContext);