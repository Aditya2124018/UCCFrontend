import "../App.css"
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import client_1 from "../assets/images/client-1.jpg"
import client_2 from "../assets/images/client-2.jpg"
function ClientSection() {
    const options = {
        loop: true,
          margin: 10,
          nav: true,
          dots: false,
          navText: [
              '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
              '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'
          ],
          autoplay: true,
          autoplayHoverPause: true,
          responsive: {
              0: {
                  items: 1
              },
              768: {
                  items: 2
              },
              1000: {
                  items: 2
              }
          }
      }
      
  return (
    <div>
        {/* <!-- client section --> */}

  <section className="client_section ">
    <div className="container">
      <div className="heading_container heading_center">
        <h2 className="text-3xl">
          What Our Clients Say
        </h2>
      </div>
      <div className="carousel-wrap layout_padding2-top ">
        <OwlCarousel className="owl-carousel" {...options}>
          <div className="item">
            <div className="box">
              <div className="client_id">
                <div className="img-box">
                  <img src={client_1} alt="" loading="lazy"></img>
                </div>
                <div className="client_detail">
                  <div className="client_info">
                    <h6>
                      Aditya
                    </h6>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    {/* <i className="fa fa-star" aria-hidden="true"></i> */}
                  </div>
                  <i className="fa fa-quote-left" aria-hidden="true"></i>
                </div>
              </div>
              <div className="client_text">
                <p>
                  chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum
                </p>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="box">
              <div className="client_id">
                <div className="img-box">
                  <img src={client_2} alt="" loading="lazy"></img>
                </div>
                <div className="client_detail">
                  <div className="client_info">
                    <h6>
                     Gaurav
                    </h6>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    {/* <i className="fa fa-star" aria-hidden="true"></i> */}
                  </div>
                  <i className="fa fa-quote-left" aria-hidden="true"></i>
                </div>
              </div>
              <div className="client_text">
                <p>
                  chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum
                </p>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="box">
              <div className="client_id">
                <div className="img-box">
                  <img src={client_1} alt="" loading="lazy"></img>
                </div>
                <div className="client_detail">
                  <div className="client_info">
                    <h6>
                     deepak
                    </h6>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    {/* <i className="fa fa-star" aria-hidden="true"></i> */}
                  </div>
                  <i className="fa fa-quote-left" aria-hidden="true"></i>
                </div>
              </div>
              <div className="client_text">
                <p>
                  chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum
                </p>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="box">
              <div className="client_id">
                <div className="img-box">
                  <img src={client_2} alt="" loading="lazy"></img>
                </div>
                <div className="client_detail">
                  <div className="client_info">
                    <h6>
                     harsh
                    </h6>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    {/* <i className="fa fa-star" aria-hidden="true"></i> */}
                  </div>
                  <i className="fa fa-quote-left" aria-hidden="true"></i>
                </div>
              </div>
              <div className="client_text">
                <p>
                  chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum
                </p>
              </div>
            </div>
          </div>
        </OwlCarousel>
      </div>
    </div>
  </section>
{/* 
  <!-- end client section -->*/}
    </div>
  )
}

export default ClientSection