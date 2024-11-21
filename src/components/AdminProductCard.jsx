// import React from 'react'

import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../context/Contexts"

function AdminProductCard(props) {
  const navigate = useNavigate()
  const {getDate,api,setReload,reload}= useContext(AppContext)
  
  
  return (
    <div className="card bg-base-100 w-64 shadow-xl">
  <figure className='max-h-40'>
    <img
      src={props.item.imageURL}
      alt={props.item.name} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {props.item.name}
      {/* <div className="badge badge-secondary">NEW</div> */}
    </h2>
    <p>{(props.item.description).length > 25 ?(props.item.description).substring(0, 25)+ "..." :props.item.description}</p>
    <div className="card-actions justify-between">
      {/* <div className="badge badge-outline">Services</div> */}
      <div className="font-semibold"><span>₹</span> {props.item.price} /-</div>
      <div className="badge badge-outline my-2">{props.item.type}</div>
    </div>
    <div className="flex justify-evenly">

      
        <Link
        className="btn btn-sm  btn-warning"
        to="/updateitem"
        state={props.item}
        onClick={(e)=>e.stopPropagation()}
        >Update</Link>
      <button className=" btn btn-sm btn-error" 
      onClick={(e)=>{
       e.stopPropagation()
       document.getElementById('my_modal_2').showModal()
      }}
      >Delete</button>
      
    </div>
  </div>
  
<dialog id="my_modal_2" className="modal" onClick={(e)=>e.stopPropagation()}>
  <div className="modal-box">
    <h3 className="font-bold text-lg">Deleting Item</h3>
    <p className="py-4">This action can not be revoked once done!</p>
    <div className="modal-action flex justify-center">
      <form method="dialog" onSubmit={(e)=>{
        e.stopPropagation()
        props.productDeleteHandler(props.item._id)
      }}>
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-error mr-4 text-light" type='submit' onClick={(e)=>e.stopPropagation()}>Delete</button>
        <button className="btn" type='reset' onClick={(e)=>{
          e.stopPropagation()
          document.getElementById('my_modal_2').close()}}>Close</button>
      </form>
    </div>
  </div>
</dialog>

</div>
  )
}

export default AdminProductCard