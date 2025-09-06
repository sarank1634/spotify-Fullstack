import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {url} from '../App'
import { toast } from 'react-toastify';


 const ListSong = () => {

  const [data, setData] = useState([]);

  const fetchSongs = async() => {

    try {
      const response = await axios.get(`${url}/api/songs/list`);
      //  console.log(res.data);

       if(response.data.success) {
        setData(response.data.songs)
       }
    } catch(error) {
      toast.error("Error occured")
    }

  }

  const removeSong = async(id) =>{
    try {
      
      const response = await axios.post(`${url}/api/songs/remove`, {id});

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchSongs();
      }
    } catch (error) {
      toast.error("Error removing song");
    }

  }

  useEffect(() => {
     fetchSongs();
  },[])

  return (
    <div>
         <p>All songs List</p>
         <br />
         <div className="hidden sm:grid sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Duration</b>
          <b>Album</b>
          <b>Action</b>
         </div>
          {data.map((item,index) => {
            return(
              <div key={index} className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5">
                <img className='w-12' src={item.image} alt="" />
                <p>{item.name}</p> 
                <p> {item.duration} </p>    
                <p>{item.album}</p>
                <p onClick={() =>removeSong(item._id)}>X</p>
            </div>
            )
          })}
    </div>
  )
}

export default ListSong;