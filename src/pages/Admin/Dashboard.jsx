// import React from 'react';

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/Contexts";
import AdminSidebar from "./AdminSidebar";
import { FaUsers } from "react-icons/fa";
import { MdHomeRepairService } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
const Dashboard = () => {
    const navigate = useNavigate()
    const {api,isOpen,getDate}= useContext(AppContext)
    const [userCount,setuserCount] = useState(0)
    const [orderCount,setorderCount] = useState(0)
    const [productCount,setproductCount] = useState(0)
    const [serviceCount,setserviceCount] = useState(0)
    const [latestOrders,setlatestOrder] = useState([])
    const [latestUsers,setlatestUsers] = useState([])
    const [userData, setuserData] = useState([])
    const [orderData, setorderData] = useState([])
    const [orderDataLoading,setorderDataLoading] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const fetchDashboardData = async () => {
      setIsPending(true)
        try{
            const { data } = await api.get("/getdashboard",{
              headers :{
                Authorization:`Bearer ${localStorage.getItem("token")}`
              }
            })
        console.log(data.latestOrders)
         setuserCount(data.userCount);
         setproductCount(data.productCount);
         setorderCount(data.orderCount);
         setserviceCount(data.serviceCount);
         setlatestOrder(data.latestOrders)
         setlatestUsers(data.latestUsers)
        }catch(error){
            if(error.status === 401){
              localStorage.clear()
              navigate("/login")
            }else{
              toast.error(error.response.data.message)
            }
        }
        setIsPending(false)
      };

      


      useEffect(()=>{
        fetchDashboardData()
        // setInterval(fetchDashboardData,5000)
        
        //eslint-disable-next-line
      },[])
   
    // function getDate(str){
    //   return str.split('T')[0]
    // }

   
  return (
    <div>
   
    <AdminSidebar/>

    {isPending?<Loader/> :<div className={`min-h-screen bg-gray-100 p-5 flex-1 lg:ml-64 ${!isOpen ? 'lg:ml-64 xl:ml-64' : ''} p-5`}>
      <header className="text-2xl font-bold text-secondary mb-6">Admin Dashboard</header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Products Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between border-l-4 border-secondary">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Products </h3>
            <p className="text-2xl font-bold text-secondary">{productCount}</p>
          </div>
          <div className="text-secondary text-5xl"><FaBoxOpen /></div>
        </div>

        {/* Users Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between border-l-4 border-primary">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Users</h3>
            <p className="text-2xl font-bold text-primary">{userCount}</p>
          </div>
          <div className="text-primary text-5xl"><FaUsers /></div>
        </div>

        {/* Services Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between border-l-4 border-secondary">
          <div>
            <h3 className="text-lg font-semibold text-gray-700"> Services</h3>
            <p className="text-2xl font-bold text-secondary">{serviceCount}</p>
          </div>
          <div className="text-secondary text-5xl"><MdHomeRepairService /></div>
        </div>

        {/* Orders Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between border-l-4 border-primary">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Orders</h3>
            <p className="text-2xl font-bold text-primary">{orderCount}</p>
          </div>
          <div className="text-primary text-5xl"><FaShoppingCart />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
        {/* Recent */}
     <div className="flex flex-col items-center">
        <div className="w-80 badge badge-neutral badge-outline m-4 p-3">Recent Orders</div>

     {(latestOrders.length < 1)?<h1 className="text-center text-xl">No Recent Orders.</h1> :<div className="overflow-x-auto">
  <table className=" table table-zebra text-center">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Customer Name</th>
        <th>Item Name</th>
        <th>Order Status</th>
        <th>View More</th>
      </tr>
    </thead>
    <tbody>
      {/* rows */}
      {latestOrders.map((order,index)=>{
        return  (<tr key={index}>
        <th>{index+1}</th>
        <td>{order.user.fname}</td>
        <td>{order?.item?.name || "N/A "}</td>
        <td><div className={`badge badge-md badge-outline 
            ${(order.order_status==="Pending")?"text-yellow-500 text-sm":
                (order.order_status==="Cancelled")?"text-red-500 text-sm":
                (order.order_status==="Completed")?"text-green-500 text-sm":""
            } 
            
            p-[8px]`}>{order.order_status}</div></td>
        <td>
       
          <button className="text-lg text-blue-400 focus:outline-none" 
        onClick={()=>{
          setorderDataLoading(true)
          document.getElementById('my_modal_2').showModal()
         setorderData(latestOrders.find(doc => doc._id === order._id))
          
          
        
        }}>
          <IoEyeSharp /></button>
        </td>
      </tr>)
          
    }
    )
     
      }
    </tbody>
  </table>
</div>}
      </div>
      {/* Recent */}
      <div className="flex flex-col items-center">
      <div className="w-80 badge badge-outline m-4 p-3 text-blue-500">Recent Signed Up Users</div>
      {(latestUsers.length < 1)?<h1 className="text-center text-xl">No Recent Users.</h1> :<div className="overflow-x-auto">
  <table className="table table-zebra text-center">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Mobile</th>
        <th>View More</th>
      </tr>
    </thead>
    <tbody>
      {/* rows */}
      {latestUsers.map((user,index)=>{
        return  (<tr key={index}>
        <th>{index+1}</th>
        <td>{user.fname}</td>
        <td>{user.email}</td>
        <td>{user.mobile}</td>
        <td>
        <button className="text-lg text-blue-400 focus:outline-none" 
        onClick={()=>{document.getElementById('my_modal_1').showModal()
        //  const response = await api.get(`/getusers?id=${user._id}`)
        //  setuserData(response.data.data[0])
         setuserData(latestUsers.find(doc => doc._id === user._id))
        //  console.log(response.data.data[0])
        
        }}>
          <IoEyeSharp /></button>

        </td>
      </tr>)
          
    }
    )
     
      }
     
    </tbody>
  </table>
</div>}

      </div>
     </div>
    </div>}
    {/* Modal 1*/}
<div>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box w-80">
    <h3 className="font-bold text-lg">User Details</h3>
    <table >
      <tbody>
      <tr>
        <td>First Name</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{userData.fname}</td>
        <td className="px-2 lg:px-4 xl:px-4"></td>
      </tr>
        
      <tr>
        <td>Last Name</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{userData.lname}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{userData.email}</td>
        <td className="px-2 lg:px-4 xl:px-4"></td>
      </tr>  
      <tr>
        <td>Mobile</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{userData.mobile}</td>
      </tr>
      <tr>
        <td>Address</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{userData.address}</td>
        <td className="px-2 lg:px-4 xl:px-4"></td>
      </tr> 
      <tr>
        <td>User Type</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{userData.role}</td>
      </tr>
      
      </tbody>
    </table>
   
      
    <div className="modal-action flex justify-center">
        <button className="btn " type='reset' onClick={()=>document.getElementById('my_modal_1').close()}>Close</button>
    </div>
      
  </div>
</dialog>
</div>

{/* Modal 2*/}




  <div>
<dialog id="my_modal_2" className="modal">
{!orderDataLoading ? " ":
  <div className="modal-box w-96">
    <h3 className="font-bold text-lg">Order Details</h3>
    <table >
      <tbody>
      <tr>
        <td>Item Name</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{ orderData?.item?.name || "N/A" }</td>
        <td className="px-2 lg:px-4 xl:px-4"></td>
      </tr> 
       <tr>
        <td>Ordered By</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{orderData.user.fname }</td>
      </tr>
      <tr>
        <td>Email</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{ orderData.user.email}</td>
        <td className="px-2 lg:px-4 xl:px-4"></td>
      </tr>  
      <tr>
        <td>Mobile</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{orderData.user.mobile}</td>
      </tr>
      <tr>
        <td>Order Date</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{getDate(orderData.createdAt)}</td>
        <td className="px-2 lg:px-4 xl:px-4"></td>
      </tr>  
      <tr>
        <td>User Type</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{orderData.user.role}</td>
      </tr>
      <tr>
        <td>Order Status</td>
        <td className="px-2">:</td>
        <td><div className={`badge badge-md badge-outline 
            ${(orderData.order_status==="Pending")?"text-yellow-500 text-sm":
                (orderData.order_status==="Cancelled")?"text-red-500 text-sm":
                (orderData.order_status==="Completed")?"text-green-500 text-sm":""
            } 
            
            p-[8px]`}>{orderData.order_status}</div></td>
        <td className="px-2 lg:px-4 xl:px-4"></td>
      </tr>  
      <tr>
        <td>Order Payment Status</td>
        <td className="px-2">:</td>
        <td><div className={`badge badge-md badge-outline ${
            orderData.payment_status=="Pending" ?"text-yellow-500 text-sm":
            orderData.payment_status=="Completed" ? "text-green-500 text-sm":""
        } p-[8px]`}>{orderData.payment_status}</div></td>
      </tr>
      </tbody>
    </table>
   
      
    <div className="modal-action flex justify-center">
        <button className="btn " type='reset' onClick={()=>document.getElementById('my_modal_2').close()}>Close</button>
    </div>
      
  </div>}
</dialog>
  </div>
    </div>
  );
};

export default Dashboard;
