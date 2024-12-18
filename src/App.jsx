// import { useEffect } from 'react';


import { Route, Routes, useNavigate } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import Navbar from './components/Navbar';
// import HeroSection from './components/HeroSection';

// import AboutSection from './components/AboutSection';
// import ServicesSection from './components/ServicesSection';
// import ClientSection from './components/ClientSection';
// import ContactSection from './components/ContactSection';
// import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Services from './pages/Services';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgetPassword from './pages/ForgetPassword';
import { AppContextProvider } from './context/AppContext';
import ResetPassword from "./pages/ResetPassword"
import Dashboard from './pages/Admin/Dashboard';
import UsersPage from './pages/Admin/UsersPage';
import Loader from './components/Loader';
import ProductsPage from './pages/Admin/ProductsPage';
import OrdersPage from './pages/Admin/OrdersPage';
// import CustomerSidebar from './pages/Customer/CustomerSidebar';
import CustomerHome from './pages/Customer/CustomerHome';
import AddProductForm from './components/AddProductForm';
import UpdateItemForm from './components/UpdateItemForm';
import UpdateUser from './components/UpdateUser';
import UpdateOrder from './components/UpdateOrder';
import {Toaster} from "react-hot-toast"
import ItemShowcase from './pages/Customer/ItemShowcase';
import Products from './pages/Customer/Products';
import CustServices from "./pages/Customer/Services"
import Checkout from './pages/Customer/Checkout';
import MyOrders from './pages/Customer/MyOrders';
import ProfilePage from './pages/Customer/ProfilePage';
import OrderConfirmationPage from './pages/Customer/OrderConfirmationPage';
import NotFoundPage from './pages/NotFoundPage';
function App() {
  
  
  
  return (
    <>
    <Toaster/>
    <AppContextProvider>
   
   <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/contact' element={<Contact/>}></Route>
    <Route path='/about' element={<About/>}></Route>
    <Route path='/services' element={<Services/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/signup' element={<Signup/>}></Route>
    <Route path='/forgetpassword' element={<ForgetPassword/>}></Route>
    <Route path='/ResetPassword/:token' element={<ResetPassword/>}></Route>
    <Route path='/dashboard' element={<Dashboard/>}></Route>
    <Route path='/users' element={<UsersPage/>}></Route>
    <Route path='/load' element={<Loader/>}></Route>
    <Route path='/products' element={<ProductsPage/>}></Route>
    <Route path='/orders' element={<OrdersPage/>}></Route>
    <Route path='/CustHome' element={<CustomerHome/>}></Route>
    <Route path='/add' element={<AddProductForm/>}></Route>
    <Route path='/updateitem' element={<UpdateItemForm/>}></Route>
    <Route path='/updateuser' element={<UpdateUser/>}></Route>
    <Route path='/updateorder' element={<UpdateOrder/>}></Route>
    <Route path='/showcase/:id' element={<ItemShowcase/>}></Route>
    <Route path='/custproducts' element={<Products/>}></Route>
    <Route path='/custservices' element={<CustServices/>}></Route>
    <Route path='/checkout' element={<Checkout/>}></Route>
    <Route path='/myorders' element={<MyOrders/>}></Route>
    <Route path='/profile' element={<ProfilePage/>}></Route>
    <Route path='/orderconfirm' element={<OrderConfirmationPage/>}></Route>
    <Route path='*' element={<NotFoundPage/>}></Route>
   </Routes> 
    

   
   </AppContextProvider>
   
  
  

  
  



 


    </>
  )
}

export default App
