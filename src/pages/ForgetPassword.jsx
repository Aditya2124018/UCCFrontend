import { useState} from 'react'
import { useContext } from 'react'
// import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { AppContext } from '../context/Contexts';
function ForgetPassword() {
    const [email,setEmail] = useState("")
    const api = useContext(AppContext)
    async function submitHandler(e){
        e.preventDefault()
        try {
            const response =await api.post('/forgot_password',{email:email})
            console.log(response.data)
            
        } catch (error) {
            console.log(error)
            
        }
    }
  
  return (
    <div>
    <Navbar/>
    
    <div  className='mt-36 mb-44'>
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md mt-8">
    <h2 className="text-xl font-semibold mb-4">Forget Password</h2>
    <form onSubmit={submitHandler}>
      <div className="mb-4">
        <input type="email" placeholder="Email" className="w-full p-2 border border-gray-300 rounded-md" name="username" value={email}
        onChange={(e)=>{setEmail(e.target.value)}}/>
      </div>
      
      <button className="w-full bg-blue-500 text-white py-2 rounded-md">Send Verification Link</button>
    </form>
  </div>
  </div>
  <Footer/>
  </div>
  )
}

export default ForgetPassword