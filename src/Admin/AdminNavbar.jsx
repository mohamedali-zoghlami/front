import React from "react";
import "./Admin.css";
import { Avatar, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function AdminNavbar() {
  return (
    <div className="AdminNavbar" style={{ marginBottom: "30px" }}>
      <div>
        <h1>
          
            <img
              style={{ height: "30px", cursor: "pointer" }}
              src=""
              alt=""
            />
           
        </h1>
      </div>

      <div>
        <h1>Admin's Page</h1>
      </div>
    </div>
  );
}

export default AdminNavbar;
