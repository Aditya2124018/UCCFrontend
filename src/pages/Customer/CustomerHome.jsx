import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import sliderimage from '../../assets/images/slider-img.png';
import CustomerSidebar from './CustomerSidebar';
import Footer from '../../components/Footer';
import ProductsAndServices from './ProductsAndServices';

function CustomerHome() {
  const navigate = useNavigate()
    const uname = localStorage.getItem("uname")
    React.useEffect(()=>{
      if(!localStorage.getItem("token")){
        navigate("/")
      }
    })
  return (
    <div>
        <CustomerSidebar/>
        <div className="hero_area">
      <section className="slider_section ">
        <div className="container ">
      
          <div className="row">
            <div className="col-md-6 ">
              <div className="detail-box">
                <h1 className='text-3xl lg:text-4xl xl:text-4xl'>
                Hi, {uname}!  <br/>
                How can we make <br/>
                your day easier?
                </h1>
                <p>
                Browse our range of services and products designed to fit your needs.
                 We are here to make finding the right solution as easy and seamless as possible.
                </p>
                <Link to="">
                  View Services
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="img-box">
                <img src={sliderimage} alt=""></img>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
    {/* Products And Services Section */}
    <ProductsAndServices/>

    

    {/* Myorders Section */}
    <div className="heading_container heading_center">
      <h2 className="m-4 text-3xl text-transparent bg-clip-text bg-gradient-to-r to-orange-500 from-blue-500">My Orders </h2>
      <span className='text-2xl'>Not yet</span>
    </div>

    <Footer/>
    </div>
  )
}

export default CustomerHome