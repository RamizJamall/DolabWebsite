import React, { Children, useContext } from 'react'
import { authContext } from '../../context/Authentication'
import { Navigate } from 'react-router-dom';

export default function Test({children}) {
 const {token} = useContext(authContext);

  
    
    if (!localStorage.getItem('tkn')){

    
        return   <Navigate to="/login"/> 
        
       
        
    }


  


  return <>

        { children }       
  
  
  </>
}
