import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  NavLink } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Home = () => {
  const history = useNavigate();
  const token = localStorage.getItem("token");
  if (token == undefined) {localStorage.clear()}

  useEffect(() => {
    if(token){
      const user = jwt_decode(localStorage.getItem("token"));
      if (user){
        history("/user",{replace:true})
      } 
    }
  },[])


  return (
    <>
    <div className="header">
            <NavLink to="/login">Login</NavLink>
            <NavLink  to="/signup">Sign Up</NavLink>
            <NavLink to="/changePass" >Change Password</NavLink>
          </div>
    <h1>Please Log-in or Sign-up</h1>
    </>
  )
}


export default Home

