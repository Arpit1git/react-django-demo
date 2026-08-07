import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const Signup = () => {
    const navigate = useNavigate()

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
    
    const req = await fetch("http://127.0.0.1:8000/api/login/",{
       method: 'POST',
       headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })

    const data = await req.json()

   if (!req.status) {
        setError(data.error || "Signup failed");
        return;
      }

    console.log(data);
    navigate('/login')

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