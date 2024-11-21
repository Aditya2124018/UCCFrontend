import {useContext, useState} from 'react';
// import axios from 'axios'
import { Link } from 'react-router-dom';
import { AppContext } from '../context/Contexts';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
    const [formData,setFormdata] = useState({
        username:"",
        password:""
    })
    
   const navigate = useNavigate()
    const {api} = useContext(AppContext)

   async function submitHandler(e){
        e.preventDefault()
        try {
          
            const response =await api.post('/login',formData)
            if(response.status ===200){

              console.log(response.data)
              localStorage.setItem("token",response.data.token)
              localStorage.setItem("uname",response.data.user.fname)
              if(response.data.user.role == "Admin"){

                navigate("/dashboard")
              }else{
                navigate("/custhome")
              }
            }

        } catch (error) {
            console.log(error)
            
        }
        console.log(formData)
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
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <input type="text" placeholder="Email/Mobile" className="w-full p-2 border border-gray-300 rounded-md" name="username" value={formData.username}
          onChange={Handler}/>
        </div>
        <div className="mb-4">
          <input type="password" placeholder="Password" name="password" className="w-full p-2 border border-gray-300 rounded-md" value={formData.password}
          onChange={Handler}/>
        <Link className='text-blue-500 text-sm' to="/forgetpassword">Forget Password?</Link>
        </div>
        <button className="w-full bg-blue-500 text-white py-2 mt-1 rounded-md">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
