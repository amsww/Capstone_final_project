import React,{useEffect, useRef, useState} from 'react';
import './ProductCard.css';

const WishItem = ({item,handleCartWish,handleRemoveWish,updateQty}) => {


  return (
    <tr className='cartItem'>
    <td ><img style={{width:"200px"}} src={item.image} /></td>
<td ><p>{item.name}</p></td>
<td><p>{"Rs "+item?.qty*item?.offerPrice}</p></td>
    <td><button className='buttonBuy twobtn'
    onClick={() => handleCartWish(item.id)}
    >Add to cart</button></td>
<td><button 
        className='buttonBuy one' 
        onClick={() => handleRemoveWish(item.id)}
                     >
              Remove
          </button></td>
  </tr>
  )
}

export default WishItem
