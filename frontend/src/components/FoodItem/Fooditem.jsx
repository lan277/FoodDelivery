import React, { useContext } from 'react'
import './Fooditem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
const Fooditem = ({id,name,price,description,image}) => {
  
  
  const {cartItem,addtoCart,removeFromCart,url} = useContext(StoreContext)
  
  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-img' src={url+"/images/"+image} alt="" />
        {!cartItem[id]
          ?<img className='add' onClick={()=>
            addtoCart(id)
          } src={assets.add_icon_white} />
          :<div className="food-item-couter">
            <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red}  alt="" />
            <p>{cartItem[id]}</p>
            <img onClick={()=>addtoCart(id)} src={assets.add_icon_green} alt="" />
          </div>
        }
      
      </div>
      <div className="food-item-infor">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  )
}

export default Fooditem
