import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { authContext } from '../../context/Authentication'
import { cartContext } from '../../context/Cart'

export default function Login() {

  const {getCartInfo}   =     useContext(cartContext);

   let userLog= {

     email:"",
     password:""
   }

     const {token , setToken} =    useContext(authContext);
   const [errMsg ,SetErrMsg ] =  useState(null)
      const [sucMsg ,SetSucMsg ] =  useState(null)
      const nav =   useNavigate();
  const ver =  useFormik({
           
      
         initialValues : userLog,
        onSubmit: async  function(values){
            try{

              const {data} = await axios.post( 'https://ecommerce.routemisr.com/api/v1/auth/signin'   , values)
             
               if (data.message === "success"){

                SetSucMsg("welcome back");
                setTimeout(function(){
                  nav("/products");
                 
                  setToken(data.token);
                  localStorage.setItem('tkn', data.token);
                  getCartInfo();
                }, 1000)
            

               }



          
            } catch (err){

              SetErrMsg(err.response.data.message);
            }  

        },
       validate: function(values){
               

           let errors ={};
           SetErrMsg(null);
           SetSucMsg(null);
           if ( ! values.email.includes("@") || values.email.indexOf(".",  values.email.indexOf("@")) < values.email.indexOf("@") + 2 || values.email.includes(" ") || values.email.lastIndexOf(".") >= values.email.length - 1){


                  errors.email = "email have a problem"
           }
                  
           if ( values.password.length < 6 || values.password.length > 12){
    
            errors.password = "please add password correct"

           }

          return errors
       }
 




  })







  return <>
 <form className=' container  d-flex flex-column  w-75     p-5 gap-3'  onSubmit={ver.handleSubmit} >
 {  errMsg ? <div className="alert  alert-dark  mt-2 mb-0 p-2"> {errMsg}</div>  : ""   }
  {  sucMsg ? <div className="alert   alert-success  mt-2 mb-0 p-2"> {sucMsg}</div>  : ""   }
  <h2>Login Now:</h2>



  <div className="form-group ">
    <label htmlFor="exampleInputEmail1">Email address :</label>
    <input   name='email'     onChange={ver.handleChange}       value={ver.values.email}        type="email" className="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
    { ver.errors.email && ver.touched.email &&  ver.values.email ? <div className="alert  alert-dark  mt-2 mb-0 p-2"> { ver.errors.email }</div>  : ""   }
  </div>

  <div className="form-group ">
    <label htmlFor="exampleInputPassword1">Password:</label>
    <input   name='password'     onChange={ver.handleChange}      value={ver.values.password}      type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
    {  ver.errors.password  && ver.touched.password  ? <div className="alert  alert-dark  mt-2 mb-0 p-2"> { ver.errors.password }</div>  : ""   }
  </div>

<div className=' d-flex justify-content-end   '>
<button type="submit"   disabled={ !ver.isValid || !ver.dirty}        className="btn btn-dark  p-2  ">Login</button>
</div>


</form>
  
  
  
  
  
  </>
}
