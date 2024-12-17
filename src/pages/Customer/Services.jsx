import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/Contexts'
import CustomerSidebar from './CustomerSidebar'
import ProductCard from '../../components/ProductCard'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import toast from 'react-hot-toast'
import Loader from '../../components/Loader'

export default function Services() {
    const {api} = useContext(AppContext)
    const [services, setServices] = React.useState([])
    const navigate = useNavigate()
    const [isPending, setIsPending] = useState(false)
    React.useEffect(()=>{
        (async function(){
          setIsPending(true)
            try {
            const services = await api.get("/services",{
                headers :{
                  Authorization:`Bearer ${localStorage.getItem("token")}`
                }
              })
            setServices(services.data.services)
            console.log(services)
            } catch (error) {
                if(error.status === 401){
                    localStorage.clear()
                    navigate("/login")
                  }else{
                    toast.error(error.response.data.message)
                  }   
            }
            setIsPending(false)
        }())
        //eslint-disable-next-line
    },[])
  return (
    <div>
        <CustomerSidebar/>
        {isPending? <Loader/> :<div>
        <h1 className="mt-16 text-center text-2xl"> SERVICES </h1>
        <div className='grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 md:justify-center lg:grid-cols-3 lg:justify-start p-4 lg:ml-64 mt-5'>
            { (services.length < 1)?(<h1 className="text-lg text-center">No Services Added Yet! </h1>) :
                services.map((service, index)=>{
                    return <div key={index} >
                        <Link to={`/showcase/${service._id}`}
                    className='decoration-neutral'
                    style={{color:'black'}}
                  > 
                    <ProductCard item={service}/>
                    </Link>
                    </div>
                })
            }
        </div>
        </div>}
        <Footer/>
    </div>
  )
}
