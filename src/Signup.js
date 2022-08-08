import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  NavLink } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import validator from 'validator'
 
function Signup(props) {

  const statusObj = {
                      email:false,
                      name:false,
                      password:false,
                      confirm :false
                    }


  const [email , setEmail] = useState('');
  const [emailError,setEmailError] = useState('');
  const [inputStatus,setInputStatus] = useState(statusObj);
  const [password , setPassword] = useState('');
  const [errorPass,setErrorPass] = useState("");
  const [name , setName] = useState('');
  const [confirmpass , setConfirmpass] = useState('');
  const [inputDis , setInputDis] = useState(false);
  const history = useNavigate();


  useEffect(()=>{
    if(password === confirmpass && password !=="") setInputDis(true)
  },[confirmpass])

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == undefined) {localStorage.clear()}
    if(token ){
      const user = jwt_decode(localStorage.getItem("token"));
      if (user){
        history("/user",{replace:true})
      } 
    }
  },[]);

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

  const validateName = (e) =>{
    setName(e.target.value);
    setInputStatus({...inputStatus,name:true})
  }
 
  const handleSignup = (event) => {
    const headers= {'Content-Type': 'application/json'};
    const method= "POST";
    const body = JSON.stringify({email, password,name})

    fetch('/register',{method,headers,body})
    .then(res => res.json())
    .then(res => {
      if (res.token && res.token !== undefined){
        localStorage.setItem("token",  res.token);
        history("/user");
      } else {
        throw Error(res.message)
      }
    })
    .catch(error => {
      alert(error);
    });

  }

  const validateConfirm = e => {
    setConfirmpass(e.target.value);
    setInputStatus({...inputStatus,confirm:true})
  }


 
  return (
    <>
      <div>
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
        </div>
        <div className='bodyDiv'>
        <div className="App_1" >
      <div className='emailDiv'>
       <p className='pTag'> Email</p>
      </div>
        <input 
         className={inputStatus.email ? emailError == "" ? "inputGreen":"inputRed" :"inputDiv1"}
        type="email" name='email' onChange={(e) => validateEmail(e)} required />
       {emailError !== '' && <p className='emailValidation'>{emailError}</p>} 
      <div >
      <p className='pTag'> Name</p>
      </div>
        <input 
         className={inputStatus.name ? name.length > 2 ? "inputGreen":"inputRed" :"inputDiv1"}
         type="text" name='name'
          onChange={(e) => validateName(e)} required />
      <div >
       <p className='pTag'> Password</p>
      </div>
        <input 
        type="password" 
        name='password' 
        className={inputStatus.password ? errorPass == "" ? "inputGreen":"inputRed" :"inputDiv1"}
        onChange={(e) => validatePassword(e)} required />
        {errorPass !== "" && <p className='emailValidation'>{errorPass}</p>}
      <div>
        <p className='pTag'>Confirm Password</p>
      </div>
        <input 
         className={inputStatus.confirm ? !inputDis == "" ? "inputGreen":"inputRed" :"inputDiv1"}
        type="password" name='confirmpass' onChange={(e) => validateConfirm(e)}/>
      <div >
      <button className='buttonBuy_1' 
      disabled={!(errorPass == "" && errorPass =="" && inputDis && name.length>2 )}  onClick={handleSignup} >Create new Account </button>
      </div>
      </div>
      </div>
    </>
  );
}
 
export default Signup;