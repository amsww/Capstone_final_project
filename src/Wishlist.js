import React,{useContext,useEffect} from 'react';
import { WishItems } from './User';
import jwt_decode from 'jwt-decode';
import "./ProductCard.css";
import WishItem from './WishItem';

const Wishlist = ({handleRemoveWish,handleCartWish,updateQty}) => {

  const wishlst = useContext(WishItems);

  
    return(
      <div className='cartDiv'>
  {wishlst.length == 0 ?
   <h1>Your Wishlist is empty</h1>:
  <div>
   <h1>Your Wishlist</h1>
 <table >
  <tbody >
      <tr className='firstRow'>
        <th>Item</th>
        <th>Description</th>
        <th>Unit Price</th>
      </tr>
        {wishlst?.map(item => (
          <WishItem
          key={item.id}
          item = {item}
          handleCartWish={handleCartWish}
          handleRemoveWish={handleRemoveWish}
          updateQty={updateQty} />
    ))}
    </tbody>
      </table>
    </div>}
    </div>
    )
}

export default Wishlist;
