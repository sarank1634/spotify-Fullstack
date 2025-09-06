import React, { useState } from 'react'
import { assets } from '../assets/assets';
import {url} from '../App'
import axios from 'axios';
import { toast } from 'react-toastify';


const AddAlbum = () => {

  const [image, setImage] = useState(false);
  const [color, setColor] = useState("#121212")
  const [name, setName] =useState("")
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler =async(e) => {

    e.preventDefault();
    setLoading(true);
    try{
      const formData = new FormData();
      formData.append('name',name);
      formData.append('description',desc);
      formData.append('image',image);
      formData.append('color',color);

      const response = await axios .post(`${url}/api/albums/add`, formData);

      if(response.data.success) {
        toast.success(response.data.message);
        setDesc("");
        setName("");
        setColor("#121212");
        setImage(false);
      } else {
        toast.error("something went wrong")
      }
    } catch(error) {
      toast.error("Error occured")
    }
    setLoading(false);
  }
 
  return loading ? (
  <div className="gird place-items-center min-h-[80vh">
  <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin">
  </div>
 </div> 
) : (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-8 text-gray-600">
      <div className="flex flex-col gap-4">
          <p>upload image</p>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" accept='image/*' hidden />
          <label htmlFor="image">
            <img className='w-24 cursor-pointer' src={image ? URL.createObjectURL(image) :assets.upload_area} alt="" />
          </label>
      </div>
      <div className="flex flex-col gap-4">
        <p>Album Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='bg-transparent outline-greeen-600 border-2 border-gray-400 p-2.5 w-[max(max(40vw, 250px)]' type="text" placeholder='Type here' />
      </div>
      <div className="flex flex-col gap-4">
        <p>Album description</p>
        <input onChange={(e) => setDesc(e.target.value)} value={desc} className='bg-transparent outline-greeen-600 border-2 border-gray-400 p-2.5 w-[max(max(40vw, 250px)]' type="text" placeholder='Type here' />
      </div>
      <div className="flex flex-col gap-3">
        <p>Background Color</p>
        <input onChange={(e) => setColor(e.target.value)} value={color}  type="color" />
        <button className='text-base bg-black text-white py-2.5 px-14  cursor-pointer' type="submit" value="Add">Add</button>
      </div>
    </form>
  )

}
 export default AddAlbum;