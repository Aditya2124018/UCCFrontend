import HeroSection from '../components/HeroSection'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AboutSection from '../components/AboutSection'
import ServicesSection from '../components/ServicesSection'
import ClientSection from '../components/ClientSection'
import ContactSection from '../components/ContactSection'
import { useContext, useEffect } from 'react'
import { AppContext } from '../context/Contexts'
import Loader from '../components/Loader'

function Home() {
  const{isloading, setIsLoading} = useContext(AppContext)
  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false); // Hide loader once everything is loaded
    };

    window.addEventListener('load', handleLoad);

   setTimeout(() => {
    handleLoad()
    window.removeEventListener('load', handleLoad);
   }, 3000);
    // Cleanup
  },[]);
  return (
    
    <>
    {isloading ? (<Loader/>) :(
      <div>

      <Navbar/>
    <HeroSection/>
    <AboutSection/>
    <ServicesSection/>
    <ClientSection/>
    <ContactSection/>
    <Footer/>
    
      </div>
    )
  
  }
    </>
  )
}

export default Home