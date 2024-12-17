import { useEffect } from "react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/Contexts";
import toast from "react-hot-toast";

function AdminSidebar() {
   const {toggleSidebar,isOpen}= useContext(AppContext)
   const uname = localStorage.getItem("uname")
   const navigate =  useNavigate()
   useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/")
    }
   })
  return (
    <div>
         <div className="flex">
      {/* Hamburger Icon */}
      <button 
        className="text-3xl m-4 md:hidden text-secondary" 
        onClick={toggleSidebar}
      >
        &#9776;
      </button>

      {/* Sidebar */}
      <div
        className={`z-50 fixed top-0 left-0 h-full bg-secondary text-white w-64 p-5 space-y-8 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6">Hi, {uname}</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "pb-1 border-b-2 border-primary  font-semibold" : "text-white"
                }
                onClick={toggleSidebar}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive ? "pb-1 border-b-2 border-primary  font-semibold" : "text-white"
                }
                onClick={toggleSidebar}
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? "pb-1 border-b-2 border-primary  font-semibold" : "text-white"
                }
                onClick={toggleSidebar}
              >
                Products & Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive ? "pb-1 border-b-2 border-primary  font-semibold" : "text-white"
                }
                onClick={toggleSidebar}
              >
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "pb-1 border-b-2 border-primary  font-semibold" : "text-white"
                }
                onClick={()=>{localStorage.clear()
                  toast.success("Logged Out Successfully.")
                }}
              >
                Log Out
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0  opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

{/* {isOpen && (
  <div
    className="fixed inset-y-0 left-0 w-64 bg-black opacity-50 md:hidden"
    onClick={toggleSidebar}
  ></div>
)} */}
    </div>
    </div>
  )
}

export default AdminSidebar