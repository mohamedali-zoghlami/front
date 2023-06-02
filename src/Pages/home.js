import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./boutique.css"
import  Card  from '../Components/card';
import '../Components/card.css';
import {product} from '../db'
import Pagination from '../Components/pagination';
import './select.css'
import NavBar from '../Components/navbar';
import { connect } from 'react-redux';
import axios from 'axios';

export default function Home({})
{ 

  const params = useParams();
  const currentPage=params.page?params.page:1;
  const [count,setCount]=useState(1);
  const [category,setcategory]=useState("")
  const [name,setName]=useState("");
  const [brand,setbrand]=useState("")
  const [records,setRecords]=useState([])
  const handleCategoryChange = (event) => {
    setcategory(event.target.value);
  };
  const handleBrandChange = (event) => {
    setbrand(event.target.value);
  };
  const handleSearch = (event)=>
  {
    setName(event.target.value)
  }
  const navigate=useNavigate();
  useEffect(() => {
    const token=localStorage.getItem("token")
    if(!token || token.length===0)
      navigate("/login")
    const fetchData = async () => {
      try {
        let url=`http://localhost:3000/products/${currentPage}`;
       if(category.length>0 )
          url+=`?category=${category}`
        if(brand.length>0)
          url+=`${category?"&":"?"}brand=${brand}`
          if(name.length>0)
          url+= `${category?"&":brand?"&":"?"}name=${name}`
        const response = await fetch(url);
        const jsonData = await response.json();
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
        if(name.length>0)
         url+= `${category?"&":brand?"&":"?"}name=${name}`
        const response = await fetch(url);
        const jsonData = await response.json();
        setCount(Math.ceil(jsonData/9));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage,category,brand,name]);

  return (<div>
    <div><NavBar  /></div> 
  <div className='center'>
    <div className='selectList'> 
      <div class="select-dropdown">
        <select value={brand} onChange={handleBrandChange}>
          <option value="">ALL</option>
          <option value="zara">Zara</option>
          <option value="bershka">Bershka</option>
        </select>
      </div>
      <div class="select-dropdown">
        <select value={category} onChange={handleCategoryChange}>
          <option value="">ALL</option>
          <option value="homme">Homme</option>
          <option value="femme">Femme</option>
          <option value="garcon">Garçon</option>
          <option value="fille">Fille</option>
        </select>
      </div>
      <div className="search-bar">
        <input type="text" value={name} onChange={handleSearch} />
      </div>
    
    
    
    
    
    
    </div>
    <div class="main_content">
  
  {records.map((item,index)=>(
      (index%3==0) && <div key={index} className='row'>
          {
             records.slice(index, index + 3).map((item, innerIndex) => (
              <div  key={innerIndex} className="item" >
                <Card key={item.id} name={item.name} image={item.image} price={item.price}/>
              </div>
            ))}
          </div>))} 
          <Pagination currentPage={currentPage} totalPages={count} path={"/"}/>
  </div>
  </div> 
  </div> 
);
}

