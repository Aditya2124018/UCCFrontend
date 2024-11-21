import  { useState } from 'react';
import './Navbar.css';
import '../App.css'
import { FaBars, FaTimes } from 'react-icons/fa'; // Hamburger and close icons
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
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
        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><NavLink to={"/about"}>About</NavLink></li>
        <li><NavLink to={"/services"}>Services</NavLink></li>
        <li><NavLink to={"/contact"}>Contact</NavLink></li>
        <li><NavLink to={"/login"}>Login</NavLink></li>
        <li><NavLink to={"/signup"}>Signup</NavLink></li>
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
        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><NavLink to={"/about"}>About</NavLink></li>
        <li><NavLink to={"/services"}>Services</NavLink></li>
        <li><NavLink to={"/contact"}>Contact</NavLink></li>
        <li><NavLink to={"/login"}>Login</NavLink></li>
        <li><NavLink to={"/signup"}>Signup</NavLink></li>
        </ul>
          
        </div>
      </div>
    </header>
  );
};

export default Navbar;
