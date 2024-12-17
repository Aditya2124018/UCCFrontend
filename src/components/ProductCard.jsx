// import React from 'react'

import { useNavigate } from "react-router-dom"
function ProductCard({item}) {
    const navigate = useNavigate()
    return (
      <div className="card bg-base-100 w-64 shadow-xl">
       
    <figure className='max-h-40'>
      <img
        src={item.imageURL}
        alt={item.name} 
        className="object-contain"
        />
    </figure>
    <div className="card-body">
      <h2 className="card-title">
        {item.name}
        {/* <div className="badge badge-secondary">NEW</div> */}
      </h2>
      <p className="">{(item.description).length > 25 ?(item.description).substring(0, 25)+ "..." :item.description}</p>
      <div className="card-actions justify-between">
        {/* <div className="badge badge-outline">Services</div> */}
        <div className="font-semibold"><span>₹</span> {item.price} /-</div>
        <div className="badge badge-outline my-2">{item.type}</div>
      </div>
        
          {
            (item.type === "Service")?<button className="btn btn-warning text-md" onClick={(e)=>{
              e.preventDefault()
              e.stopPropagation()
              navigate("/checkout",{state:item._id})}}>Request Service</button> : 
            <button className="btn btn-success text-lg" onClick={(e)=>{
              e.preventDefault()
              e.stopPropagation()
              navigate("/checkout",{state:item._id})}}>Sell</button>
          }
        
    </div>
    
  </div>
    )
  }
  
  export default ProductCard