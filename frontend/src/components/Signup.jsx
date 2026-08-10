import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../context/AuthContext.jsx'

const Signup = () => {
    const navigate = useNavigate();

    const {login} = useAuth();


    const [formData, setFormData] = useState(
    {  username: '',
       email: '',
       password: ''
    }
)


const [error, setError] = useState("");



const handleSubmit = async  (e)=>{


     e.preventDefault();
     setError('');
   

     try{
    
    const req = await fetch(`${import.meta.env.VITE_API_URL}/signup/`,{
       method: 'POST',
      //  credentials: 'include', 
       headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })

    const data = await req.json()

   if (!req.ok) {
        setError(data.error || "Signup failed");
        return;
      }

    console.log(data);
    login(data.user['username'],data.token)
    navigate('/home')

}catch(error){  
     console.error("Network error:", error);
      setError('Something went wrong. Please try again.');
}

}

const handleformChange = (e) => {
     setFormData({
        ...formData,
        [e.target.name]: e.target.value
     })
}

  return (
   <>

     <form
      onSubmit={handleSubmit}
     >

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
        name = "email"
        placeholder='Enter Your Email'
        value ={formData.email}
        onChange={handleformChange}
        type="email" 
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
        
        <button type='submit'>Signup</button>
        <br />
        {error && <p>{error}</p>}

     </form>
    
   </>
  )
}

export default Signup