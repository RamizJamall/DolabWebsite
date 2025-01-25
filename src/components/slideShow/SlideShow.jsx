import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function () {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    cssEase: "linear"
      };

  return <>

  <Slider {...settings}>
      <div>
       <img style={{width:"100%" , height:"500px"}} src={require('../../images/slideshow.png')} alt="" />
      </div>
      <div>
      <img   style={{width:"100%" , height:"500px"}} src={require('../../images/slideshow.png')} alt="" />
      </div>
     
    </Slider>
  </>
}
