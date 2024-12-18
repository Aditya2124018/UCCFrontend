import  { useContext,useState,useEffect, useRef } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminProductCard from '../../components/AdminProductCard'
import { AppContext } from '../../context/Contexts'
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';
function ProductsPage() {
  const {api,isOpen,getDate}= useContext(AppContext)
  const [itemsData, setItemsData] = useState([])
  const [totalPages,setTotalPages] = useState(1)
  const [itemdata, setItemData] = useState([])
  const navigate = useNavigate()
  const [isPending, setIsPending] = useState(false)
    const currentPage = useRef()
  const fetchDashboardData = async () => {
    setIsPending(true)
      try{
          const { data } = await api.get(`/getItems?page=${currentPage.current}&limit=10`,{
            headers :{
              Authorization:`Bearer ${localStorage.getItem("token")}`
            }
          })
      console.log(data.data)
      setItemsData(data.data)
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
    const productDeleteHandler = async(id)=>{
      
        try {
          const res = await api.delete(`/deleteitem/${id}`,{
            headers :{
              Authorization:`Bearer ${localStorage.getItem("token")}`
            }
          })
        if(res.status ===200){
          console.log(res)
          // toast.success(res.data.message)
          const updatedData = itemsData.filter((currItem)=>{
            return currItem._id !== id
          } )
          setItemsData(updatedData)
          
          if(updatedData.length <1){
            currentPage.current -= 1
            fetchDashboardData()
          }
          } 
        } catch (error) {
          if(error.status === 401){
            localStorage.clear()
            navigate("/login")
          }else{
            toast.error(error.response.data.message)
          }
          // toast.error(error.response.data.message)
        }
        
        
        }
    
    useEffect(()=>{
      fetchDashboardData()
      //eslint-disable-next-line
    },[])
  return (
    <div>
        <AdminSidebar/>
     {isPending? <Loader/>:   <>
          <header className="text-xl text-center font-bold text-secondary mb-4">Products & Services</header>
        <div className='lg:pt-8 xl:pt-8 ml-28 lg:ml-2 xl:ml-2 '>
          <Link to="/add" className={`btn btn-outline py-3 ${!isOpen ? 'lg:ml-80 xl:ml-80 ' : ''}`}>Add More <IoMdAdd className='text-lg'/></Link>
        </div>
    <div className={`grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 md:justify-center lg:grid-cols-3 lg:justify-center p-4 lg:ml-64 ${!isOpen ? 'lg:ml-64 xl:ml-64' : ''} p-5`}>
        
    
       
    {(itemsData.length<1)? <h1 className="text-center text-xl">No Products Added Yet!</h1>:itemsData.map((item,index)=>{
    
     return <div key={index} onClick={()=>{console.log("clicked")
      setItemData(item)
      document.getElementById('my_modal_1').showModal()
     }}>
      <AdminProductCard  item={item} productDeleteHandler={productDeleteHandler}/>
     </div>
    })
      }
    </div>
    {(totalPages >1)?<div>
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
    
<dialog id="my_modal_1" className="modal">
  <div className="modal-box w-96">
    <h3 className="font-bold text-lg">Item Details</h3>
    <div className='flex flex-col items-center'>
      <div className='w-36 h-36  mx-auto rounded-full overflow-hidden'>
        <img src={itemdata.imageURL} alt="" className='h-full w-full object-contain' />
      </div>
      <table className=''>
        <tbody className=''>
        <tr>
        <td>Item Name</td>
        <td className="px-1">:</td>
        <td className="font-semibold">{itemdata.name}</td>
        <td className="lg:px-4 xl:px-4"></td>
        </tr>
          
        <tr>
        <td>Price</td>
        <td className="px-1">:</td>
        <td className="font-semibold"><span>₹</span> {itemdata.price} /-</td>
      </tr>
      <tr>
        <td>Item Added At</td>
        <td className="px-1">:</td>
        <td className="font-semibold">{getDate(itemdata.createdAt)}</td>
        <td className="lg:px-4 xl:px-4"></td>
        </tr>
        <tr>
        <td>Item Type</td>
        <td className="px-1">:</td>
        <td className="badge badge-outline">{itemdata.type} </td>
      </tr>
      <tr>
      <td>Last Updated At</td>
        <td className="px-1">:</td>
        <td className="font-semibold">{getDate(itemdata.updatedAt)} </td>
        <td className="lg:px-4 xl:px-4"></td>
        </tr>
          
        <tr>
        <td>Description</td>
        <td className="px-1">:</td>
        <td className="font-semibold">{itemdata.description} </td>
      </tr>
        </tbody>
      </table>
    </div>
  <div className='w-full flex justify-center'>
  <button className="btn btn-sm mt-2" type='reset' onClick={()=>document.getElementById('my_modal_1').close()}>Close</button>
  </div>
  </div>
</dialog>
</>}
    </div>
  )
}

export default ProductsPage