import React, { useState } from 'react'
import { assets } from '../assets/assets';


const AddAlbum = () => {

  const [image, setImage] = useState(false);
  const [color, setColor] = useState("fffffff")
  const [name, setName] =useState("")
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form className="flex flex-col items-start gap-8 text-gray-600">
      <div className="flex flex-col gap-4">
          <p>upload image</p>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" accept='image/*' hidden />
          <label htmlFor="image">
            <img className='w-24 cursor-pointer' src={image ? URL.createObjectURL(image) :assets.upload_area} alt="" />
          </label>
      </div>
      <div className="flex flex-col gap-4">
        <p>Album Name</p>
        <input className='bg-transparent outline-greeen-600 border-2 border-gray-400 p-2.5 w-[max(max(40vw, 250px)]' type="text" placeholder='Type here' />
      </div>
      <div className="flex flex-col gap-4">
        <p>Album description</p>
        <input className='bg-transparent outline-greeen-600 border-2 border-gray-400 p-2.5 w-[max(max(40vw, 250px)]' type="text" placeholder='Type here' />
      </div>
      <div className="flex flex-col gap-3">
        <p>Background Color</p>
        <input type="color" />
        <button className='text-base bg-black text-white py-2.5 px-14  cursor-pointer' type="submit" value="Add">Add</button>
      </div>
    </form>
  )
}
 export default AddAlbum;