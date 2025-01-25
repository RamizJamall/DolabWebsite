import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { FallingLines, Puff } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { cartContext } from '../../context/Cart';
import toast from 'react-hot-toast';

export default function ProductDetails() {
           

                 const [tim, setTim] =useState(false)
                 const [load, setLoad] =useState(false)
                     
                 useEffect(function(){

                      setTim(true);

                      const timer =  setTimeout(() => {
                        setTim(false);
                         }, 1000);


                        

                      return () => clearTimeout(timer);




                 },[])

          const {id} = useParams(); 


          const {addToCart}  =  useContext( cartContext);

            async function addCart(){
              if( localStorage.length !== 0){
              setLoad(true);
                const res =   await  addToCart(id) ; 
                
                if (res.status === "success"){
                  setLoad(false);
                         toast.success(res.message)
                }
                else{
                  toast.error("try again later")

                }
              }else{


                toast.error("Please Login To Add To Cart")
              }
           }

           function getProductDetails(){

              return    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

     

           }
  
  
            const {data , isLoading ,isFetching } =  useQuery({

              queryKey: ['productDetials'], // Pass the query key as an array
              queryFn: getProductDetails,  // Pass the query function
            }
              
           );
  
           
            if(isLoading ){
                   
                return <>
                      <div className='  vh-100 d-flex justify-content-center  mt-5 '>  < Puff
                    visible={true}
                    height="80"
                    width="80"
                    color="#000000"
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    />      </div>           
                      </>
            }

  return <>
           { !tim ?<div className="container  mt-3 d-flex justify-content-center align-items-center mb-5 ">


              <div className="row  ">


                       <div className="col-md-4  ">
                        <div className='d-flex  justify-content-center'>
                                        <img src={data.data.data.imageCover} alt="" className=' w-75'  />
                                        </div>
                       </div>
                       <div className="col-md-8 d-flex flex-column justify-content-center align-items-center ">
                                       <div className=' d-flex  text-center flex-column justify-content-center align-items-center'>
                                        <h2>  {data.data.data.title}        </h2>
                                        <p>  {data.data.data.description}        </p>
                                        <h6  className='  h3  text-danger '>L.E {data.data.data.price }</h6>
                                         </div>
                                   <button  onClick={addCart}  className='btn btn-dark mt-4 p-2 pe-4 ps-4 '>{ load ? <FallingLines
                                                        color="#fff"
                                                            width="30px"
                                                              visible={true}
                                                              ariaLabel="falling-circles-loading"
                                                                   />  : "+ Add to cart"       }</button>

                       </div>







              </div>








            </div> : 
  
                    <div className='  vh-100 d-flex justify-content-center  mt-5 '>  < Puff
                         visible={true}
                       height="80"
                         width="80"
                       color="#000000"
                     ariaLabel="puff-loading"
                        wrapperStyle={{}}
                     wrapperClass=""
                       />      </div>  
  
           }
  </>
}
