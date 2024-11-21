import  { useContext, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Contexts";

const AddProductForm = () => {
    const {api}= useContext(AppContext)
    const [image, setImage] = useState("")
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

   const handleSubmit = async() => {
    try {
        const data =new FormData()
        data.append("name",formData.name)
        data.append("price",formData.price)
        data.append("type",formData.type)
        data.append("description",formData.description)
        data.append("image",image)
        const response =await api.post("/additem",data)
        console.log(response)
        // console.log({...formData,image})
        if(response.status === 200){
            navigate("/products")
        }
    } catch (error) {
        console.log(error)
    }
    // console.log("Form Data:", formData);
    // Add further logic here
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 lg:shadow-lg xl:shadow-lg lg:rounded-lg xl:rounded-lg">
        <h6 className="text-left text-xl" onClick={()=>navigate(-1)}><IoMdArrowRoundBack /></h6>
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Item</h2>
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
          className="btn btn-primary w-full"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
