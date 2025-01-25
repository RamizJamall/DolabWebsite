import { useFormik } from 'formik'
import React, { useContext, useEffect } from 'react'
import toast from 'react-hot-toast';
import { cartContext } from '../../context/Cart';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {

         let details={
            details: "",
            phone: "",
            city: "", 
            method: ""
         }
       
    



      const { getCartId ,  getCartInfo , getProducts}    =    useContext(cartContext);
   


 const det=       useFormik({
             initialValues: details,
                 onSubmit: async  function(values){

                    let detil = {
                   shippingAddress:{
                          details: values.details,
                             phone: values.phone,
                               city: values.city
                                    }
                            

                    }
              
              if(values.method === "cash"){


                   try{
                     const data  = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${getCartId}`, detil ,{


                        headers:{token :localStorage.getItem('tkn')}
                       } ) 
                       toast.success("thank you bank masr");
                    
                       getCartInfo();




                   } catch(e){


                    console.log(e)
                   }
                    
           
                }else{
                   
                   
                   
                    try{
                        const data  = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${getCartId}`, detil ,{
   
   
                           headers:{token :localStorage.getItem('tkn')}
                          },{
                            params:{ url:"http://localhost:3000"}
                          }
                        ) 


                          toast.success("thank you bank masr");
                             window.open(data.data.session.url, '_blank');
                          getCartInfo();
   
   
                          
   
                      } catch(e){
   
   
                       console.log(e)
                      }
                   
                   
                   
                   
                
                }
            }
                ,
                validate: function(values){
                    let errors ={};
                      if(values.method === "disabled" || values.method === "" ){

                              
                        errors.method = "please select payment method";
                          
                      }
                      if (  ! values.phone.match(/^(02)?01[0125][0-9]{8}$/) ){

                        errors.phone = "please add phone correct"
          
                       }


                      return errors

                }


                 
       

            
        
                 } );


     





  return <>
  
         <div className="container ">
                 
                 
                    <form onSubmit={ det.handleSubmit} className=' d-flex justify-content-center flex-column '>
                    <div className="row ">

                        <div className='col-md-6'>
                         <h2>Delivery :</h2>
                       <div className='form-group'>
                       <label className='h4' htmlFor='details'> Details </label>
                       <input placeholder="Details" onChange={det.handleChange} value={det.values.details} className='input-group' type="text"  id='details'    />
                       </div> 
                       <div className='form-group'> 
                       <label className='h4' htmlFor='phone'> Phone </label>
                       <input  placeholder="phone" onChange={det.handleChange} value={det.values.phone}  id='phone' className=' input-group' type="tel" />
                       </div>
                       <div className='form-group'>
                       <label className='h4' htmlFor='city'> City </label>
                       <input placeholder="City" onChange={det.handleChange} id='city'  value={det.values.city}  className=' input-group' type="text" />
                       </div>
                       </div>


                       <div className='col-md-6 mt-4 d-flex flex-column'>
                        <h2>Payment:</h2>
                        <select  name='method'   className="  m-2 form-select w-50" aria-label="Payment method"  onChange={det.handleChange}  value={det.values.method}  >
                         <option value="disabled">
                             Select Payment Method
                                 </option>
                                <option value="cash">Cash on Delivery</option>
                                <option value="credit">By Credit</option>
                          </select>   
                              
                                   <button  disabled={ !det.isValid || !det.dirty || getProducts?.length === 0  }    type="submit"  className=' m-2 btn btn-danger'>CHECK OUT</button>
                            
 
                              </div>
                              </div>  



                       </form>
                       
                 
                       </div>
                   
  
  
  
  
  
  
  
  
  </>
}
