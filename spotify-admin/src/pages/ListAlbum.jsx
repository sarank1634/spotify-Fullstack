import React, { useEffect } from 'react'
import { url } from '../App';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

 const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAblbums = async() => {

    try {

      const response = await axios.get(`${url}/api/album/list`);
      // axios puts the parsed JSON in response.data
      if (response.data.success) {
        setData(response.data.albums);
      } else {
        toast.error('Failed to load albums');
      }
      
    } catch (error) {
      toast.error('Error occured')
    }
  }

  const removeAlbum = async(id) => {

    try {
      
      const response = await axios.post(`${url}/api/album/remove`, { id });
      if(response.data.success){
        toast.success(response.data.message);
        await fetchAblbums();
      }
    } catch (error) {
      toast.error("Error removeing album")
    }

  }
  useEffect(()=> {
    fetchAblbums();
  }, [])

  return (
    <div>
      <p>All Albums List</p>
      <br />

      <div className="sm:grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
        <b>Image</b>
        <b>Name</b>
        <b>Description</b>
        <b>Color</b>
        <b>Action</b>
      </div>
      {data.map((item,index)=> {
        return (
          <div key={index} className="grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5">
            <img src={item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.desc}</p>
            <input type="color" value={item.bgColor} />
            <p onClick={() => removeAlbum(item._id)}  className='cursor-pointer'>X</p>


          </div>
        )
      })}
    </div>
  )
}


export default ListAlbum;