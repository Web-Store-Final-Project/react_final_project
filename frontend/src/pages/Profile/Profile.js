import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import io from "socket.io-client";
import Chat from "../Profile/Chat";
const socket = io.connect("http://localhost:3001");

export default function Profile(props) {
  const [fullname, setFullName] = useState("");
  const [resultJson, setResultJson] = useState([]);

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    setUsername(fullname);
    setRoom(props.email);
    setOpenChat(true);
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
    props.setContactList((list) => [...list, props.email]);
    console.log(props.contactList);
  };

  const [openChat, setOpenChat] = useState(false);
  const handleCloseChat = () => setOpenChat(false);

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

  useEffect(() => {
    const fetchOrdersByEmail = async () => {
      const response = await fetch(`/api/orders/${props.email}`);
      const json = await response.json();

      if (response.ok) {
        setResultJson(json);
      }
    };
    fetchOrdersByEmail();
  });

  return (
    <div>
      <h1>Hello {fullname}</h1>
      <h1>Your orders history</h1>
      {resultJson.map((order) => {
        return (
          <>
            <div className="orderProfile">
              <h4>
                {order.date} ({order.time}){" "}
              </h4>
              {order.cart.map((item, index) => {
                return (
                  <div>
                    <h4>
                      product {index + 1}: {item.title}
                    </h4>
                    <img
                      className="itemImgInProfile"
                      src={item.imgPath1}
                      alt={item.title + index}
                    />
                    <img
                      className="itemImgInProfile"
                      src={item.imgPath2}
                      alt={item.title + index + 1}
                    />
                  </div>
                );
              })}
              <h4>Total Price: {order.totalPrice}$</h4>
            </div>
            <br />
          </>
        );
      })}
      <div className="chatBox">
        <div className="joinChatContainer">
          <h3>Chat with us</h3>
          <button onClick={joinRoom}>Click to open Chat</button>
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
    </div>
  );
}
