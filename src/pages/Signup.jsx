
import Navbar from '../components/Navbar'
import SignupForm from '../components/SignupForm'
import Footer from '../components/Footer'

function Signup() {
  return (
    <>
    <Navbar/>
    <div className='mt-20 mb-44'>
    <SignupForm/>
    </div>
    <Footer/>
    </>
  )
}

export default Signup