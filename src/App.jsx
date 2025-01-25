import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Products from './components/products/Products';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { AuthProvider } from './context/Authentication';
import Profile from './components/profile/Profile';
import Test from './components/test/Test';
import Cart from './components/cart/Cart';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductDetails from './components/products/ProductDetails';
import ScrollToTop from './components/scrollUp/ScrollToTop';
import { CartProvider } from './context/Cart';
import { Toaster } from 'react-hot-toast';
import Checkout from './components/checkout/Checkout';



const myRouter =   createHashRouter([
   

  {path: "/",  element: 
    <>
  <ScrollToTop/>
    <Layout/> 
    </>
  , children :[

      {index: true , element : <Products/>},
      {path: "products" , element : <Products/>},
      {path: "login" , element :  <Login/>  },
      {path: "profile" , element :<Test> <Profile/></Test>   },
      {path: "cart" , element :<Test> <Cart/></Test> },
      {path: "register" , element :  <Register/>  },
      {path: "checkout" , element :  <Checkout/>  },
      {path: "productd/:id" , element :  <ProductDetails/>  },



  ] }


])


function App() {
  
 

      let clientQuery = new QueryClient( );

  return <>
  
    
   <QueryClientProvider  client={clientQuery}>
    <CartProvider>
      <AuthProvider>
      <Toaster />
     <RouterProvider router={myRouter}/>
     </AuthProvider>
  </CartProvider>
  </QueryClientProvider>
  </>
}

export default App;
