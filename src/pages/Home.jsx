import HeroSection from '../components/HeroSection'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AboutSection from '../components/AboutSection'
import ServicesSection from '../components/ServicesSection'
import ClientSection from '../components/ClientSection'
import ContactSection from '../components/ContactSection'
function Home() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    {<AboutSection/>}
    {<ServicesSection/>}
    {<ClientSection/>}
    {<ContactSection/>}
    <Footer/>
    </>
  )
}

export default Home