import axios from "axios";
import { Children, createContext, useEffect, useState } from "react";

 export const cartContext = createContext();
 
 export function CartProvider({ children }){


         const [numCartItems,setNumCart] = useState(0);
         const [cartPrice,setCartPrice] = useState(0);
         const [getProducts , setProducts] = useState(null);
         const [getCartId , setCartId] = useState(null);

         async function updateCount(proId, proCount ){

            


            try{
                const { data }  =    await axios.put( `https://ecommerce.routemisr.com/api/v1/cart/${proId}`,{
                                  
                                 
                                     "count": proCount
                                

                            },{
    
                                headers:{token :localStorage.getItem('tkn')}
    
                          })

                                
                          setNumCart(data.numOfCartItems);
                               setCartPrice(data.data.totalCartPrice )
                               setProducts(data.data.products);
                         return data;
    
                 }catch(e){
                    console.log(e.response.data.message)
                 }

         }


     
            async function getCartInfo(){

                try{
                    const { data }  =    await axios.get( 'https://ecommerce.routemisr.com/api/v1/cart' ,{
        
                                    headers:{token :localStorage.getItem('tkn')}
        
                              })

                                   setNumCart(data.numOfCartItems);
                                   setProducts(data.data.products);
                                   setCartPrice(data.data.totalCartPrice );
                                   setCartId(data.cartId); 
                                
                             return data;
        
                     }catch(e){
                        console.log(e.response.data.message)
                     }


              }


            async function removeItem(proId){

            
                try{
                    const { data }  =    await axios.delete( `https://ecommerce.routemisr.com/api/v1/cart/${proId}` ,{
        
                                    headers:{token :localStorage.getItem('tkn')}
        
                              })
                              setNumCart(data.numOfCartItems);
                              setProducts(data.data.products);
                              setCartPrice(data.data.totalCartPrice )
                            
                             return data;
        
                     }catch(e){
                        console.log(e)
                     }


            }


           async function addToCart(proId){
               
                   try{
            const { data }  =    await axios.post( 'https://ecommerce.routemisr.com/api/v1/cart' , {
                         "productId": proId  } ,{

                            headers:{token :localStorage.getItem('tkn')}

                      })
                      getCartInfo();
                  
                     return data;

             }catch(e){
                console.log(e)
             }
            }
 
        useEffect(function(){
               
            getCartInfo();


        },[])







   return  <cartContext.Provider  value={{ getCartId,getCartInfo,  addToCart , numCartItems ,cartPrice , getProducts ,removeItem , updateCount }}>

     {children}



   </cartContext.Provider>




 }