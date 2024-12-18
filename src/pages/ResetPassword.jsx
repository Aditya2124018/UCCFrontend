import  { useContext, useState } from 'react'
// import axios from 'axios'
import {useParams,useNavigate} from "react-router-dom";
import { AppContext } from '../context/Contexts';
function ResetPassword() {
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    const [confirmpassword,setConfirmPassword] = useState("")
    const [isPending, setIsPending] = useState(false)
    const token = useParams()
    const {api} = useContext(AppContext)
    async function submitHandler(e){
        e.preventDefault()
        setIsPending(true)
        try {
            console.log(token)
            if(password === confirmpassword){
                const response =await api.post(`/reset_password`,{password:password}, {headers:{
                    'Authorization' : "Bearer "+token.token}
                })
            console.log(response.data)
            if(response.data.success){
                navigate('/login')
            }
            }
            
        } catch (error) {
          setIsPending(false)
            console.log(error.response)
            
        }
        setIsPending(false)
    }
  return (
    <div className="max-w-md mx-auto p-8 bg-white lg:rounded-lg lg:shadow-md mt-8">
    <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
    <form onSubmit={submitHandler}>
      <div className="mb-4">
        <input type="text" placeholder="Enter Password" className="w-full p-2 border border-gray-300 rounded-md" name="pwd" value={password}
        onChange={(e)=>{setPassword(e.target.value)}}/>
      </div>
      <div className="mb-4">
        <input type="text" placeholder="Enter Confirm Password" className="w-full p-2 border border-gray-300 rounded-md" name="confirmpwd" value={confirmpassword}
        onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
      </div>
      <button className="w-full bg-blue-500 text-white py-2 rounded-md"
      disabled={isPending}
      >{isPending?"Resetting...":"Reset Password"}</button>
    </form>
  </div>
  )
}

export default ResetPassword