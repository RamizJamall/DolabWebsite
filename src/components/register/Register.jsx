import axios from 'axios'
import { Formik, useFormik, withFormik } from 'formik'
import { error } from 'jquery'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {



    let user ={

         name :"",
         email :" ",
         password :"",
         rePassword:"",
         phone:""



    }
      const [errMsg ,SetErrMsg ] =  useState(null)
      const [sucMsg ,SetSucMsg ] =  useState(null)
   const nav =   useNavigate();

  const reslt = useFormik({

          


          initialValues : user,





          onSubmit: async function(values){
            console.log(values)
            console.log(values.password)
            console.log(values.rePassword)

         try{

          const {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values )

          console.log(data.message)
          let vals = data.message;
          SetSucMsg(vals);

            setTimeout(function(){
              nav("/login");

            }, 3000)
          
        

         }catch(err){

          console.log(err.response.data.message)
           let val = err.response.data.message;
           SetErrMsg(val);
         }
        
       
                
      
                        
       
     

          },

          validate: function(values){

            const errors ={};
            SetErrMsg(null);
            SetSucMsg(null);
            if (values.name.length < 4 || values.name.length > 14){

                  errors.name = "please add name correct"

            }
              
            if ( ! values.email.includes("@") || values.email.indexOf(".",  values.email.indexOf("@")) < values.email.indexOf("@") + 2 || values.email.includes(" ") || values.email.lastIndexOf(".") >= values.email.length - 1 ){

              errors.email = "please add email correct"

             }

             if ( values.password.length < 6 || values.password.length > 12){

              errors.password = "please add password correct"

             }
            
             if (  values.rePassword !== values.password ){

              errors.rePassword = "please add repassword correct"

             }

             if (  ! values.phone.match(/^(02)?01[0125][0-9]{8}$/) ){

              errors.phone = "please add phone correct"

             }



             


            return errors;

          }




       })








  return <>
                                                                        

  <form className=' container  d-flex flex-column  w-50   p-5 gap-3'  onSubmit={  reslt.handleSubmit }   >
  {  errMsg ? <div className="alert  alert-dark  mt-2 mb-0 p-2"> {errMsg}</div>  : ""   }
  {  sucMsg ? <div className="alert   alert-success  mt-2 mb-0 p-2"> {sucMsg}</div>  : ""   }
  <h2>Register Now:</h2>

  <div className="form-group ">
    <label htmlFor="name">Name :</label>
    <input     onBlur={reslt.handleBlur}    onChange={reslt.handleChange }     value={reslt.values.name}      type="text" className="form-control " id="name"  placeholder="Enter name" />
     {  reslt.errors.name  && reslt.touched.name ? <div className="alert  alert-dark  mt-2 mb-0 p-2"> { reslt.errors.name }</div>  : ""   }
  </div>


  <div className="form-group ">
    <label htmlFor="exampleInputEmail1">Email address :</label>
    <input   onBlur={reslt.handleBlur}   name="email"           onChange={reslt.handleChange}     value={reslt.values.email}  type="email" className="form-control " id="exampleInputEmail1"  placeholder="Enter email" />
    { reslt.errors.email && reslt.touched.email &&  reslt.values.email ? <div className="alert  alert-dark  mt-2 mb-0 p-2"> { reslt.errors.email }</div>  : ""   }
   
  </div>

  <div className="form-group ">
    <label htmlFor="exampleInputPassword1">Password:</label>
    <input   onBlur={reslt.handleBlur}        name="password"          onChange={reslt.handleChange}     value={reslt.values.password}    type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
    {  reslt.errors.password  && reslt.touched.password  ? <div className="alert  alert-dark  mt-2 mb-0 p-2"> { reslt.errors.password }</div>  : ""   }
  </div>
  <div className="form-group ">
    <label htmlFor="exampleInputPassword2">rePassword:</label>
    <input     onBlur={reslt.handleBlur}  name="rePassword"          onChange={reslt.handleChange}     value={reslt.values.rePassword}  type="password" className="form-control" id="exampleInputPassword2" placeholder="rePassword" />
    {  reslt.errors.rePassword  && reslt.touched.rePassword ? <div className="alert  alert-dark  mt-2 mb-0 p-2"> { reslt.errors.rePassword }</div>  : ""   }
  </div>
  <div className="form-group ">
    <label htmlFor="phone">Phone:</label>
    <input   onBlur={reslt.handleBlur}      onChange={reslt.handleChange}     value={reslt.values.phone}  type="tel" className="form-control" id="phone" placeholder="phone" />
    {  reslt.errors.phone  && reslt.touched.phone  ? <div className="alert  alert-dark  mt-2 mb-0 p-2"> { reslt.errors.phone }</div>  : ""   }
  </div>

<div className=' d-flex justify-content-end   '>
<button type="submit"  disabled={ !reslt.isValid || !reslt.dirty  }     className="btn btn-dark ps-3 pe-3  ">Register</button>
</div>

</form>
  </>
}
