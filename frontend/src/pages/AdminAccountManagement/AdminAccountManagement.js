import {React,useState,useEffect} from 'react'
import NotAuthorized from '../NotAuthorized/NotAuthorized';
import Button from '@mui/material/Button';

export default function AdminAccountManagement(props) {
    const [fullname,setFullName] = useState("");
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
          <Button variant="contained">Click to show all users</Button>
          <br/>
          <br/>
          <Button variant="contained">Click to show some graphs</Button>
        </>
      )
    }
    </div>
  )
}
