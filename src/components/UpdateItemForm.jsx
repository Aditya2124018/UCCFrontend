import  { useContext, useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/Contexts";
import toast from "react-hot-toast";

const UpdateItemForm = () => {
    const {api}= useContext(AppContext)
    const [image, setImage] = useState("")
    let item = useLocation()
    const [isPending, setIsPending] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    
    description: "",
    type: "Product",
  });
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:  value,
    }));
  };

  const getItemData = async()=>{
    
    try {
       
        console.log(item)
        item = item.state
        setFormData({
                name: item.name,
                price: item.price,
                
                description: item.description,
                type: item.type,
              })
       
        
    } catch (error) {
        console.log(error.message)
    }
  }
  useEffect(()=>{
  getItemData()

  //eslint-disable-next-line
  },[])

   const handleSubmit = async() => {
    setIsPending(true)
    try {
        const data =new FormData()
        data.append("name",formData.name)
        data.append("price",formData.price)
        data.append("type",formData.type)
        data.append("description",formData.description)
        data.append("image",image)
        const response =await api.post(`/updateItem/${item.state._id}`,data)
        console.log(response)
        // console.log({...formData,image})
        if(response.status === 200){
            navigate("/products")
            toast.success(response.data.message)
        }
    } catch (error) {
      setIsPending(false)
        // console.log(error)
        toast.error(error.response.data.message)
    }
    setIsPending(false)
    // console.log("Form Data:", formData);
    // Add further logic here
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 lg:shadow-lg xl:shadow-lg lg:rounded-lg xl:rounded-lg">
        <h6 className="text-left text-xl" onClick={()=>navigate(-1)}><IoMdArrowRoundBack /></h6>
      <h2 className="text-2xl font-bold mb-6 text-center">Update Item</h2>
      <div className='w-36 h-36  mx-auto rounded-full overflow-hidden'>
        <img src={item.state.imageURL} alt="" className='h-full w-full object-contain' />
      </div>
      <form className="space-y-4">
        {/* Item Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Item Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter item name"
            className="input input-bordered w-full"
          />
        </div>

        {/* Item Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Item Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter item price"
            className="input input-bordered w-full"
          />
        </div>

        {/* Item Image */}
        <div>
          <label className="block text-sm font-medium mb-1">Item Image</label>
          <input
            type="file"
            name="image"
            onChange={(e)=>{
                setImage(e.target.files[0])
            }}
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Item Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Item Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter item description"
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        {/* Item Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Item Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="Product">Product</option>
            <option value="Service">Service</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-warning w-full"
          disabled={isPending}
        >
          {isPending?"Updating...":"Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateItemForm;
