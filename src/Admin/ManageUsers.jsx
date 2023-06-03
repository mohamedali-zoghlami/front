import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import { useNavigate, useParams } from "react-router-dom";
import Cookie from "js-cookie";
import './table.css'
import Pagination from "../Components/pagination";
import Swal from "sweetalert2";
function ManageUsers() {
  const params=useParams();
  const navigate=useNavigate();
  const [userData, setUserData] = useState([]);
  const [count,setCount]=useState(1);
  const currentPage=params.page?params.page:1;
  const getData = async () => {
    try {
      let url=`http://localhost:3000/users/all/${currentPage}`;
      console.log(url);
      const token= Cookie.get("token");
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'jwt':token,
        },
      });
      const jsonData = await response.json();
      setUserData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    try {
      const token= Cookie.get("token");
      let url=`http://localhost:3000/user/count`;
      
      const response =await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'jwt':token,
        },
      });
      const jsonData = await response.json();
      setCount(Math.ceil(jsonData/9));
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  useEffect(() => {
    const admin= Cookie.get("role");
    const token= Cookie.get("token");
    if(!token || token.length===0)
      navigate("/login")
    if(!admin || admin!="Admin")
      navigate("/")
    getData();
  }, [currentPage]);

  const handleClick=async (email)=>{
    
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
        const token= Cookie.get("token");
        try {
         
            const response = await fetch(`http://localhost:3000/users/oneuser/${email}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'jwt':token
            },
            
          })
          console.log(response)
          if(response.ok)
          {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            navigate("/admin/users/1")

          }
            else
            {const error= await response.json()
              Swal.fire({
                text:error.message,
                title:"Erreur !",confirmButtonText: 'OK',icon:"error"
                });
            }
            }
            catch(e)
                {Swal.fire({
                  text:e,
                  title:"Erreur !",confirmButtonText: 'OK',icon:"error"
                  });
                }
      }
    })
  }
  


  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <table className="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Telephone</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {userData.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.tel}</td>
            <td><button onClick={()=>handleClick(user.email)}>Remove</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    <Pagination currentPage={currentPage} totalPages={count} path={"/admin/users/"}/>
    </>
  );
}

export default ManageUsers;
