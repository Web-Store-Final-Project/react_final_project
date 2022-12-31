import React from 'react'
import {useState,useEffect} from 'react'
export default function Profile(props) {
    const [fullname,setFullName] = useState("");
    const [isAdmin,setIsAdmin] = useState("");
    useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${props.email}`);
      const json = await response.json();
      
      if (response.ok) {
        setFullName(json.fullname);
        setIsAdmin(json.isAdmin);
      }
    };
    fetchUser();
  },);

  return (
    <div>
      <h1>Hello {fullname}</h1>
      <h1>{props.email}</h1>
      {
        isAdmin && (
          <h1>You are Admin</h1> 
        )
      }
      {
        !isAdmin && (
          <h1>You are not Admin</h1>
        )
      }
    </div>
  )
}
