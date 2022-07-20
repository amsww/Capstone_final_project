import React,{useState,useRef,useEffect} from 'react';
import './Header.css';
import {  NavLink } from 'react-router-dom';


function Header ({hangleLogOut,upadteData})  {

    const [searchs, setSearchs] = useState("");




    return (
        <div className='header' >
            <div className='header_one' >
                <div className='header_one_down' >
                    <NavLink className={'nav_header'}
                     to={"/user"}>
                    <span className='buyDiv'>Buy </span>
                    <span className='moreDiv' >More</span>
                    </NavLink>
                </div>
            </div>
            <div className='header_two'>
                <input onChange={e=> setSearchs(e.target.value)} type={"text"} placeholder='Search for products brands'/>
                <button className='button_input' onClick={()=> upadteData(searchs)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"/></svg>
                  </button>
            </div>
            <div className='groupedDiv'>
            <div className='header_five' >
            <NavLink  to="/user/cart" className="inactive" 
             className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
            <svg className='cartSvg' 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" height="24" viewBox="0 0 24 24"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/></svg>
                <p>Cart</p>
                </NavLink>
            </div>
            <div className='header_five'>
            <NavLink to="/user/wishlist" 
            className={({ isActive }) => (isActive ? 'active' : 'inactive')} >
            <svg className='cartSvg_1'  xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/></svg>
                <p className='pWish'>Wishlist</p>
                </NavLink>
            </div>
            <div className='whythis header_three'  >
              <button  className='loginButton' onClick={()=>hangleLogOut()}>Log Out</button>
            </div>
        </div>
            </div>
    )
}


export default Header
