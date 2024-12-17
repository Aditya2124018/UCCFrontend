import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/Contexts"
import CustomerSidebar from "./CustomerSidebar"
import toast from "react-hot-toast"
import Footer from "../../components/Footer"
import { useNavigate } from "react-router-dom"
import Loader from "../../components/Loader"

export default function ProfilePage(){
    const [formData,setFormdata] = useState({
        fname:"",
        lname:"",
        mobile:"",
        email:"",
        address:"",
        role:"User"
    })
    const [isenable, setIsenable] = useState(true)
    const navigate = useNavigate()
    const [isPending, setIsPending] = useState(false)
    const {api} = useContext(AppContext)
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
    async function submitHandler(e){
        e.preventDefault()
        setIsPending(true)
        try {
            const response = await api.put(`/updateuser/${localStorage.getItem("uid")}`,formData,{
                headers :{
                  Authorization:`Bearer ${localStorage.getItem("token")}`
                }
              })
            if(response.status === 200){

                toast.success("Details Updated.")
                
            }
            // console.log(formData)
        } catch (error) {
            if(error.status === 401){
                localStorage.clear()
                navigate("/login")
              }else{
                toast.error(error.response.data.message)
              }
        }
        setIsPending(false)
    }

    useEffect(()=>{
        (async()=>{
          setIsPending(true)
            const response = await api.get(`/getusers?id=${localStorage.getItem("uid")}`,{
                headers :{
                  Authorization:`Bearer ${localStorage.getItem("token")}`
                }
              })
              if(response.status === 401){
                localStorage.clear()
                navigate("/login")
              }
            const user = response.data.data[0]
            console.log(user)
            setFormdata({
                fname:user.fname,
        lname:user.lname,
        mobile:user.mobile,
        email:user.email,
        address:user.address,
        role:"User"
            })
            setIsPending(false)
        })()
        //eslint-disable-next-line
    },[])

    return(
        <div>
            <CustomerSidebar/>
        
        {isPending? <Loader/> :<div className="max-w-md mx-auto p-6 bg-white rounded-lg lg:shadow-md lg:mt-20 mt-16 mb-12">
      <h2 className="text-2xl font-bold mb-6">User Profile</h2>
      <form onSubmit={submitHandler}>
        <div className="flex space-x-4 mb-2">
            <div>

        <label htmlFor="">First Name</label><br/>
          <input type="text" placeholder="First Name" name="fname" className=" w-full p-2 border border-gray-500 rounded-md "  value={formData.fname}
          onChange={Handler}
          disabled={isenable}
          />
          </div>
          <div>
          <label htmlFor="">Last Name</label><br/>
          <input type="text" placeholder="Last Name" name="lname" className=" w-full p-2 border border-gray-500 rounded-md" value={formData.lname}
          onChange={Handler}
          disabled={isenable}
          />
          </div>
        </div>
        <div>
        <label htmlFor="">Mobile</label>
        <div className="mb-2">
          <input type="tel" placeholder="Mobile" name="mobile" className="w-full p-2 border border-gray-500 rounded-md" value={formData.mobile}
          onChange={Handler}
          disabled={isenable}
          />
          </div>
        </div>
        <div>
        <label htmlFor="">Email</label>
        <div className="mb-2">
          <input type="email" placeholder="Email" name="email" className="w-full p-2 border border-gray-500 rounded-md" value={formData.email}
          onChange={Handler}
          disabled={isenable}
          />
          </div>
        </div>
        <div>
        <label htmlFor="">Address</label>
        <div className="mb-2">
          <textarea type="text" placeholder="Address" name="address" className="w-full p-2 border border-gray-500 rounded-md" value={formData.address}
          onChange={Handler}
          disabled={isenable}
          />
          </div>
        </div>
        {!isenable && <button className="w-full bg-green-500 text-white py-2 mt-1 rounded-md">Save</button>}
        {isenable && <button className="w-full bg-blue-500 text-white py-2 mt-1 rounded-md"
        onClick={(e)=>{
            e.preventDefault()
            setIsenable(false)
        }}
        >Edit</button>}
      </form>
    </div>}
    <Footer/>
    </div>
    )
}