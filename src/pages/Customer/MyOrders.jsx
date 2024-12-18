import { useContext, useEffect, useState } from "react";
import OrderCard from "../../components/OrderCard";
import CustomerSidebar from "./CustomerSidebar"
import { AppContext } from "../../context/Contexts";
import Footer from "../../components/Footer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
 function MyOrders(){
    const {api} = useContext(AppContext)
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()
    const [isPending, setIsPending] = useState(false)
    useEffect(()=>{
        (async()=>{
            setIsPending(true)
            try {
                const order = await api.get(`/userorder?id=${localStorage.getItem('uid')}`,{
                    headers :{
                      Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                  })
                console.log(order.data.order)
                setOrders(order.data.order)
            } catch (error) {
                if(error.status === 401){
                    localStorage.clear()
                    navigate("/login")
                  }else{
                    toast.error(error.response.data.message)
                  }
            }
            setIsPending(false)
        })()
        //eslint-disable-next-line
    },[])
    return(
        <div>
        <CustomerSidebar/>
        {isPending?<Loader/>:<div className="mt-14 mb-14">
        <h1 className="text-xl text-center">MY ORDERS</h1>
        {(orders.length < 1)? (<h1 className="text-lg text-center my-36">No Orders Yet! </h1>):
            orders.map((order, index)=>{
                return <OrderCard key={index} order={order}/>
            })
        }
        </div>}
        <Footer/>
        </div>
    );
 };
export default MyOrders