

/* this file help to mange data gllobally accross app */

import {useContext,createContext,useState, Children} from "react"
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
      
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('user')) || null);
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
      const res = await fetch("http://127.0.0.1:8000/api/logout/", {
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