import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const authContext = createContext();


export function  AuthProvider({children}){

   const [token , setToken] = useState(null);
   
   useEffect(function(){
         
      if (localStorage.getItem('tkn')){
               
         setToken(localStorage.getItem('tkn'))
     
              
      }



  },[])







    

           
 
     


   return <authContext.Provider   value={{token , setToken}}  >
   
   
        {children}
   
   </authContext.Provider>



}