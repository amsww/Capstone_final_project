import React,{useRef, useState, useContext, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";




const ProductList = (props) => {

  const {item,addProduct,handleWishlist, removeWishlist} = props;
  const [svgStatus,setSvgStatus] =  useState(true);
  const svgRef = useRef("");
  const {id,name,image, offerPrice, actualPrice} = item;



    const handleSvgClick  = (id) => {
        if (svgStatus) {
          handleWishlist(item);
          setSvgStatus(false)
        } else {
          removeWishlist(item.id);
          setSvgStatus(true);
        }
      }


    return <>
    <div className='card' >
           <div  className="card__heart" >
           {props.fn() == "black"? 
           <svg xmlns="http://www.w3.org/2000/svg" 
            ref={svgRef} 
            onClick={()=> handleSvgClick(item)}
            style={{fill:"gray"}}
           width="24" height="24" viewBox="0 0 24 24"><path d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z"/></svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" 
             ref={svgRef} 
             onClick={()=> handleSvgClick(item)}
             style={{fill:"red"}}
            width="24" height="24" 
            viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/>
            </svg>}
          </div>
          <div className="card__image">
              <img src={image}  alt="" />
         </div>
         <div className="productDet">
         <div className="card__details">
             <p  className="title">adidas</p>
             <p className="spaceRequired">{name}</p>
             <span className="span1">₹{offerPrice}</span>
             <span className="span2">₹{actualPrice}</span>
             <br/>
             <span className="span3">56% off</span>
           </div>
           <div className="card__size">
             <p >size <span>6,7,8,9</span></p>
             <button className='buttonBuy' onClick={()=> addProduct(item)}>Buy</button>
           </div>
         </div>
     </div>
   </>
}

export default ProductList