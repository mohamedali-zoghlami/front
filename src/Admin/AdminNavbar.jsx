import React from "react";
import "./Admin.css";
import { Avatar, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function AdminNavbar() {
  return (
    <div className="AdminNavbar" style={{ marginBottom: "30px" }}>
      <div>
        <h1 className="mebuy">
          <Link to="/">
          Ebuy
          </Link>
        </h1>
      </div>

      <div>
        <h1>Admin's Page</h1>
      </div>
    </div>
  );
}

export default AdminNavbar;
