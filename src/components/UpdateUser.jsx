import  { useContext, useEffect, useState } from 'react';
import { Link,useNavigation,useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios'
import { AppContext } from '../context/Contexts';
import { IoMdArrowRoundBack } from 'react-icons/io';
import toast from 'react-hot-toast';
const UpdateUser = () => {
  const [formData,setFormdata] = useState({
        fname:"",
        lname:"",
        mobile:"",
        email:"",
        role:"User",
        address:""
    })
    const [isPending, setIsPending] = useState(false)
    const navigate  = useNavigate()
    let user = useLocation()
    const {api} = useContext(AppContext)
    // import { AppContext } from '../context/Contexts';
    const setUserData = ()=>{
        user = user.state
        console.log(user)
        setFormdata({
            fname:user.fname,
            lname:user.lname,
            mobile:user.mobile,
            email:user.email,
            address:user.address,
            role:user.role

        })
    }
    async function submitHandler(e){
        e.preventDefault()
        setIsPending(true)
        try {
            const response =await api.put(`updateuser/${user.state._id}`,formData)
            if(response.status === 200){
                // console.log(response)
                toast.success(response.data.message)
                navigate("/users")
            }
        } catch (error) {
            console.log(error)
            setIsPending(false)
            toast.error(error.response.data.message)
            
        }
        setIsPending(false)
        console.log(formData)
        // setFormdata(obj)
        // console.log(formdata)
    }
    function Handler(e){
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
    useEffect(()=>{
        setUserData()
        //eslint-disable-next-line
    },[])
  return (
    <div className="max-w-md mx-auto p-6 bg-white mt-8 lg:rounded-lg lg:shadow-md xl:rounded-lg xl:shadow-md">
        <h6 className="text-left text-xl" onClick={()=>navigate(-1)}><IoMdArrowRoundBack /></h6>
      <h2 className="text-2xl font-bold mb-6 text-center">Update User</h2>
      <form onSubmit={submitHandler}>
        <div className="w-full flex space-x-2 mb-2">
          <div className="">
            <label htmlFor="">First Name</label><br/>
          <input type="text" placeholder="First Name" name="fname" className="w-full p-2 border border-gray-300 rounded-md"  value={formData.fname}
          onChange={Handler}/>
          </div>
          <div className="">
          <label htmlFor="">Last Name</label><br/>
          <input type="text" placeholder="Last Name" name="lname" className="w-full p-2 border border-gray-300 rounded-md" value={formData.lname}
          onChange={Handler}/>
          </div>
        </div>
        <div className="">
        <label htmlFor="">Mobile</label><br/>
          <input type="number" placeholder="Mobile" name="mobile" className="w-full p-2 border border-gray-300 rounded-md mb-2" value={formData.mobile}
          onChange={Handler}/>
        </div>
        <div className="mb-2">
        <label htmlFor="">Email</label><br/>  
          <input type="email" placeholder="Email" name="email" className="w-full p-2 border border-gray-300 rounded-md" value={formData.email}
          onChange={Handler}/>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">User Type</label>
          <select
            name="role"
            value={formData.role}
            onChange={Handler}
            className="select select-bordered w-full"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="mb-4">
        <label htmlFor="">Address</label><br/>
          <textarea type="text" placeholder="Address" name="address" className="w-full p-2 border border-gray-300 rounded-md" value={formData.address}
          onChange={Handler}/>
        </div>
        <button className="w-full bg-yellow-400 text-black font font-semibold py-2 mt-1 rounded-md"
        disabled={isPending}
        >{isPending?"Updating...":"Update" }</button>
      </form>
    </div>
  );
};

export default UpdateUser;
