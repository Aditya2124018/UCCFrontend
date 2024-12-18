
import  axios  from "axios"

import {AppContext} from "./Contexts.jsx"
import { useState } from "react";

export const AppContextProvider = ({children})=>{
    const api = axios.create({
        baseURL:"https://ucbackend.onrender.com/api/v1"
    })

    function getDate(str){
      if(str===undefined){
        return
      }
      return str.split('T')[0]
    }

   

    const [isOpen, setIsOpen] = useState(false);
    const [progress, setProgress] = useState(0)
    const [isloading, setIsLoading] = useState(true)
    // Toggle sidebar visibility
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
    // const name = "Aditya"
    
    
    
    return <AppContext.Provider
    value={{api, toggleSidebar, isOpen, getDate,progress, setProgress,isloading, setIsLoading}}
    >{children}</AppContext.Provider>
}



