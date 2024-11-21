// import React from 'react'
import about_img from '../assets/images/about-img.jpg'
import professional_img from "../assets/images/professional-img.png"
import "../App.css"
function AboutSection() {
  return (
    <div>{/* <!-- about section --> */}

    <section className="about_section layout_padding-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-6">
            <div className="detail-box">
              <h2 className='text-3xl'>
                About us
              </h2>
              <p>
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomisedThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised
              </p>
              <a href="">
                Read More
              </a>
            </div>
          </div>
          <div className="col-lg-7 col-md-6">
            <div className="img-box">
              <img src={about_img} alt=""></img>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    {/* <!-- end about section --> */}
  
  
    {/* <!-- professional section --> */}
  
    <section className="professional_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="img-box">
              <img src={professional_img} alt=""></img>
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="detail-box">
              <h2 className='text-4xl'>
                We Provide Professional <br/>
                Home Services.
              </h2>
              <p>
                randomised words which don&apost look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn&apost anything embarrassing hidden in the middle of text. All randomised words which don&apost look even slightly
              </p>
              <a href="">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  {/* 
    <!-- end professional section -->*/}
    </div>
  )
}

export default AboutSection