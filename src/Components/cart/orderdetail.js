import React, { useEffect, useState } from "react"
import NavBar from "../navbar";
import './cart.css';
import { json, useNavigate, useParams } from "react-router-dom";
const OrderHistory=()=>
{   const params= useParams();
    const id=params.id;
    const [price, setPrice] = useState(0);
     const navigate=useNavigate();
     const [records,setRecords]=useState([]);


     
    const fetchData=async()=>{
    const token= localStorage.getItem("token");
    try {
    const response = await fetch(`http://localhost:3000/products/history/${id}`)
            const jsonData=await response.json();
            console.log(jsonData)
            setRecords(jsonData )
            let ans = 0;
            jsonData.map((item) => (ans +=item.quantity* item.price));
            setPrice(ans);
            }
            catch(e)
                {console.log(e)
                }}
    useEffect( () => {
        const token= localStorage.getItem("token");
        if(!token || token.length===0)
          navigate("/login")
         fetchData();
      },[id]);

      
      return(
        <>
        <NavBar />
        <article>
    {records.map((item) => (
      <div className="cart_box" key={item.id}>
      <div className="cart_img">
        <img src={item.image} alt="" />
        <div>
        <p>Name : {item.name} </p>
        <p>Description :{item.description}</p>
        </div>
        <div>
       <span> {item.brand} </span>
        </div>
    
      </div>
      <div>
        <button>quantity : {item.quantity}</button>
      </div>
      <div>
        <span>Price : {item.price}</span>
      </div>
    </div>
    ))} 
    <div className="total">
    <span>Total Price of your Cart</span>
    <span>  {price} - Dt </span>
  </div>
    </article>
        </>
      )
}
export default OrderHistory;