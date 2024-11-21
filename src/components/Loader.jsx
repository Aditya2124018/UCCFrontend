// import React from 'react'

function Loader() {
    function getInput(){
        console.log("Item Deleted.")
    }
  return (
    <div className='h-[100vh] flex flex-col justify-center items-center'>
        {/* <span className="loading loading-ring loading-lg "></span> */}
        {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Deleting</h3>
    <p className="py-4">This action can not be revoked once done!</p>
    <div className="modal-action flex justify-center">
      <form method="dialog" onSubmit={getInput}>
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-error mr-4 text-light" type='submit'>Delete</button>
        <button className="btn" type='reset' onClick={()=>document.getElementById('my_modal_1').close()}>Close</button>
      </form>
    </div>
  </div>
</dialog>

        {/* <h1>Loading</h1> */}
    </div>
  )
}

export default Loader