
import './App.css'
import { Routes, Route } from 'react-router-dom' 
import Signup from './components/Signup.jsx'  
import Login from './components/Login.jsx'
function App() {

 return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );

}

export default App;
