import React,{useState,useEffect, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { products } from './ProductData';
import { cartItems } from './User';
import './ProductCard.css';
import CartItems from './CartItems';


const Cart = ({removeItem,updateQty}) => {
    const history = useNavigate();
    const cart = useContext(cartItems);


    

  return (
    <div className='cartDiv'>
      <div>
  {cart.length == 0 ?
   <h1>Your Cart is empty</h1>:
  <div>
   <h1>Your Cart</h1>
 <table >
  <tbody >
      <tr className='firstRow'>
        <th>Item</th>
        <th>Description</th>
        <th>Quantity</th>
        <th>Total Cost</th>
      </tr>
  { cart.map(item => 
          <CartItems 
            key ={item.id}
            item = {item}
            removeItem={removeItem}
            updateQty={updateQty}
          />
  )}
  </tbody>
      </table>
      <div className='totalCostTr'>
    <div className='totalTd'><p className='grantTotalP'> Total Price : Rs. {cart.reduce((a,c)=>a+c?.qty*c?.offerPrice*1,0 )}</p></div>
  </div>
      </div>
}
</div>
    </div>
  )
}

export default Cart;

