import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './login';
import Signup from './Signup';
import Home from './home';
import User from './User';
import ChangePass from './ChangePass';



function App() {
  return <div className='mainDiv'>
          <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/user/*" element={<User/>}/>
              <Route path="/changePass" element={<ChangePass/>} />
          </Routes>
        </BrowserRouter>
  </div>
}
 
export default App;