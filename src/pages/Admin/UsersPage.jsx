import {useState, useContext,useEffect, useRef } from 'react';
// import UserCard from '../../components/UserCard'; 
import AdminSidebar from './AdminSidebar';
import { AppContext } from '../../context/Contexts';
import ReactPaginate from 'react-paginate';
import { IoEyeSharp } from 'react-icons/io5';
import { CiEdit } from "react-icons/ci";
import { Link } from 'react-router-dom';
const UsersPage = () => {
    const {api,isOpen,getDate}= useContext(AppContext)
    const [usersData, setUsersData] = useState([])
    const [userDataLoading, setUserDataLoading] = useState(false)
    const [userdata, setUserdata] = useState([])
    const [totalPages,setTotalPages] = useState(1)
    const currentPage = useRef()
    const fetchDashboardData = async () => {
        try{
            const { data } = await api.get(`/getusers?page=${currentPage.current}&limit=1`)
        console.log(data)
        setUsersData(data.data)
        setTotalPages(data.pagecount)
        }catch(error){
            console.log(error)
        }
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
    <div className={`grid gap-6 p-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 lg:ml-64 xl:ml-64${!isOpen ? 'lg:ml-64 xl:ml-64' : ''} -z-0`}>
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        
        <th>Name</th>
        <th>Address</th>
        <th>Mobile</th>
        <th>Email</th>
        <th>User Type</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {/* rows */}
      {
        usersData.map((user,index)=>{
         return   <tr key={index}>
        
        <td>
          <div className="flex items-center gap-3">
          
            <div>
              <div className="font-bold">{user.fname}</div>
              <div className="text-sm opacity-50">{user.lname}</div>
            </div>
          </div>
        </td>
        <td>
          {user.address}
          <br />
          
        </td>
        <td>{user.mobile}</td>
       <td>{user.email}</td>
       <td>{user.role}</td>
       <td className='flex gap-2'>
       <button 
        onClick={()=>{
          setUserDataLoading(true)
          document.getElementById('my_modal_1').showModal()
          setUserdata(usersData.find(doc => doc._id === user._id))
          // setUserData(userdata)
          console.log(userdata)
          
        
        }}>
          <IoEyeSharp className="text-xl text-blue-400 focus:outline-none hover:scale-125" /></button>

          <button  >
          <Link 
          to={"/updateuser"}
          state={user}
          ><CiEdit className="text-2xl text-yellow-500 focus:outline-none hover:scale-125"/></Link>
          </button>
       </td>
      </tr>
        })
      }
      
     
    </tbody>
        
  </table>
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
    </div>
    <div>
<dialog id="my_modal_1" className="modal">
{!userDataLoading ? " ":
  <div className="modal-box w-80">
    <h3 className="font-bold text-lg">User Details</h3>
    <table >
      <tbody className=''>
      <tr>
        <td>First Name</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{userdata.fname}</td>
        <td className="px-2 lg:px-4 xl:px-4"></td>
      </tr>  
      <tr>
        <td>Last Name</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{userdata.lname}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{userdata.email}</td>
        <td className="px-2 lg:px-4 xl:px-4"></td>
      </tr>  
      <tr>
        <td>Mobile</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{userdata.mobile}</td>
      </tr>
      <tr>
        <td>Address</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{userdata.address}</td>
        <td className="px-2 lg:px-4 xl:px-4"></td>
      </tr>  
      <tr>
        <td>User Type</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{userdata.role}</td>
      </tr>
      <tr>
        <td>A/C Created At</td>
        <td className="px-2">:</td>
        <td className="font-semibold">{getDate(userdata.createdAt)}</td>
        <td className="px-2 lg:px-4 xl:px-4"></td>
       
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
  );
};

export default UsersPage;
