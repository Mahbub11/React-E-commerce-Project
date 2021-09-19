import React from 'react';
import './cart.style.scss';
import { ReactComponent as CartLogo} from '../../assets/cart_icon/shopping-bag.svg';
import {connect} from 'react-redux';
import {CartdropDownAction} from '../../redux/cart/action'
import {selectCartItemsCount} from '../../redux/cart/cart.selector';


const CartIcon = ({toggleCartHidden,itemsCount}) => {

   

    return(
        <div className='cart-icon'onClick={toggleCartHidden } >
            <CartLogo className='shopping-icon'></CartLogo>
            <span className='item-count'> {itemsCount}</span>

        </div>
    )
        
    
}
const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(CartdropDownAction())
  });

  
const mapStateToProps=state=>{

    // console.log('Icon Called')
   return{
    itemsCount:  selectCartItemsCount(state)
   }

}


export default connect(mapStateToProps,mapDispatchToProps)(CartIcon);