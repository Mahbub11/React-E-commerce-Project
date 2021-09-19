import React from 'react'
import './checkout.style.scss'
import { removeCartItem,AddToCart,removequantity } from '../../redux/cart/action'
import { connect } from 'react-redux'


const CheckOutItem = ({ items, dispatch }) => {

  const { name, imageUrl, quantity, price, id } = items;
  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img src={imageUrl}></img>
      </div>

      <span className='name'>{name}</span>

      <span className='quantity'>

        <span className='arrow'
        onClick={()=>
        dispatch(removequantity(items))}> &#10094; </span>
        
        <span className='value'> {quantity}</span>
        <span className='arrow'
        onClick={()=>
        dispatch(AddToCart(items))}> &#10095; </span>

      </span>

      <span className='price'>{price}</span>
      <span className='remove-button'
        onClick={() =>
          dispatch(removeCartItem(items))}> &#10005; </span>

    </div>
  )

}



export default connect()(CheckOutItem);