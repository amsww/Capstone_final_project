import { useState ,useRef, useEffect, useContext} from 'react';
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { Data } from './Data';
import ProductList from './ProductList';
import { WishItems } from './User';



const ProductCard = ({addProduct,user,handleWishlist,removeWishlist,searchData}) => {
  const wishList = useContext(WishItems);

  
  const array = [];
  wishList.forEach(element => array.push(element.id));

  const productArray = ["shoe" , "short" ,"skirt" , "pant" , "shirt" , "sandal"]


  const finalData = () => {
  if (productArray.includes(searchData)) return Data.filter(item => item.name == searchData); 
  else return Data;
                        }



  
  return (
  <>
    <h3 className='hThree'>Welcome {user}</h3>
    <div className='App'>
   {finalData().map(item => <ProductList 
              key={item.id}
              fn = {() => array.includes(item.id) ? "red":"black" }
              item ={item}
              addProduct={addProduct}
              handleWishlist={handleWishlist}
              removeWishlist={ removeWishlist}
              /> ) }
    </div>
    </>
  )
}

export default ProductCard