import React,{useEffect,useState,useRef,useReducer } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import ProductCard from './ProductCard';
import './ProductCard.css';
import Cart from './Cart';
import Header from './Header';
import { createContext } from 'react';
import Wishlist from './Wishlist';
import { Data } from './Data';



export const cartItems = createContext();
export const WishItems = createContext();


const User = () => {

  
  const [user,setUser] = useState("");
  const [cart,setCart] = useState([]);
  const [wishlst, setWishlst] = useState([]);
  const [searchData,setSearchData] = useState("");
  const history = useNavigate();
  
  


  useEffect(() => {
    updateCart();
    const token = localStorage.getItem("token");
    if (token == undefined) {localStorage.clear()}
    if(token ){
      const user = jwt_decode(localStorage.getItem("token"));
      if (!user){
        history("/",{replace:true})
      } 
    }
  },[]);



  const handleWishlist = (item) => {
    const exist = wishlst?.find(prod => prod.id == item.id)
     if (!exist){
      setWishlst([...wishlst,item])
      addWishlist(item);
     }
  }


  const handleRemoveWish = (id) => {
    setWishlst(wishlst.filter(item => item.id !== id));
    apiRemoveWishlist(id)
  }


  // const removeWishlist = (item) => {
  //   console.log("three")
  //   setWishlst(wishlst.filter(prod => prod.id !== item.id))
  //   apiRemoveWishlist(item.id)
  // }

  const addWishlist =(item) =>  {
    const headers= {
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem("token")
    };

    const method= "POST";
    const body = JSON.stringify({item})


    fetch('/addWishlist',{method,headers,body})
    .then(res => res.json())
    .then(res => {
      setWishlst(res.wishlist)
    })
    .catch(error => {
      history("/",{replace:true});
    });
  }




  const apiRemoveWishlist = (id) => {
    const headers= {
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem("token")
    };

    const method= "POST";
    const body = JSON.stringify({id})


    fetch('/remWishlist',{method,headers,body})
    .then(res => res.json())
    .then(res => {
      setWishlst(res.wishlist)
    })
    .catch(error => {
      history("/",{replace:true});
      console.log(error)
    });
  }





const updateCart = ()=> {
  const token = localStorage.getItem("token");
  if (token){
    const user = jwt_decode(token);

    const headers= {'authorization': token};
    const method= "GET";

    fetch('/user',{method,headers})
    .then(res => res.json())
    .then(res => {
        setUser(res.user);
        setCart(res.cart);
        setWishlst(res.wishlist);
    })
    .catch(error => {
      localStorage.removeItem("token");;
    });


    if (!user){
      localStorage.removeItem("token");
      history("/",{replace:true})
    }
  } else {
    history("/",{replace:true})
  }
}


  const hangleLogOut = () => {
    localStorage.clear();
    history("/",{replace:true});
  }

  const addProduct =(item) =>  {
    const headers= {
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem("token")
    };

    const method= "POST";
    const body = JSON.stringify({item})


    fetch('/addUser',{method,headers,body})
    .then(res => res.json())
    .then(res => {
      setCart(res.cart);
    })
    .catch(error => {
      history("/",{replace:true});
      console.log(error)
    });
  }

  const removeItem = (id) => {
    const headers= {
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem("token")
    };

    const method= "POST";
    const body = JSON.stringify({id})


    fetch('/removeUser',{method,headers,body})
    .then(res => res.json())
    .then(res => {
      setCart(res.cart)
    })
    .catch(error => {
      history("/",{replace:true});
      console.log(error)
    });
  }


  const updateQty= (id,qty) =>{
    const headers= {
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem("token")
    };

    const method= "POST";
    const body = JSON.stringify({id,qty})


    fetch('/updQty',{method,headers,body})
    .then(res => res.json())
    .then(res => {
      setCart(res.cart);
    })
    .catch(error => {
      history("/",{replace:true});
      console.log(error)
    });
  }
 


  const wishToCart= (item) => {
    const headers= {
      'Content-Type': 'application/json',
      'authorization': localStorage.getItem("token")
    };

    const method= "POST";
    const body = JSON.stringify({item})


    fetch('/wishCart',{method,headers,body})
    .then(res => res.json())
    .then(res => {
      setCart(res.cart)
    })
    .catch(error => {
      history("/",{replace:true});
      console.log(error)
    });
  }


  const handleCartWish = (id) => {
    setWishlst(wishlst.filter(prod => prod.id !== id));
    apiRemoveWishlist(id);
    const prod = Data.find(item =>item.id == id)
    wishToCart(prod);
  }

  const upadteData = id => {
      setSearchData(id.toLowerCase().trim()) 
  }



  
  return (<div className='mainApp'>
  <cartItems.Provider value={cart}>
  <WishItems.Provider value={wishlst}>
        <div className='header_main_div'>
          <Header
          hangleLogOut={hangleLogOut}
          upadteData={upadteData}
          /></div>


<div className='routesDiv'>
<Routes>
          <Route  path="/" element={<ProductCard
                     user={user}
                     searchData={searchData}
                     addProduct={addProduct}
                     handleWishlist={handleWishlist}
                     removeWishlist={handleRemoveWish}
          />} />
          <Route path="/cart" element={<Cart
                      removeItem={removeItem}
                      updateQty={updateQty}
                      />} 
          />

          <Route path="/wishlist" element={<Wishlist
                      handleRemoveWish={handleRemoveWish}
                      handleCartWish={handleCartWish}
                      />}
            />
          </Routes>
</div>

          </WishItems.Provider>
       </cartItems.Provider>
       </div>);
}

export default User;