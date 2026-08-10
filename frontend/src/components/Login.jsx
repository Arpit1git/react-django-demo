import { useState } from 'react'
import {useNavigate} from "react-router-dom"
import {useAuth} from '../context/AuthContext.jsx'

const Login = () => {

  const navigate = useNavigate();
   const {login} = useAuth();

  const [formData, setformData] = useState({
      username:"",
      password:"",
  });

  const [error, seterror] = useState("");
   
  const handleSubmit = async (e)=>{
        
     e.preventDefault();
     seterror("");

     

     try {

      const res = await fetch(`${import.meta.env.VITE_API_URL}/login/`,{
         method:"post",
         headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(formData)
      })

      const data  = await res.json();

     if (res.ok) {
      login(data.user||"proxy", data.token);
      navigate("/home");
     } else {
    setError(data.error || "Login failed");
     }
      
      
     } catch (error) {
        console.error("internal Error from login.jsx",error);
         seterror('Something went wrong. Please try again.');
     }

  }

  const handleformChange = (e)=>{
       setformData({
        ...formData,
         [e.target.name]:e.target.value
       })
  }
  

  return (
    <div>
      <h2>Login Page</h2>

      <form onSubmit={handleSubmit}>
        
        <input 
        name = "username"
        placeholder='Enter Your Name'
        value ={formData.username}
        onChange={handleformChange}
        type="text" 
        required
        />
        <br />
    

        <input 
        name = "password"
        placeholder='Enter Your Password'
        value ={formData.password}
        onChange={handleformChange}
        type="password" 
        required
        />

        <br />
        
        <button type='submit'>Login</button>
        <br />
       
        {error && <p>{error}</p>}

      </form>

    </div>
  );
}

export default Login