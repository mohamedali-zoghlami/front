import React, { useEffect, useState } from "react";
import "./Admin.css";

import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

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
    const admin= localStorage.getItem("admin");
    const token= localStorage.getItem("token");
    if(!token || token.length===0)
      navigate("/login")
    if(!admin || admin.length===0)
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
    let url="http://localhost:3000/products/";
    let methode;
    if(param.name)
    {
      methode="PATCH";
      url+=param.name;
    }
    else
    {
      methode="POST";
      url+="add"
    }
    try {
      console.log(data);
      const token= localStorage.getItem("token");
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
          text:"Produit ajouté ou modifier !",
          title:"Succes !",confirmButtonText: 'Cool',icon:"success"
          });
      } else {
        Swal.fire({
          text:response.status,
          title:"Erreur",confirmButtonText: 'Cool',icon:"error"
          });
      }
    } catch (error) {
      Swal.fire({
        text:error,
        title:"Erreur !",confirmButtonText: 'Cool',icon:"Error"
        });
      
    }
  }
  const handlesubmit2= async ()=>
      {try{
        const token= localStorage.getItem("token");
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
          });
        
      }
      }
  
  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <FormControl
        onSubmit={(event)=>{handlesubmit(event)}}
        width="30%"
        h={"auto"}
        m="auto"
        border={"1px solid gainsboro"}
        mt={"20px"}
        mb={"20px"}
        gap={"20px"}
        bg={"#f7f8f7"}
      >
        {param.name?<FormLabel mt={"12px"}>{product.name}</FormLabel>:<></>}

        <FormLabel mt={"12px"}>Image</FormLabel>
        <Input
          type="text"
          value={product.image}
          name="image"
          onChange={(e)=>handleChange(e)}
          required
        />

        <FormLabel mt={"12px"}>Description</FormLabel>
        <Input
          type="text"
          value={product.description}
          name="description"
          onChange={(e) => handleChange(e)}
          required
        />

        {param.name?<></>:
        <>
        <FormLabel mt={"12px"}>Name</FormLabel>
        <Input
          type="text"
          value={product.name}
          name="name"
          onChange={(e) => handleChange(e)}
          required
        />
        </>
         }
        <FormLabel mt={"12px"}>Quantity</FormLabel>
        <Input
          type="number"
          value={product.quantity}
          name="quantity"
          onChange={(e) => handleChange(e)}
          required
        />

        <FormLabel mt={"12px"}>Price</FormLabel>
        <Input
          type="number"
          value={product.price}
          name="price"
          onChange={(e) => handleChange(e)}
          required
        />

       

     
        <FormLabel mt={"12px"}>Category</FormLabel>
        <Select
          name="category"
          placeholder={product.category}
          onChange={(e) => handleChange(e)}
        >
          <option value={"homme"}>Homme</option>
          <option value={"femme"}>Femme</option>
          <option value={"garcon"}>Garcon</option>
          <option value={"fille"}>Fille</option>

        </Select>

        <FormLabel mt={"12px"} mb={"10px"}>
          Brand
        </FormLabel>
        <Select
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
        </Select>
        <Button ml={"155px"} mt={"20px"} bg={"skyblue"} onClick={(event)=>{handlesubmit(event)}}>
          {param.name?"Update product":"Add Product"}
        </Button>
        {param.name?<Button ml={"155px"} mt={"20px"} bg={"skyblue"} onClick={(event)=>{handlesubmit2(event)}}>
          Delete Item
        </Button>:<></>}
      </FormControl>
    </>
  );
};

export default AdminManageProduct;
