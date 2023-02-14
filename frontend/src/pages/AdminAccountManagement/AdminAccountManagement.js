import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NotAuthorized from "../NotAuthorized/NotAuthorized";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import UsersTable from "./components/UsersTable";
import OrdersTable from "./components/OrdersTable";
import Charts from "./components/Charts";
import io from "socket.io-client";
import Chat from "../Profile/Chat";
const socket = io.connect("http://localhost:3001");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  height: "fit-content",
  overflowY: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AdminAccountManagement(props) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
    setUsername("Support Agent");
    setOpenChat(true);
  };

  const [fullname, setFullName] = useState("");
  const [openUsers, setOpenUsers] = useState(false);
  const handleOpenUsers = () => setOpenUsers(true);
  const handleCloseUsers = () => setOpenUsers(false);
  const [openOrders, setOpenOrders] = useState(false);
  const handleOpenOrders = () => setOpenOrders(true);
  const handleCloseOrders = () => setOpenOrders(false);
  const [openGraph, setOpenGraph] = useState(false);
  const handleOpenGraph = () => setOpenGraph(true);
  const handleCloseGraph = () => setOpenGraph(false);
  const [openChat, setOpenChat] = useState(false);
  const handleCloseChat = () => setOpenChat(false);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${props.email}`);
      const json = await response.json();
      if (response.ok) {
        setFullName(json.fullname);
      }
    };
    fetchUser();
  });

  return (
    <div>
      {!props.isAdmin && <NotAuthorized />}
      {props.isAdmin && (
        <>
          <h2>Hello {fullname}</h2>
          <Button variant="contained" onClick={handleOpenUsers}>
            Click to show all users
          </Button>
          <Modal
            open={openUsers}
            onClose={handleCloseUsers}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '80vw',
              maxHeight: '80vh',
              overflowY: 'auto',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              '&::-webkit-scrollbar': {
                width: '0.5em'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#888'
              }
            }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                All Users Table
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <UsersTable />
              </Typography>
            </Box>
          </Modal>
          <br />
          <br />
          <Button variant="contained" onClick={handleOpenOrders}>
            Click to show all orders
          </Button>
          <Modal
            open={openOrders}
            onClose={handleCloseOrders}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '80vw',
              maxHeight: '80vh',
              overflowY: 'auto',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              '&::-webkit-scrollbar': {
                width: '0.5em'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#888'
              }
            }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                All Orders Table
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <OrdersTable />
              </Typography>
            </Box>
          </Modal>
          <br />
          <br />
          <Button variant="contained" onClick={handleOpenGraph}>
            Click to show Graphs
          </Button>
          <Modal
            open={openGraph}
            onClose={handleCloseGraph}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Orders per date
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Charts />
              </Typography>
            </Box>
          </Modal>
          <div className="chatBox">
            <div className="joinChatContainer">
              <h3>Join A Chat</h3>
              <input
                type="text"
                placeholder="Room ID..."
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              />
              <button onClick={joinRoom}>Join A Room</button>
            </div>
            <Modal
              open={openChat}
              onClose={handleCloseChat}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Chat socket={socket} username={username} room={room}></Chat>
              </Box>
            </Modal>
          </div>
        </>
      )}
    </div>
  );
}
