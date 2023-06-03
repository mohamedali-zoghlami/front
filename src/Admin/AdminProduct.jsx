import React, { useEffect, useState } from "react";
import "./Admin.css";
import "./card2.css"
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import Pagination from "../Components/pagination";
import Card2 from "./card2";
import { useNavigate, useParams } from "react-router-dom";
import Cookie from "js-cookie";

function AdminProduct() {
  const param=useParams();
  const navigate=useNavigate();
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [records,setRecords]=useState([]);
  const currentPage=param.page?param.page:1;
  const [count,setCount]=useState(1);
  const fetchData = async () => {
    try {
      let url=`http://localhost:3000/products/${currentPage}`;
     if(category.length>0 )
        url+=`?category=${category}`
      if(brand.length>0)
        url+=`${category?"&":"?"}brand=${brand}`
      const response = await fetch(url);
      const jsonData = await response.json();
      console.log(jsonData)
      setRecords(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    try {
      let url=`http://localhost:3000/products/count`;
     if(category.length>0 )
        url+=`?category=${category}`
      if(brand.length>0)
        url+=`${category?"&":"?"}brand=${brand}`
      const response = await fetch(url);
      const jsonData = await response.json();
      setCount(Math.ceil(jsonData/9));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };
  useEffect(() => {
    const admin= Cookie.get("role");
    const token= Cookie.get("token");
    if(!token || token.length===0)
      navigate("/login")
      if(!admin || admin!="Admin")
      navigate("/")
    fetchData();
  }, [currentPage,category,brand,count]);
  
  return (
    <>
      <AdminNavbar />
      <div className="rows">
      <AdminSidebar />
      
      <div className="main_content2">
         {records.map((item,index)=>(
      (index%3==0) && <div key={index} className='rows'>
          { 
             records.slice(index, index + 3).map((item, innerIndex) => (
              <div  key={innerIndex} className="item" >

                <Card2 key={item.id_prod} description={item.description} quantity={item.quantity} 
                id={item.id_prod} 
                category={item.category} brand={item.brand}
                stock={item.quantity}
                name={item.name} image={item.image} price={item.price}/>
              </div>
            ))}
          </div>))} 
          <Pagination currentPage={currentPage} totalPages={count} path={"/admin/products/"}/>
          </div>
          </div>
    </>
  );
}

export default AdminProduct;
