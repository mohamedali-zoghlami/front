import React from "react";
import { addToCart } from "../store/cartSlice";
import { useDispatch } from 'react-redux';

export default function Card(
    el
) {
    const dispatch = useDispatch();
    const handleClick=  (product)=> {
        const Swal = require('sweetalert2');
        dispatch(addToCart(product))
        Swal.fire({
            text:"Porduit ajouter au panier !",
            title:"Succes !",confirmButtonText: 'Cool',icon:"success"
            });

        
      };
    return (
        <div >
        <div className="card" key={el.key}>
        <div className="card_img">
            <img src={el.image} alt="" />
        </div>
        <div className="card_header">
            <h2>{el.name}</h2>
            <p className="price">{el.price}<span>Dt</span></p>
            <div onClick={()=>handleClick(el)} className="btn">Add to cart</div>
        </div>
    </div>
    </div>
      );
    };
