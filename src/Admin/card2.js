import React from "react";
import { addToCart } from "../store/cartSlice";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

export default function Card2(
    el
) {
   
    return (
        <div >
            <Link to={`/admin/add/${el.name}`}>
        <div className="card2" key={el.key}>
        <div className="card_img2">
            <img src={el.image} alt="" />
        </div>
        <div className="card_header2">
            <h2>{el.name}</h2>
            <p className="price2">{el.price}<span>Dt</span></p>
        </div>
    </div>
    </Link>
    </div>
      );
    };
