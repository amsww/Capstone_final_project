import React,{useEffect, useRef, useState} from 'react';
import './ProductCard.css';

const CartItems = ({item,removeItem,updateQty}) => {

    const [inputQty,setInputQty] = useState(item.qty);
    const [inputStatus,setInputStatus] = useState(false)
    const [inputStat,setInputStat] = useState(true)
    const inputRef = useRef("");
   
    useEffect (() => {
        if(inputQty == item.qty) setInputStatus(false)
        else setInputStatus(true)
    },[inputQty]);


    const checkFunction = () => {
       updateQty(item.id,inputQty);
       setInputStatus(false)
    }

    const checkValue = () => inputQty === "" & inputStat ?  
    item.qty :inputQty

    const handleInput = (e) => {
        setInputQty(e.target.value);
        setInputStat(false);
        setInputStatus(true)
    }



  return (
    <tr className='cartItem'>
      <td ><img style={{width:"200px"}} src={item.image} /></td>
  <td ><p className='itemName'>{item.name}</p></td>
  <td> 
        <button disabled={inputQty == 0} className='buttonBuy buttonQty' onClick={()=> setInputQty(x => x-1)}>
          <p>-</p></button>
        <input  
                ref={inputRef} 
                value={checkValue()} 
                onChange={(e)=> handleInput(e)}
                min={0}
                type={"number"}
                className='inputCart' 
                placeholder='Quantity'
        />
        <button className='buttonQty buttonBuy' onClick={()=> setInputQty(+inputQty+1)}><p>+</p></button>
         </td>
  <td><p className='costTd'>{"Rs "+item?.qty*item?.offerPrice}</p></td>
 {inputStatus &&  inputQty !== 0 && inputQty !== "" ?
      <td><button 
      className='buttonBuy twobtn' 
      onClick={()=>checkFunction()}>Update Quanity</button></td>
 : <td><button className='buttonBuy_one' 
  onClick={()=>removeItem(item.id)}>Remove</button></td>}
    </tr>
  )
}

export default CartItems