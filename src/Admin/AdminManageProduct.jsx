import React, { useEffect, useState } from "react";
import "./Admin.css";
import './producform.css'

import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Cookie from "js-cookie";
import hashData from "../cryptage";
const AdminManageProduct = ({}) => {
  const param=useParams()
  const navigate=useNavigate();
  const initailState = {
    image: "",
    quantity: 0,
    name: "",
    description: "",
    price: 0,
    brand: "zara",
    category: "homme",}  
  const [product, setProduct] = useState(initailState);
  
  const fetchData = async () => {
    if(param.name &&param.name.length>0)
  {
    try {
      let url=`http://localhost:3000/products/namee/${param.name}`;
      const response = await fetch(url);
      const jsonData = await response.json();
      setProduct(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
};
    const handleChange = (e) => {
    let { value } = e.target;

    setProduct((prev) => {
      return { ...prev, [e.target.name]: value };
    });
  };

  useEffect(() => {
    const admin=  Cookie.get("role");
    const token= Cookie.get("token");
    if(!token || token.length===0)
      navigate("/login")
    if(!admin || admin!=="Admin")
      navigate("/")
    fetchData();
  }, [param]);

  const handlesubmit= async (event)=>{
    event.preventDefault();
    const data=
    {
      "name":product.name,
      "price":product.price,
      "category":product.category,
      "description":product.description,
      "image":product.image,
      "brand":product.brand,
      "quantity":product.quantity
    }
    let erreur="";
    if(data.name.length===0)
      erreur="Name est obligatoire"
    else if(data.price<=0)
      erreur="Price doit être supérieur à 0";
    else if(data.quantity<0)
      erreur="Quantité doit être positive";
    
    if (erreur.length===0)
    {
    let url="http://localhost:3000/products/";
    let methode;
    let product="Produit "
    if(param.name)
    {
      methode="PATCH";
      url+=param.name;
      product+="modifié !"
    }
    else
    {
      methode="POST";
      url+="add"
      product+="ajouté !"
    }
    try {
      console.log(data);
      const token= Cookie.get("token");
      const response = await fetch(url, {
        method: methode,
        headers: {
          'Content-Type': 'application/json',
          'jwt':token,
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        Swal.fire({
          text:product,
          title:"Succes !",confirmButtonText: 'Cool',icon:"success"
          });
          navigate("/admin/products")
      } else {
        const error=await response.json();
        Swal.fire({
          text:error.message,
          title:"Erreur",confirmButtonText: 'Cool',icon:"error"
          });
      }
    } catch (error) {
      Swal.fire({
        text:error,
        title:"Erreur !",confirmButtonText: 'Cool',icon:"error"
        });
      
    }
    }else
    {
      Swal.fire({
        text:erreur,
        title:"Erreur !",confirmButtonText: 'Cool',icon:"error"
        });
    }
  }
  const handlesubmit2= async (e)=>
      {   
        e.preventDefault();
      Swal.fire({
      title: 'Are you sure you want to remove this user?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try{
        const token= Cookie.get("token");
        const response = await fetch(`http://localhost:3000/products/${param.name}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'jwt':token,
          },
        });
        if (response.ok) {
        
          Swal.fire({
            text:"Produit supprimée !",
            title:"Succes !",confirmButtonText: 'Cool',icon:"success"
            });
            navigate("/admin/products")
        } else {
          Swal.fire({
            text:response.status,
            title:"Erreur !",confirmButtonText: 'Cool',icon:"error"
            });
        }
      } catch (error) {
        Swal.fire({
          text:error,
          title:"Erreur !",confirmButtonText: 'Cool',icon:"error"
          });}
        } 
      })
      }
  
  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <form
      className="prod-form"
        onSubmit={(event)=>{handlesubmit(event)}}
      >
        {param.name?<label >{product.name} <button type="delete" onClick={(event)=>{handlesubmit2(event)}}>
          Delete Item
        </button></label>:<></>} 
        <label  >Image</label>
        <input
          type="text"
          value={product.image}
          name="image"
          onChange={(e)=>handleChange(e)}
          required
        />

        <label >Description</label>
        <input
          type="text"
          value={product.description}
          name="description"
          onChange={(e) => handleChange(e)}
          required
        />

        {param.name?<></>:
        <>
        <label >Name</label>
        <input
          type="text"
          value={product.name}
          name="name"
          onChange={(e) => handleChange(e)}
          required
        />
        </>
         }
        <label >Quantity</label>
        <input
          type="number"
          value={product.quantity}
          name="quantity"
          onChange={(e) => handleChange(e)}
          required
        />

        <label >Price</label>
        <input
          type="number"
          value={product.price}
          name="price"
          onChange={(e) => handleChange(e)}
          required
        />

       

     
        <label mt={"12px"}>Category</label>
        <select
          name="category"
          placeholder={product.category}
          onChange={(e) => handleChange(e)}
        >
          <option value={"homme"}>Homme</option>
          <option value={"femme"}>Femme</option>
          <option value={"garcon"}>Garcon</option>
          <option value={"fille"}>Fille</option>

        </select>

        <label mt={"12px"} mb={"10px"}>
          Brand
        </label>
        <select
          name="brand"
          placeholder={product.brand}
          onChange={(e) => handleChange(e)}
        >
          <option
            value="zara"
          >
            Zara
          </option>
          <option
            value="bershka"
          >
            Bershka
          </option>
        </select>
        <button type="submit" onClick={(event)=>{handlesubmit(event)}}>
          {param.name?"Update product":"Add Product"}
        </button>
        
      </form>
    </>
  );
};

export default AdminManageProduct;
