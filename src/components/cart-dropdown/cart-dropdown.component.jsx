import React from 'react'
import './cart-dropdown.style.scss'
import CustomButton from '../botton/botton.component'
import {connect} from 'react-redux';
import CartItem from '../cart-items/cart-item.component';
import {selectCartItems} from '../../redux/cart/cart.selector';
import { withRouter } from 'react-router';
import {CartdropDownAction} from '../../redux/cart/action';



const CartDropDown=({cartItems,history,dispatch})=>{

    return(
        <div className='cart-dropdown'>
        <div className='cart-items'>

           {

               cartItems.length ?
               cartItems.map(item=>{
                return(
                    <CartItem key={item.key}
                    item={item}></CartItem>
                )
               }) :
                <span className='cart-empty-msg'>Cart Has No Item</span>
           }

        </div>

        <CustomButton onClick={()=>{
            history.push('/checkout');
            dispatch(CartdropDownAction());

        }}>CheckOut</CustomButton>
    </div>
    )

}

const mapStateToProps=state=>{

   // console.log('Cart Called');

    return{
        cartItems: selectCartItems(state)
        
    }
    
}

// const mapStateToProps=({cart:{cartItems}})=>{

//     console.log('Cart Called');

//     return{
//         cartItems: cartItems
//     }
    
// }



export default withRouter(connect(mapStateToProps)(CartDropDown));