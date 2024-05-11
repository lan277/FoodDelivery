import React, { useEffect, useState } from 'react'
import axios from "axios"
import './PlaceOder.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
const PlaceOder = () => {
  const{getTotalCartAmount,token,food_list,cartItem,url} = useContext(StoreContext)
  const[data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })
  const onChangeHandle = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  const placeOder = async(event) =>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItem[item._id]>0){
        let itemInfor = item;
        itemInfor["quantity"] = cartItem[item._id];
        orderItems.push(itemInfor);
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
   
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error")
    }
  }
  const navigate = useNavigate();
  useEffect(()=>{
    if (!token) {
      navigate('/cart')
    }else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])
  return (
    <form onSubmit={placeOder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Infomation</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandle} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandle} value={data.lastName} type="text" placeholder='Last name' />
        </div>

        <input required name='email' onChange={onChangeHandle} value={data.email}  type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandle} value={data.street}  type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandle} value={data.city}  type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandle} value={data.state}  type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
        <input required name='zipcode' onChange={onChangeHandle} value={data.zipcode}  type="text" placeholder='Zip code' />
        <input required name='country' onChange={onChangeHandle} value={data.country}  type="text" placeholder='Country' />
      </div>
      <input required name='phone' onChange={onChangeHandle} value={data.phone}  type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOder
