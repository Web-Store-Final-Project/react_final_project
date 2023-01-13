import React from 'react'
import {useState,useEffect} from 'react'
export default function Profile(props) {
    const [fullname,setFullName] = useState("");
    const [resultJson,setResultJson] = useState([]);
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
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${props.email}`);
      const json = await response.json();
      
      if (response.ok) {
        setFullName(json.fullname);
      }
    };
    fetchUser();
  },);

  useEffect(() => {
    const fetchOrdersByEmail = async () => {
      const response = await fetch(`/api/orders/${props.email}`);
      const json = await response.json();
      
      if (response.ok) {
        setResultJson(json);
      }
    };
    fetchOrdersByEmail();
  },);

  return (
    <div>
      <h1>Hello {fullname}</h1>
      <h1>Your orders history</h1>
      {
        resultJson.map((order)=>{
          return <>
            <div className="orderProfile">
              <h4>{order.date} ({order.time}) </h4>
              {
                order.cart.map((item,index)=>{
                  return (
                    <div>
                      <h4>product {index +1}: {item.title}</h4>
                      <img className="itemImgInProfile" src={item.imgPath1} alt={item.title+index}/>
                      <img className="itemImgInProfile" src={item.imgPath2} alt={item.title+index+1}/>
                    </div>
                  )
                })
              }
              <h4>Total Price: {order.totalPrice}$</h4>
            </div>
            <br/>
          </>   
        })
      }
    </div>
  )
}
