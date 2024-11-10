import  { useState } from 'react';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa'; // Hamburger and close icons

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar__logo">Logo</div>

      <nav className="navbar__links">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
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
            <li><a href="#home" onClick={toggleSidebar}>Home</a></li>
            <li><a href="#about" onClick={toggleSidebar}>About</a></li>
            <li><a href="#services" onClick={toggleSidebar}>Services</a></li>
            <li><a href="#contact" onClick={toggleSidebar}>Contact</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
