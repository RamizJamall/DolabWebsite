import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return <>
       <div className=' d-flex flex-column min-vh-100 '>    
      <Header/>
     
      
      <div className="flex-grow-1">
         <Outlet/>
   </div> 


      <Footer/>
  
      </div>  
  
  </>
}
