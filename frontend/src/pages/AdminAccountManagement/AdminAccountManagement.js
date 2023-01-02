import {React,useState,useEffect} from 'react'
import NotAuthorized from '../NotAuthorized/NotAuthorized';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
export default function AdminAccountManagement(props) {
  const [fullname,setFullName] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
          <Button variant="contained" onClick={handleOpen}>Click to show all users</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                All Users Table
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Ima Shel Ambar Aliiii
              </Typography>
            </Box>
          </Modal>
        </>
      )
    }
    </div>
  )
}
