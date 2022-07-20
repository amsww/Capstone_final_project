import React,{useEffect, useState} from 'react';
import {NavLink } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import validator from 'validator'

const ChangePass = () => {


    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [errorPass,setErrorPass] = useState("");
    const [errorPassNew,setErrorPassNew] = useState("");
    const [errorPassConf,setErrorPassConf] = useState("");
    const [confirmpass , setConfirmpass] = useState('');
    const [confirmpassTwo , setConfirmpassTwo] = useState('');
    const [inputDis , setInputDis] = useState("");
    const [inputStatus,setInputStatus] = useState({email:false,password:false,new:false,confirm:false});
    const [buttonValue, setButtonValue] = useState(false);
    const [emailError,setEmailError] = useState('');
    const history = useNavigate();

    useEffect(()=>{
        if (confirmpassTwo == confirmpass && confirmpass!=="") setButtonValue(true)
    },[confirmpassTwo , confirmpass]);


    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token == undefined) {localStorage.clear()}
      if(token ){
        const user = jwt_decode(localStorage.getItem("token"));
        if (user){
          history("/user",{replace:true})
        } 
      }
    },[])

    const changePassword = () => {
    const headers= {'Content-Type': 'application/json'};
    const method= "POST";
    const body = JSON.stringify({email, password,confirmpass})

    fetch('/changePassword',{method,headers,body})
    .then(res => res.json())
    .then(res => {
      console.log(res)
        alert(res.message)
    })
    .catch(error => {
      console.log(error)
      alert(error);
    });
    }

    const getEmail= () => {
        const headers= {'Content-Type': 'application/json'};
        const method= "POST";
        const body = JSON.stringify({email})
    
        fetch('/emailCh',{method,headers,body})
        .then(res => res.json())
        .then(res => {
            if (res.message == true) setInputDis("true")
            if (res.message == false) setInputDis("false")
            if (res.message == undefined) alert("Email is required")
        })
        .catch(error => {
          alert(error);
        });
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


    const validateEmail = (e) => {
      setInputStatus({...inputStatus,email:true})
      setEmail(e.target.value)
        
      if (validator.isEmail(email)) {
            setEmailError('')
      } else {
            setEmailError('Enter valid Email!')
          }
        }

        const validateNew = e => {
          setConfirmpass(e.target.value);
          setInputStatus({...inputStatus,new:true})

          if (validator.isStrongPassword(confirmpass, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
          })) {
            setErrorPassNew("")
          } else {
            setErrorPassNew('Is Not Strong Password')
          }
        }

  const validateConfirmPass = e => {
          setConfirmpassTwo(e.target.value)
          setInputStatus({...inputStatus,confirm:true})

      if (validator.isStrongPassword(confirmpassTwo, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
          })) {
            setErrorPassConf("")
    } else {
            setErrorPassConf('Is Not Strong Password')
          }
        }


  return (
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
          <div className='bodyDiv'>
              <div className="App_Change" >
                <div className='emailDiv'>
                <p className='pTag'> Email</p>
                </div>
                  <input className='inputDiv1'
                  autoComplete='off'
                  className={inputStatus.email ? emailError == "" ? "inputGreen":"inputRed" :"inputDiv1"} 
                  type="email" 
                  name='email' required
                 onChange={e => validateEmail(e)} />
                 {inputDis !== "true" && <button className='buttonBuy_two'
                 disabled={!(emailError =="")}
                 onClick={()=> getEmail()}
                 >Go</button>}
    {
        inputDis == "true"  &&     <div>
        <div className='emailDiv'>
       <p className='pTag'>Old Password</p>
       </div>
        <input type="password" 
        className={inputStatus.password ? errorPass == "" ? "inputGreen":"inputRed" :"inputDiv1"}
        name='password' required
        onChange={e => validatePassword(e)} />
      <div >
      {errorPass !== "" && <p className='emailValidation'>{errorPass}</p>}
       <p className='pTag'>New Password</p>
       </div>
        <input  
        className={inputStatus.new ? errorPassNew == "" ? "inputGreen":"inputRed" :"inputDiv1"}
        type="password" name='password' required 
        onChange={e => validateNew(e)} />
      {errorPassNew !== "" && <p className='emailValidation'>{errorPassNew}</p>}
      <div >
        <p className='pTag'>Confirm Password </p>
        </div>
        <input 
        className={inputStatus.confirm ? confirmpass == confirmpassTwo && errorPassConf ==""  ? "inputGreen":"inputRed" :"inputDiv1"}
        type="password" name='confirmpass'
        onChange={e => validateConfirmPass(e)}/>
        {confirmpass !== confirmpassTwo  && errorPassConf =="" && <p className='emailValidation'>Password is not same</p>}
      <div >
      <button
            disabled={!(emailError =="" && errorPass =="" && errorPassNew =="" && buttonValue)}
            className='buttonBuy_two'
            onClick={()=> changePassword()} >Change Password </button>
      </div>
        </div>
}
 {inputDis == "false" &&       <div>
           <h3> User Not Found, enter the correct email</h3>
        </div>
    }
                      </div>
          </div>
    </div>
  )
}

export default ChangePass
