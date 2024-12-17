import "../../App.css"
import React, { useContext, useEffect,useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ProductCard from '../../components/ProductCard';
import { AppContext } from '../../context/Contexts';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function ProductsAndServices() {
    const {api} = useContext(AppContext)
    const [products, setProducts] = useState([])
    const [services, setServices] = useState([])
    const [isPending, setIsPending] = useState(false)
    const navigate = useNavigate()
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
      setIsPending(true)
    try {
      const {data} = await api.get(`/home`,{
        headers :{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
     
      

        setServices(data.services)
        setProducts(data.products)
       
    } catch (error) {
      if(error.status === 401){
        localStorage.clear()
        navigate("/login")
      }else{
        toast.error(error.response.data.message)
      }
    }
    setIsPending(false)
  }
    getItems()
    //eslint-disable-next-line
  },[])
  
  return (
    <div>
        <div className="heading_container heading_center mx-auto">
      <h2 className="m-4 text-3xl text-transparent bg-clip-text bg-gradient-to-r to-orange-500 from-blue-500"> Services </h2>
      <div className="container">
      {(!isPending)?(
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
        <Link to={`/showcase/${item._id}`}
          className='decoration-neutral'
          style={{color:'black'}}
        >
      <ProductCard item={item}/>
      </Link>
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
      {(!isPending)?(
        <OwlCarousel
        className="owl-theme"
        {...options}
        nav
        navText={[
           '<i class="fa fa-long-arrow-left" style="outline:none" aria-hidden="true"></i>',
              '<i class="fa fa-long-arrow-right" style="outline:none" aria-hidden="true"></i>'
        ]}
        >{
          
        }
          {products.map((item)=>{

      return (<div className='w-full flex justify-center' key={item._id}>
         <Link to={`/showcase/${item._id}`}
          className='decoration-neutral'
          style={{color:'black'}}
        >

      <ProductCard item={item}/>
        </Link>
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