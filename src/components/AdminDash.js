import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";

export default function AdminDash() {
  let history = useHistory();

  // useEffect(() => {
  //     if(localStorage.getItem('token')){

  //     }
  //     else{
  //         history.push('/login');
  //     }

  // }, [])

  return (
    <div>
      <h2>Admin Dashboasrd</h2>
    </div>
  );
}
