import {React,useState,useEffect} from 'react'
import NotAuthorized from '../NotAuthorized/NotAuthorized';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import UsersTable from './components/UsersTable';
import OrdersTable from './components/OrdersTable';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


export default function AdminAccountManagement(props) {
  const [fullname,setFullName] = useState("");
    const [openUsers, setOpenUsers] = useState(false);
    const handleOpenUsers = () => setOpenUsers(true);
    const handleCloseUsers = () => setOpenUsers(false);
    const [openOrders, setOpenOrders] = useState(false);
    const handleOpenOrders = () => setOpenOrders(true);
    const handleCloseOrders = () => setOpenOrders(false);
    useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${props.email}`);
      const json = await response.json();
      if (response.ok) {
        setFullName(json.fullname);
      }
    };
    fetchUser();
  },);


  return (
    <div>
    {
      !props.isAdmin && (
        <NotAuthorized/>
      )
    }
    {
      props.isAdmin && (
        <>
          <h2>Hello {fullname}</h2>
          <Button variant="contained" onClick={handleOpenUsers}>Click to show all users</Button>
          <Modal
            open={openUsers}
            onClose={handleCloseUsers}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                All Users Table
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <UsersTable/>
              </Typography>
            </Box>
          </Modal>
          <br/>
          <br/>
          <Button variant="contained" onClick={handleOpenOrders}>Click to show all orders</Button>
          <Modal
            open={openOrders}
            onClose={handleCloseOrders}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                All Orders Table
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <OrdersTable/>
              </Typography>
            </Box>
          </Modal>
        </>
      )
    }
    </div>
  )
}
