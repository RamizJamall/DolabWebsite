import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { FallingLines, Puff } from 'react-loader-spinner';
import SlideShow from '../slideShow/SlideShow';
import { useQuery } from '@tanstack/react-query';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { cartContext } from '../../context/Cart';
import toast from 'react-hot-toast';


export default function Products() {



  const {addToCart}  =  useContext( cartContext); 
    const [load, setLoad] =useState(false);
    const [loadp, setLoadp] =useState(false);

  async function addCart(id ){
        
      if( localStorage.length !== 0){
         setLoadp(id);
       setLoad(true);
      const res =   await  addToCart(id) ; 
    
      if (res.status === "success"){   
       
               toast.success( res.message );
               setLoad(false);
      }
      else{
        toast.error("try again later")

      }
    }else{

      toast.error("Please Login To Add To Cart")
    }

 }




        
 function getproducts(){
  

    return axios.get('https://ecommerce.routemisr.com/api/v1/products') 

  }
           
         const { isLoading , data } = useQuery({
                   queryKey: ['product'], // Pass the query key as an array
                   queryFn: getproducts,  // Pass the query function
                });

            

     if(isLoading){

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
  
       <div className=' container'>
            <SlideShow/>
          <div className="row mt-4 mb-4  ">

                {  data?.data.data.map(function(product, idx){ return  <div key={idx} className="  col-lg-2   col-md-4 col-6  p-2 ">
                    


                    <div className=" d-flex flex-column  justify-content-between  align-items-center  h-100" >
                    <Link to={`/productd/${ product.id }`}  >
                              <div className='  d-flex flex-column  justify-content-between  align-items-center h-100 '>
                    <img src={product.images[0]} alt="" className='  w-75 m-3  '   />

                    <h5  className=' text-center'>{product.title.split(' ').slice(0, 3).join(' ')}</h5>
                     <h6  className='  h5  text-danger  '>L.E {product.price }</h6>
                     </div>
                     </Link>
                     <button  onClick={function(){addCart (product.id )}}  className='btn btn-dark mt-2  pe-2 ps-2 '> { load && loadp===product.id ? <FallingLines
                                                                              color="#fff"
                                                                                  width="30px"
                                                                                    visible={true}
                                                                                    ariaLabel="falling-circles-loading"
                                                                                         />  : "+ Add to cart"    } </button>
                            </div>
                                         
                             
                            
                          </div>  
                          
                               })   
                    }

         </div>
       
        </div>
  
  </>
}
