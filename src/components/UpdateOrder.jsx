import React, { useContext, useState } from 'react'
import {  useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/Contexts'
import { IoMdArrowRoundBack } from 'react-icons/io'
import toast from 'react-hot-toast'

function UpdateOrder() {
    const [formData, setFormdata] = React.useState({
        os:"Pending",
        ops:"Pending"
    })
    const [isPending, setIsPending] = useState(false)
    const Navigate = useNavigate()
    let order = useLocation()
    const {api} = useContext(AppContext)
    const setOrderData = ()=>{
        order = order.state
        console.log(order)
        setFormdata({
            os:order.order_status,
            ops:order.payment_status

        })
    }

   async function submitHandler(e){
        e.preventDefault()
        setIsPending(true)
        console.log(formData)
    try {
            const response = await api.put(`/order/update/${order.state._id}`,formData)
            if(response.status === 200){
                Navigate("/orders")
                toast.success(response.data.message)
            }
            console.log(response)
    
    } catch (error) {
        console.log(error)
        toast.error(error.data.message) 
        setIsPending(false)
    }        
    setIsPending(false)
    }

    function changeHandler(e){
        const {name, value} = e.target
        setFormdata(
            prevFormData => {
                return {
                    ...prevFormData,
                    [name] :  value
                }
    
            }
        )
    }
    React.useEffect(()=>{
        setOrderData()
        //eslint-disable-next-line
    },[])
  return (
    <div className="max-w-md mx-auto p-6 bg-white mt-8 lg:rounded-lg lg:shadow-md xl:rounded-lg xl:shadow-md">
        <h6 className="text-left text-xl" onClick={()=>Navigate(-1)}><IoMdArrowRoundBack /></h6>
        <h2 className="text-2xl font-bold mb-6 text-center">Update Order</h2>
        <form onSubmit={submitHandler}>
        <div>
          <label className="block text-sm font-medium mb-1">Order Status</label>
          <select
            name="os"
            value={formData.os}
            onChange={changeHandler}
            className="select select-bordered w-full mb-3"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Order Payment Status</label>
          <select
            name="ops"
            value={formData.ops}
            onChange={changeHandler}
            className="select select-bordered w-full mb-3"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button className="w-full bg-yellow-400 text-black font font-semibold py-2 mt-1 rounded-md"
        disabled={isPending}
        >{isPending?"Updating...":"Update" }</button>
        </form>
    </div>
  )
}

export default UpdateOrder