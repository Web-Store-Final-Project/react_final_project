import { React, useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("/api/users/");
      const json = await response.json();
      if (response.ok) {
        setUsers(json);
      }
    };

    fetchItems();
  }, [users]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Full-Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.email}>
                <TableCell align="center">{user.fullname}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                {user.isOnline && (
                  <TableCell
                    align="center"
                    sx={{ "background-color": "lightgreen" }}
                  >
                    {user.isOnline.toString()}
                  </TableCell>
                )}
                {!user.isOnline && (
                  <TableCell align="center" sx={{ "background-color": "red" }}>
                    {user.isOnline.toString()}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
