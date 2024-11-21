
import Navbar from '../components/Navbar'
import LoginForm from '../components/LoginForm'
import Footer from '../components/Footer'
// import { useContext } from 'react'
// import { AppContext } from '../context/Contexts'

function Login() {
    // const name = useContext(AppContext)
  return (
    <>
    <Navbar/>
    <div className='mt-20 mb-44'>
    
    <LoginForm/>
    </div>
    <Footer/>
    </>
  )
}

export default Login