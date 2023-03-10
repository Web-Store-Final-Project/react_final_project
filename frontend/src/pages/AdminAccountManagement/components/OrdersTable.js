import {React,useState,useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function UsersTable() {
    const [orders,setOrders] = useState([]);
    useEffect(() => {
        const fetchItems = async () => {
        const response = await fetch("/api/orders/");
        const json = await response.json();

        if (response.ok) {
            setOrders(json);
        }
    };

        fetchItems();
    }, [orders]);
  
    return (
    <div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300}}  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Date (UK Time-Zone)</TableCell>
            <TableCell align="center">Total Amount($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.email}>
              <TableCell align="center">{order.email}</TableCell>
              <TableCell align="center">{order.date + " ("+order.time+")"}</TableCell>
              <TableCell align="center">{order.totalPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
    </div>
  )
}
