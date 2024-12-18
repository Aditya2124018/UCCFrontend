import React, { useContext } from "react";

import {  useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/Contexts";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
const ItemShowcase = () => {
    
    const {api} = useContext(AppContext)
    const {id} = useParams()
    const [itemdata, setItemData] = React.useState([])
    const navigate = useNavigate()
    const [isPending, setIsPending] = React.useState(false)
    React.useEffect(()=>{
        (async function(){
          setIsPending(true)
            try{
                const item = await api.get(`/getItems?id=${id}`,{
                    headers :{
                      Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                  })
                setItemData(item.data.data[0])
            }catch(error){
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
    
  return (
    <>
    
    {isPending? <Loader/> :<div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        {/* Image and Details Section */}
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center">
            <img
              src={itemdata.imageURL}
              alt={itemdata.name}
              className="rounded-md w-full h-auto max-h-96 object-contain"
            />
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
            {/* Name and Price */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{itemdata.name}</h1>
              <p className="text-2xl font-semibold text-green-600 mt-2">₹ {itemdata.price}/-</p>

              {/* Item Type */}
              <div className="mt-4">
                <span className="badge badge-outline">
                  {itemdata.type}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <p className="text-gray-600 leading-relaxed">{itemdata.description}</p>
            </div>

            {/* Action Button */}
            <div className="mt-8">
             {(itemdata.type == "Service")? <button className="w-full px-6 py-3 text-white bg-yellow-500 hover:bg-yellow-600 transition-all rounded-lg shadow-md text-lg" onClick={()=> navigate("/checkout",{state:itemdata._id})}>
                Request Service
              </button> :<button className="w-full px-6 py-3 text-white bg-green-600 hover:bg-green-700 transition-all rounded-lg shadow-md text-lg" onClick={()=> navigate("/checkout",{state:itemdata._id})}>
                Sell Now
              </button>}
            </div>
          </div>
        </div>
      </div>
    </div>}
    </>
  );
};

export default ItemShowcase;
