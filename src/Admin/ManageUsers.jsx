import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Grid,
} from "@chakra-ui/react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../Components/pagination";

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
      const token= localStorage.getItem("token");
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'jwt':token,
        },
      });
      const jsonData = await response.json();
      console.log(jsonData)
      setUserData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    try {
      const token= localStorage.getItem("token")
      let url=`http://localhost:3000/user/count`;
      
      const response =await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'jwt':token,
        },
      });
      const jsonData = await response.json();
      console.log(jsonData)
      setCount(Math.ceil(jsonData/9));
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  useEffect(() => {
    const admin= localStorage.getItem("admin");
    const token= localStorage.getItem("token");
    if(!token || token.length===0)
      navigate("/login")
    if(!admin || admin.length===0)
      navigate("/")
    getData();
  }, [currentPage]);

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <Grid width="40%" h={"auto"} ml="20px" m={"auto"}>
        <TableContainer width="90%" h={"auto"} ml="150px" mb="20px">
          <Table variant="simple">
            <Thead bg="#285e61">
              <Tr>
                <Th color={"white"}>S.No</Th>
                <Th color={"white"}>Name</Th>
                <Th color={"white"}>User Email</Th>
                <Th color={"white"}>User Tel</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userData.length > 0 &&
                userData.map((el, i) => {
                  return (
                    <Tr key={el.id}>
                      <Td>{el.id}</Td>
                      <Td>
                        {el.name} {el.lastname}
                      </Td>
                      <Td>{el.email}</Td>
                      <Td>{el.tel}</Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
        <Pagination currentPage={currentPage} totalPages={count} path={"/admin/users/"}/>
      </Grid>
    </>
  );
}

export default ManageUsers;
