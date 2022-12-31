import React from 'react'
import {useEffect} from 'react'
export default function Profile(props) {
    useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/profile/${props.email}`);
      const json = await response.json();

      if (response.ok) {
        console.log(json)
      }
    };
    fetchUser();
  },);

  return (
    <div>
      <h1>hello {props.email}</h1>
    </div>
  )
}
