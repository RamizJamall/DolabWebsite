import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'

export default function () {


    const [name , setName] =   useState(null);

      useEffect(()=>{


    const x   =  jwtDecode(localStorage.getItem('tkn'))
              setName(x);
      },[])
       
       if(name === null){

        return <h2>loading</h2>
       }
     
  return <>
  
             <div className="container">
          
         <h2>{"hello , " + name?.name}</h2>
  
         </div>
  
  
  </>
}
