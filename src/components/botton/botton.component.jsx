import React from 'react';
import './botton.style.scss';


const CustomButton=({children,isGoogleSignIn,type,...buttonProps})=>{



   
    return(

      <button onClick={isGoogleSignIn} className={`${type} custom-button`}
      {...buttonProps} >
      {children}
     </button>
        
    )
}

export default CustomButton;