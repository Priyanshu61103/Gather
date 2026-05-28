import React from 'react'
import { Navigate } from 'react-router';
const Protected = ({children}) => {
   if(!localStorage.getItem("user"))
   return <Navigate to="/signin"/>

   return children;
}

export default Protected