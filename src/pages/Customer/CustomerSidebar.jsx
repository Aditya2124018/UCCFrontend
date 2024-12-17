import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';
import { NavLink} from 'react-router-dom'
import "../../components/Navbar.css"
import toast from 'react-hot-toast';
function CustomerSidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div>
         <header className="navbar">
      <div className="navbar__logo">Logo</div>
      
      <nav className="navbar__links">
        {/* <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="">Login</a></li>
          <li><a href="">Signup</a></li>
        </ul> */}
        <ul>
        <li><NavLink to={"/custhome"}>Home</NavLink></li>
        <li><NavLink to={"/myorders"}>My Orders</NavLink></li>
        <li><NavLink to={"/custservices"}>Services</NavLink></li>
        <li><NavLink to={"/custproducts"}>Products</NavLink></li>
        <li><NavLink to={"/profile"}>My Profile</NavLink></li>
        <li><NavLink to={"/"} onClick={()=>{
          localStorage.clear()
          toast.success("Logged Out Successfully.")
        }}>Log out</NavLink></li>
        </ul>
      </nav>

      {/* Mobile Hamburger */}
      <div className="navbar__hamburger" onClick={toggleSidebar}>
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Sidebar for mobile */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar__links">
          
          <ul>
        <li><NavLink to={"/custhome"}>Home</NavLink></li>
        <li><NavLink to={"/myorders"}>My Orders</NavLink></li>
        <li><NavLink to={"/custservices"}>Services</NavLink></li>
        <li><NavLink to={"/custproducts"}>Products</NavLink></li>
        <li><NavLink to={"/profile"}>My Profile</NavLink></li>
        <li><NavLink onClick={()=>{
          localStorage.clear()
          toast.success("Logged Out Successfully.")
        }} to={"/"}>Log Out</NavLink></li>
        </ul>
          
        </div>
      </div>
    </header>
    </div>
  )
}

export default CustomerSidebar