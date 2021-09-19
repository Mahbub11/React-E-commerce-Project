import React,{useEffect} from 'react';
import './collection-overview.style.scss';
import {connect} from 'react-redux';
import Shop_Collection from '../shop_collection/shop_collection.component';
import {selectCollectionsForOverview} from '../../redux/shop_data/shop.selector';



const CollectionOverview=({getShopData})=>{

 
    // componentDidMount componentwillUnmount as UseEffect

    // useEffect(()=>{

    //     console.log('I am in shop Page');

    //     return ()=>{

    //         console.log('I am Leaving Shop Page');
    //     }

    // },[]);


   // console.log(getShopData)
    return (

        <div >
           {getShopData.map(({id,... otherSectionProps})=>{
                return(
                    <Shop_Collection key={id} 
                    {... otherSectionProps}></Shop_Collection>
                )
               
           })}

           
        </div>
       
    )

}

// const mapStateToProps=data=>({

//     getShopData: data.shopData.INITIAL_STATE.shop_data
   
// })


const mapStateToProps=state=>({

    getShopData: selectCollectionsForOverview(state)

})


export default connect(mapStateToProps)(CollectionOverview);