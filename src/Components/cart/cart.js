import React, { useEffect, useState } from "react";
import './cart.css'
import NavBar from "../navbar";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { connect, useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeFromCart,removeAll } from '../../store/cartSlice';
function Cart  ({})  

{ 
  const cart=useSelector((state)=>state.cart);
  const dispatch=useDispatch();
  const navigate=useNavigate({}); 
  const handleRemove= (product)=>
  {
    dispatch(removeFromCart(product))
  };

  const handleClick=async ()=>
  { 
    const Swal = require('sweetalert2');
    if(cart.cartItems.length==0)
        Swal.fire({
            text:"Pas de produits dans le panier !",
            title:"Erreur !",confirmButtonText: 'Cool',icon:"error"
            });
    else
    { const result_array = cart.cartItems.map((item)=>{
      return{product:item.name,quantity:item.carteQuantity
      };
    });
    const objet={
      orders:result_array
    }
    const objetJson=JSON.stringify(objet);
    const token= Cookie.get("token");
    try{
      const response = await fetch('http://localhost:3000/products/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'jwt':token,
        },
        body: objetJson,
      })

      if (response.ok) {
        dispatch(removeAll());
        Swal.fire({
          text:"Commande effectuée !",
          title:"Succes !",confirmButtonText: 'Cool',icon:"success"
          });
        navigate("/");
      }
      else
      { const error= await response.json()
        console.error(error);
        Swal.fire({
        text:error.message,
        title:"Erreur !",confirmButtonText: 'OK',icon:"error"
        });

      } 
    } catch (error) {
      Swal.fire({
        text:error,
        title:"Erreur !",confirmButtonText: 'OK',icon:"error"
        });
    }
        
          }
  }
  

  const [price, setPrice] = useState(0);

  const handleDecrease=(product)=>
  {
    dispatch(decreaseQuantity(product));
  };
  const handleIncrease=(product)=>
  {
    dispatch(increaseQuantity(product));
  };

  const handlePrice = () => {
    let ans = 0;
    if (!cart || cart.length === 0){}
    else 
    cart.cartItems?.map((item) => (ans +=item.carteQuantity* item.price));
    setPrice(ans);
  };

  useEffect(() => {
    const token= Cookie.get("token");
    if(!token || token.length===0)
      navigate("/login")
    handlePrice();
  });
  
  
  if (!cart || cart.length === 0) {
    return<div> <NavBar /> <p>Your cart is empty.</p></div>;
  }
  return(
    <div>
      <NavBar />
    <article>
    {cart.cartItems?.map((item) => (
      <div className="cart_box" key={item.id}>
        <div className="cart_img">
          <img src={item.image} alt="" />
          <p>{item.name}</p>
        </div>
        <div>
          <button onClick={() => handleDecrease(item)}>-</button>
          <button>{item.carteQuantity}</button>
          <button onClick={() => handleIncrease(item)}>+</button>
        </div>
        <div>
          <span>{item.price}</span>
          <button onClick={() => handleRemove(item)}>Remove</button>
        </div>
      </div>
    ))}
    <div className="total">
      <span>Total Price of your Cart</span>
      <span>  {price} - Dt </span>
    </div>
    <div>
          
          <button className="pass" onClick={() => handleClick()}>Confirmer la commande</button>
        </div>
  </article>
  </div>
);}

export default Cart;