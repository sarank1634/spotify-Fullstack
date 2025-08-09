import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { albumsData, assets, songsData } from "../assets/assets";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";


const DispalyAlbum = () =>{

    const  {id} = useParams();
    const albumData = albumsData[id];
    const {PlayWithId} = useContext(PlayerContext);

    return(
        <>
            <Navbar />
            <div className="mt-10 inline-flex gap-8 flex-col md:flex-row md:items-start">
                <div className="inline-flex gap-20"> {/* same block  */}
                <img className="w-48 rounded" src={albumData.image} alt="" />
                <div className="flex flex-col gap-2">
                    <p>Playlist</p>
                    <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
                    <h4>{albumData.desc}</h4>
                    <p className="mt-1">
                        <img className="inline-block w-5" src={assets.spotify_logo} alt="" />
                        <b>Spotify</b> 
                        1,322,154 likes 
                        <b>50 songs,</b> 
                        about 2ht 30 min
                    </p>
                </div>
                </div>
                <div className="grid gap-9 grid-cols-4 sm:grid-cols-4 mt-10 mb-4 mt-4 ml-10 pl-2  text-[#a7a7a7]">
                    <p><b className=" mt-50 ml-55">#</b>Title</p>
                    <p className="mr-95 ml-30">Album</p>
                    <p className="sm:block mr-50">Date Added</p>
                    <img src= {assets.clock_icon} alt="" className="m-auto w-4" />
                </div>
            </div>
            <hr />
            {
                songsData.map((item, index) => ( // lick to play song inside Display album
                    <div onClick={() => PlayWithId(item.id)} key={index} className="grid grid-cols-3 sm:gird-cols-4 gap-6 p-2 items-center text-[#a7a7a7 hover:bg-[#ffffff2b cursor-pointer">
                        <p className="text-white">
                            <b className="mr-4 mt-2 text-[#a7a7a7]">{index+1}</b>
                            <img className="inline w-10 mr-5" src={item.image} alt="" />
                            {item.name}
                        </p>
                        <p className="text-[15px]">{albumData.name}</p>
                        <p className="text-[15px] sm:block ">5 days ago</p>
                        <p className="text-[15px] text-center">{item.duration}</p>
                    </div>
                )
            )
            }
        </>
    )
}

export default DispalyAlbum;