import React, { useContext, useEffect,useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ProductCard from '../../components/ProductCard';
import { AppContext } from '../../context/Contexts';
function ProductsAndServices() {
    const {api,isloading, setisLoading} = useContext(AppContext)
    const [products, setProducts] = useState([])
    const [services, setServices] = useState([])

  const options = {
    loop: true,
      margin: 10,
      dots: false,
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
              items: 4
          }
      }
  }
  
  
  useEffect(()=>{
    async function getItems(){
      setisLoading(true)
    try {
      const {data} = await api.get(`/home`)
     
      

        setServices(data.services)
        setProducts(data.products)
        setisLoading(false)
    } catch (error) {
      console.log(error)
    }
    
  }
    getItems()
    
  },[])
  // useEffect(()=>{
  //   console.log(services)
  // },[services])
  return (
    <div>
        <div className="heading_container heading_center mx-auto">
      <h2 className="m-4 text-3xl text-transparent bg-clip-text bg-gradient-to-r to-orange-500 from-blue-500"> Services </h2>
      <div className="container">
      {(!isloading)?(
        <OwlCarousel
        className="owl-theme"
        {...options}
        nav
        navText={[
           '<i class="fa fa-long-arrow-left" style="focus:{outline:none}" aria-hidden="true"></i>',
              '<i class="fa fa-long-arrow-right" style="focus:{outline:none}" aria-hidden="true"></i>'
        ]}
        >{
          
        }
          {services.map((item)=>{

      return (<div className='w-full flex justify-center' key={item._id}>
      <ProductCard item={item}/>
      </div>)
          })

          }
      
      
        </OwlCarousel>
      ):(<p>Loading..</p>)}
      </div>
      <div className="heading_container heading_center">
      <h2 className="m-4 text-3xl text-transparent bg-clip-text bg-gradient-to-r to-orange-500 from-blue-500">Products </h2>
    </div>
      <div className="container">
      {(!isloading)?(
        <OwlCarousel
        className="owl-theme"
        {...options}
        nav
        navText={[
           '<i class="fa fa-long-arrow-left" style="focus:{outline:none}" aria-hidden="true"></i>',
              '<i class="fa fa-long-arrow-right" style="focus:{outline:none}" aria-hidden="true"></i>'
        ]}
        >{
          
        }
          {products.map((item)=>{

      return (<div className='w-full flex justify-center' key={item._id}>
      <ProductCard item={item}/>
      </div>)
          })

          }
      
      
        </OwlCarousel>
      ):(<p>Loading..</p>)}
      </div>
    </div>
    </div>
  )
}

export default ProductsAndServices