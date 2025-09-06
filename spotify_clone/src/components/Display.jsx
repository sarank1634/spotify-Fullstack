import { Route, Routes, useLocation } from "react-router-dom"
import Displayhome from "./Display home"
import DisplayAlbum from './DisplayAlbum'
import { useEffect, useRef } from "react"
import { albumsData } from "../assets/assets"
import { useContext } from "react"
import { PlayerContext } from "../context/PlayerContext"

const Display = () => {

   const displayRef = useRef();
   const location = useLocation(); //locate current path
   const isAlbum = location.pathname.includes("album"); //album
   const albumId = isAlbum ? location.pathname.split('/').pop() : "";
   const bgColor = isAlbum && albumData.length > 0 ? albumsData.find((x) =>  (x._id == albumId)).bgColor : "#121212"
    
    const {albumData} = useContext(PlayerContext);

   useEffect(() => {
    if(isAlbum) {
        displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`
    } else {
        displayRef.current.style.background = `#121212`
    }
   })
   return(
        <div ref={displayRef} className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
         {albumData?.length > 0 ?
            <Routes>
                <Route path="/" element={<Displayhome />} />
                <Route path="/album/:id" element={<DisplayAlbum album={albumData.find((x) => (x._id == albumId))} />} />
            </Routes>
            : null
            }
        </div>
    )
}

export default Display;