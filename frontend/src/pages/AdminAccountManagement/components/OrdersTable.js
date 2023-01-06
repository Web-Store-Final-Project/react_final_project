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
    const getDateCorrect = (date)=>{
      const date1= date.split("T")[0];
      const arr = date1.split("-");
      return arr[2] + "-" + arr[1] + "-" + arr[0];
    }
    const getOrderTime = (date) =>{
      const date1= date.split("T")[1];
      const time = date1.split(".")[0];
      const arr = time.split(":");
      return arr[0] + ":" + arr[1];
      
    }
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
              <TableCell align="center">{getDateCorrect(order.date) + " (" + getOrderTime(order.date) + ")"}</TableCell>
              <TableCell align="center">{order.totalPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
    </div>
  )
}
