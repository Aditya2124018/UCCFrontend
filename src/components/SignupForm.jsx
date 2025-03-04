import  { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios'
import { AppContext } from '../context/Contexts';
import toast from 'react-hot-toast';
const SignupForm = () => {
  const [formData,setFormdata] = useState({
        fname:"",
        lname:"",
        mobile:"",
        email:"",
        password:"",
        address:""
    })
    const {api} = useContext(AppContext)
    const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()
    // import { AppContext } from '../context/Contexts';
    async function submitHandler(e){
      e.preventDefault()
      setIsPending(true)
        try {
          
            const response =await api.post('/signup',formData)
            if(response.status === 200){
              navigate("/login")
            }
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            setIsPending(false)
        }

        setIsPending(false)
        
        
        // console.log(formData)
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
  return (
    <div className="max-w-md mx-auto p-6 bg-white lg:rounded-lg lg:shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      <form onSubmit={submitHandler}>
        <div className="flex space-x-4 mb-4">
          <input type="text" placeholder="First Name" name="fname" className="w-1/2 p-2 border border-gray-300 rounded-md"  value={formData.fname}
          onChange={Handler}/>
          <input type="text" placeholder="Last Name" name="lname" className="w-1/2 p-2 border border-gray-300 rounded-md" value={formData.lname}
          onChange={Handler}/>
        </div>
        <div className="mb-4">
          <input type="tel" placeholder="Mobile" name="mobile" className="w-full p-2 border border-gray-300 rounded-md" value={formData.mobile}
          onChange={Handler}/>
        </div>
        <div className="mb-4">
          <input type="email" placeholder="Email" name="email" className="w-full p-2 border border-gray-300 rounded-md" value={formData.email}
          onChange={Handler}/>
        </div>
        <div className="mb-4">
          <input type="password" placeholder="Password" name="password" className="w-full p-2 border border-gray-300 rounded-md" value={formData.password}
          onChange={Handler}/>
        </div>
        <div className="mb-4">
          <textarea type="text" placeholder="Address" name="address" className="w-full p-2 border border-gray-300 rounded-md" value={formData.address}
          onChange={Handler}/>
        </div>
        <Link className='text-blue-500 text-sm ' to="/login">Already have an account?</Link>
        <button className="w-full bg-blue-500 text-white py-2 mt-1 rounded-md" disabled={isPending}>{isPending?"Signing In... ":"Sign Up"}</button>
      </form>
    </div>
  );
};

export default SignupForm;
