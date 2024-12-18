import React, { useContext } from 'react'
import { AppContext } from '../../context/Contexts';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';

export default function Checkout() {
  // Example usage
  const navigate = useNavigate()
  const [user, setUser] = React.useState([])
  const [item, setItem] = React.useState([])
  const {api} = useContext(AppContext)
  const itemid = useLocation()
  const [isPending, setIsPending] = React.useState(false)
  const placeorder =async()=>{
    setIsPending(true)
    try {
        const payload = {
            user_id:localStorage.getItem("uid"),
            item_id:item._id,
            order_status:"Pending",
            payment_status:"Pending"
          }
          const response = await api.post("/order/create",payload,{
            headers :{
              Authorization:`Bearer ${localStorage.getItem("token")}`
            }
          })
          console.log(response)
        if(response.status==200){
            navigate("/orderconfirm")
            toast.success("Order Placed Successfully.")
        }
    } catch (error) {
        if(error.status === 401){
            localStorage.clear()
            navigate("/login")
          }else{
            toast.error(error.message)
          }
    }
    setIsPending(false)
  }
  React.useEffect(()=>{
    (async()=>{
      setIsPending(true)
        try{
          const payload = {
            uid:localStorage.getItem('uid'),
            itemid:itemid.state
          }
            const data = await api.post("/getdetails",payload,{
              headers :{
                Authorization:`Bearer ${localStorage.getItem("token")}`
              }
            })
            console.log(data)
            setUser(data.data.user)
            setItem(data.data.item)
        }catch(error){
            console.log(error)
        }
        setIsPending(false)
    })()
    //eslint-disable-next-line
  },[])
  
    
  
    return (
      <>
      {isPending? <Loader/> :<div className="min-h-screen bg-base-200 p-6 flex items-center justify-center">
      
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <h2 className="text-3xl font-bold mb-4 text-center text-primary">Order Summary</h2>
  
          {/* Customer Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-secondary mb-2">Customer Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm">Name:</p>
                <p className="text-lg font-medium">{user.fname+" "+user.lname}</p>
              </div>
              <div>
                <p className="text-sm">Email:</p>
                <p className="text-lg font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm">Mobile:</p>
                <p className="text-lg font-medium">{user.mobile}</p>
              </div>
              <div>
                <p className="text-sm">Address:</p>
                <p className="text-lg font-medium">{user.address}</p>
              </div>
            </div>
          </div>
  
          {/* Item Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-secondary mb-2">Item Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm">Item Name:</p>
                <p className="text-lg font-medium">{item.name}</p>
              </div>
              <div>
                <p className="text-sm">Item Type:</p>
                <p className="text-lg font-medium">{item.type}</p>
              </div>
              <div>
                <p className="text-sm">Item Price:</p>
                <p className="text-lg font-medium">₹{item.price}</p>
              </div>
            </div>
          </div>
  
          {/* Summary */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-secondary mb-2">Payment Summary</h3>
            <div className="flex justify-between">
              <p className="text-sm">Payment Method:</p>
              <p className="text-sm">Pay on Delivery</p>
            </div>
            
            <div className="flex justify-between mt-2">
              <p className="text-lg">Total Payable:</p>
              <p className="text-lg font-bold text-primary">₹{item.price}</p>
            </div>

          </div>
  
          <button
            className="btn btn-primary w-full"
            onClick={placeorder}
          >
            Place Order
          </button>
          <button className="w-full btn btn-outline font-thin text-lg mt-2" onClick={()=>navigate(-1)}>Back</button>
        </div>
      </div>}
      </>
    );
  };
  
  

