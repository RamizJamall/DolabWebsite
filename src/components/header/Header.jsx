import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../../context/Authentication'
import { cartContext } from '../../context/Cart'

export default function Header() {

  const {numCartItems} = useContext(cartContext);
  const {token , setToken} = useContext(authContext);
     const navLog = useNavigate();

          




  function logout(){

        setToken(null);
        localStorage.removeItem('tkn');
        navLog("/login");
  }


  return  <>

<nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/"><img src={require("../../images/dwlab.png")} alt="DWLab Logo" style={{ width: '150px', height: 'auto' }}    /></Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/products" >Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link  active" to="">Link</Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle active"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/">Electronics</Link></li>
                <li><Link className="dropdown-item" to="/">Men's Fashion</Link></li>
                <li><Link className="dropdown-item" to="/">Women's Fashion</Link></li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2 d-none" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-dark d-none" type="submit">Search</button>
          </form>

          <div   className=' d-flex'>
           
         { !token ? <>
          <div className=' d-flex justify-content-between'>
          <div>
          <span >  <Link className="nav-link pe-2" to="/login">Login</Link></span>

          </div>
          <div>
          <span >   <Link className="nav-link pe-2" to="/register">Register</Link></span>
          </div>
          </div>
         </>  :  <>
         <div className=' d-flex justify-content-between'>
         <div>
         <span > <Link className="nav-link pe-2" to="/profile">Profile</Link></span>
          </div>

          <div>
          <span className="nav-link pe-2" style={{cursor:'pointer'}}  onClick={logout}>logout</span>
          </div>
         
          <div>
         <span className=' position-relative' > <Link className="nav-link pe-2" to="/cart"><img    src={require("../../assets/icons/cart.png")} style={{width:"20px"}} alt="" /></Link>
         
         <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {numCartItems}
                 
                   </span>
         </span>
          </div>
          </div>
         </>}
          </div>
        </div>
      </div>
    </nav>
      
  
  
  </>
}



