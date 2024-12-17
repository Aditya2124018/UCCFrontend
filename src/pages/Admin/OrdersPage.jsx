import  { useContext,useState,useEffect,useRef } from 'react'
import AdminSidebar from './AdminSidebar'
import { AppContext } from '../../context/Contexts'
import ReactPaginate from 'react-paginate';
import { IoEyeSharp } from 'react-icons/io5';
import { CiEdit } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';
function OrdersPage() {
    const {api,isOpen,getDate}= useContext(AppContext)
    const navigate = useNavigate()
  const [ordersData, setOrdersData] = useState([])
  const [orderData, setOrderData] = useState([])
  const [orderDataLoading,setorderDataLoading] = useState(false)
  const [totalPages,setTotalPages] = useState(1)
  const [isPending, setIsPending] = useState(false)
    const currentPage = useRef()
  const fetchDashboardData = async () => {
    setIsPending(true)
      try{
          const { data } = await api.get(`/order/get?page=${currentPage.current}&limit=10`,{
            headers :{
              Authorization:`Bearer ${localStorage.getItem("token")}`
            }
          })
      console.log(data.data)
      setOrdersData(data.data)
      setTotalPages(data.pagecount)
      }catch(error){
        if(error.status === 401){
          localStorage.clear()
          navigate("/login")
        }else{
          toast.error(error.message)
        }
      }
      setIsPending(false)
    };

    const handlePageClick = (e)=>{
      currentPage.current = (e.selected+1)
      fetchDashboardData()
    }

    useEffect(()=>{
      fetchDashboardData()
      //eslint-disable-next-line
    },[])
  return (
    <div>
        <div className=''>
       <AdminSidebar/>
       </div>
    {isPending? <Loader/>:<div className={`grid gap-6 p-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 lg:ml-64 xl:ml-64${!isOpen ? 'lg:ml-64 xl:ml-64' : ''} -z-0`}>
    <header className="text-2xl font-bold text-secondary">Orders</header>
    <div className="overflow-x-auto">
  {(ordersData.length < 1 )?<h1 className='text-center m-32'>No Orders Yet!</h1>:
    <table className="table">
    {/* head */}
    <thead>
      <tr>
        
        <th>Name</th>
        <th>Address</th>
        <th>Mobile</th>
        <th>Email</th>
        <th>Ordered Item</th>
        <th>Order Status</th>
        <th>Order Payment Status</th>
        <th>Order Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {/* rows*/}
      {
        ordersData.map((order,index)=>{
            return (
                <tr key={index}>
        
        <td>
          <div className="flex items-center gap-3">
          
            <div>
              <div className="font-bold">{order.user.fname}</div>
              <div className="text-sm opacity-50">{order.user.lname}</div>
            </div>
          </div>
        </td>
        <td>
        {order.user.address}
          <br />
          {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
        </td>
        <td>{order.user.mobile}</td>
        <td>
          {order.user.email}
        </td>
        <td>{order?.item?.name || "N/A"}</td>
        <td> <div className={`badge badge-md badge-outline 
                ${(order.order_status==="Pending")?"text-yellow-500 text-sm":
                (order.order_status==="Cancelled")?"text-red-500 text-sm":
                (order.order_status==="Completed")?"text-green-500 text-sm":""
            } p-[8px]`}>{order.order_status}</div> </td>
        <td><div className={`badge badge-md badge-outline ${
            order.payment_status=="Pending" ?"text-yellow-500 text-sm":
            order.payment_status=="Completed" ? "text-green-500 text-sm":""
        } p-[8px]`}>{order.payment_status}</div></td>
        <td>{(order.createdAt).split('T')[0]}</td>
        
        <td className='flex gap-2'>
        <button className="text-xl text-blue-400 focus:outline-none hover:scale-125" 
        onClick={()=>{
          setorderDataLoading(true)
          setOrderData(order)
          document.getElementById('my_modal_1').showModal()
        
        }}>
          <IoEyeSharp /></button>
          <Link 
          to={"/updateorder"}
          state={order}
          ><CiEdit className="text-2xl text-yellow-500 focus:outline-none hover:scale-125"/></Link>
        </td>
      </tr>
            )
        })
      }
     
    </tbody>
        
  </table>}
</div>
    </div>}
    {(totalPages >1)?<div className='mx-auto'>
      {/* Pagination */}
     <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
      />
    </div>:""}
    <div className=''>
<dialog id="my_modal_1" className="modal">
{!orderDataLoading ? " ":
  <div className="modal-box w-96">
    <h3 className="font-bold text-lg">Order Details</h3>
    <table >
      <tbody>
      <tr>
        <td>Customer Name</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{orderData.user.fname+" "+orderData.user.lname}</td>
        <td className="px-2 lg:px-4 xl:px-4"></td>
      </tr>
      <tr>
        <td>Mobile</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{orderData.user.mobile}</td>
      </tr>

      <tr>
        <td>Email</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{orderData.user.email}</td>
        <td className="px-2 lg:px-4 xl:px-4"></td>
      </tr>
      <tr>
        <td>Ordered Item</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{orderData?.item?.name || "N/A"}</td>
      </tr>
      <tr>
        <td>Order Price</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{(orderData?.item?.price) ? <span>₹</span>(orderData?.item?.price) + "/-" : "N/A"}</td>
        <td className="px-2 lg:px-4 xl:px-4"></td>
      </tr>
      <tr>
        <td>Item Description</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{orderData?.item?.description || "N/A"
        }</td>
      </tr>
      <tr>
        <td>Item Type</td>
        <td className="px-2">:</td>
        <td className="badge badge-outline">{orderData?.item?.type || "N/A"
        }</td>
      </tr>
      <tr>
        <td>Order Status</td>
        <td className="px-2">:</td>
        <td className={`badge badge-md badge-outline 
            ${(orderData.order_status==="Pending")?"text-yellow-500 text-sm":
                (orderData.order_status==="Cancelled")?"text-red-500 text-sm":
                (orderData.order_status==="Completed")?"text-green-500 text-sm":""
            } 
            
            p-[8px]`}>{orderData.order_status}</td>
        <td className="px-2 lg:px-4 xl:px-4"></td>
      </tr>
      <tr>
        <td className='text-sm'>Order Payment Status</td>
        <td className="px-2">:</td>
        <td className={`badge badge-md badge-outline ${
            orderData.payment_status=="Pending" ?"text-yellow-500 text-sm":
            orderData.payment_status=="Completed" ? "text-green-500 text-sm":""
        } p-[8px]`}>{orderData.payment_status}</td>
      </tr>
      <tr>
        <td>Order Date</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{getDate(orderData.createdAt)}</td>
        <td className="px-2 lg:px-4 xl:px-4"></td>
       </tr>
       <tr>
        <td>Last Updated At</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{getDate(orderData.updatedAt)}</td>
      </tr>
      <tr>
      <td>Customer Address</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{orderData.user.address}</td>
      </tr>
      
      </tbody>
    </table>
   
      
    <div className="modal-action flex justify-center">
        <button className="btn " type='reset' onClick={()=>document.getElementById('my_modal_1').close()}>Close</button>
    </div>
      
</div>}
</dialog>
</div>
    </div>
  )
}

export default OrdersPage