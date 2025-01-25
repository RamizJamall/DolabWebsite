import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../context/Cart';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


export default function Cart() {

         const { updateCount, getCartInfo,numCartItems ,cartPrice , getProducts, removeItem}  =  useContext( cartContext);
              
               
     
    async  function updateCon(id , con){
         
            const dat =      await updateCount(id ,con);

                console.log(dat);
    }
    
  


    async  function removeProduct(id){

          const dat =  await   removeItem(id);
        
          if (dat.status === "success"){   
       
            toast.success( "Product Removed Successfully" );
         
                }
                 else{
                   toast.error("try again later")

                      }
      
    

      }

         
  return <>
          <div className='container  mb-5 mt-5'>
            <h2 className=' justify-content-center d-flex'>Your Cart</h2>
                { getProducts?.length !== 0  ? getProducts?.map(function(product , idx){   return  <div key={idx} className="row  m-2   border d-flex">
 
                                     <div  className="   d-flex justify-content-center  col-md-1">
                                                    <img src={product.product.imageCover} style={{width:"90px"}}   alt="" />
                                           
                                           </div>
                                     <div  className="  text-center d-flex justify-content-center  align-items-center  align-items-md-start  flex-column  col-md-7">
                                                        <h3>{" Title: " +product.product.title.split(' ').slice(0, 3).join(' ')}</h3>
                                                       <h5>{"Price: " +product.price}</h5>
                                                       <button onClick={ function(){ removeProduct(product.product.id);
                                                        }} className=' btn  btn-outline-danger  p-2'>remove</button>
                                           
                                           </div>
                                           <div  className="  align-items-center d-flex justify-content-center  col-md-4">
                                                       
                                                       <button onClick={ function(){
                                                            updateCon(product.product.id , product.count+1 );

                                                       }}  className='  btn btn-danger text-white  rounded-circle  d-flex justify-content-center align-items-center pb-2   m-2'   style={{ width: '25px', height: '25px' }}>+</button>
                                                       <h5 className='m-2'>{product.count}</h5>
                                                       <button onClick={ function(){
                                                            updateCon(product.product.id , product.count -1 );

                                                       }} className=' btn btn-danger text-white  rounded-circle  d-flex justify-content-center align-items-center pb-2   m-2'   style={{ width: '25px', height: '25px' }}>-</button>
                                           
                                                             </div>
                                         
                                                            </div>
                                               }) :  ""   }

             
                   { getProducts?.length !== 0 ?  <div className=' d-flex  justify-content-evenly mt-2'>
                       <h4> {"Subtotal:  " + cartPrice}</h4> 
                       <Link to="/checkout"> <button className=' btn btn-danger text-white'>CHECK OUT</button></Link>
                       </div>
                          : <h3 className=' d-flex justify-content-center text-danger'>  Your Cart Is Empty  </h3>
                             }
  
                           </div> 
                 </>
 
 }
