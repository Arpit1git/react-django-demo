import React from 'react'
import { useAuth } from '../context/AuthContext'


const Home = () => {
    const {logout} = useAuth();
  
   const  handleLogout = ()=>{
         logout();
    }

  return (
    <div>
        <button 
        onClick={handleLogout}
        type='submit'>
         Logout....
        </button>
    </div>
  )
}

export default Home