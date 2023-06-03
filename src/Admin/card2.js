import React, { useEffect, useState } from "react";
import { addToCart } from "../store/cartSlice";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

export default function Card2(
    el
) {
    const [image,setImage]=useState(el.image)
    useEffect(() => {

    if(image.length===0)
        setImage("https://www.feedough.com/wp-content/uploads/2020/07/PRODUCT-LINE.webp")
    })
    return (
        <div >
            <Link to={`/admin/add/${el.name}`}>
        <div className="card2" key={el.key}>
        <div className="card_img2">
            <img src={image} alt="https://www.feedough.com/wp-content/uploads/2020/07/PRODUCT-LINE.webp" />
        </div>
        <div className="card_header2">
            <h2>{el.name}</h2>
            <p className="price2">{el.price}<span>Dt</span></p>
            <h2>Stock : {el.stock}</h2>
        </div>
    </div>
    </Link>
    </div>
      );
    };
