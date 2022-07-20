import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css'
import jwt_decode from 'jwt-decode';
import validator from 'validator'
 
function Login(props) {
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [errorPass,setErrorPass] = useState("");
  const [inputStatus,setInputStatus] = useState({email:false,password:false});
  const [emailError,setEmailError] = useState('');
  const history = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("token")){
      const user = jwt_decode(localStorage.getItem("token"));
      if (user){
        history("/user",{replace:true})
      }
    }
  },[])



  const handleLogin = (event) => {

    const headers= {'Content-Type': 'application/json'};
    const method= "POST";
    const body = JSON.stringify({email, password})


    fetch('/login',{method,headers,body})
    .then(res => res.json())
    .then(res => {
      if (res.token && res.token !== undefined){
        localStorage.setItem("token",  res.token)
      } else {
        throw Error(res.message)
      }
      if (res.token) history("/user",{replace:true});
    })
    .catch(error => {
      alert(error)
    });

  };

  const validateEmail = (e) => {
    setInputStatus({...inputStatus,email:true})
    setEmail(e.target.value)
  
    if (validator.isEmail(email)) {
      setEmailError('')
    } else {
      setEmailError('Enter valid Email!')
    }
  }


  const validatePassword = (e) => {

    setPassword(e.target.value);
    setInputStatus({...inputStatus,password:true})
 
    if (validator.isStrongPassword(password, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      setErrorPass("")
    } else {
      setErrorPass('Is Not Strong Password')
    }
  }



  return (
    <>
          <div className="header">
            <NavLink 
              className={({ isActive }) => (isActive ? 'active' : 'inactive')}
              to="/">Login</NavLink>
            <NavLink  
              className={({ isActive }) => (isActive ? 'active' : 'inactive')}
              to="/signup">Sign Up</NavLink>
            <NavLink 
              className={({ isActive }) => (isActive ? 'active' : 'inactive')}
              to="/changePass" >Change Password</NavLink>
          </div>
  <div className='bodyDiv'>
  <div className="App_1" >
      <div className='emailDiv'>
      <p className='pTag'> Email</p>
      </div>
      <div >
        <input 
        type="text" name='email' 
        className={inputStatus.email ? emailError == "" ? "inputGreen":"inputRed" :"inputDiv1"}
        onChange={e =>validateEmail(e)} />
         {emailError !== '' && <p className='emailValidation'>{emailError}</p>} 
      </div>
       <div>
       <p className='pTag'> Password</p>
       </div>
      <div >
        <input className='inputDiv1'
        className={inputStatus.password ? errorPass == "" ? "inputGreen":"inputRed" :"inputDiv1"}
        type="password" name='password' 
        onChange={e => validatePassword(e)} />
         {errorPass !== "" && <p className='emailValidation'>{errorPass}</p>}
      </div>
      <div >
      <input disabled={!(emailError =="" && errorPass == "" && inputStatus)} className='buttonBuy_1' onClick={handleLogin} type={"submit"} value={"Login"}/><br />
      </div>
  </div>
  </div>
    </>
  );
}

 
export default Login;