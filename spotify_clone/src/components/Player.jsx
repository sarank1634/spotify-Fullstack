import { useContext } from "react";
import { assets,  } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";


const Player = () => {

    const {track,seekBar,seekBg,playStatus,Play,Pause,time,Previous,Next,seekSong} = useContext(PlayerContext)
    
    return(
        <div className="h-[15%] bg-black flex justify-between items-center text-white px-4 ">
              <div className="lg:flex items-center gap-4">
                <img className="w-12" src={track.image} alt="" />
                <div>
                    <p>{track.name}</p>
                    <p>{track.desc.slice(0,12)}</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 m-auto">
                <div className="flex gap-4">
                    <img className="w-4 cursor-pointer" src={assets.shuffle_icon} alt="" />
                    <img onClick={Previous} className="w-4 cursor-pointer" src={assets.prev_icon} alt="" />
                    {playStatus ?
                     <img onClick={Pause} className="w-4 cursor-pointer" src={assets.pause_icon} alt="" /> //use ternary oprator to check play or not
                    : <img onClick={Play} className="w-4 cursor-pointer" src={assets.play_icon} alt="" />
                    }
                    <img onClick={Next} className="w-4 cursor-pointer" src={assets.next_icon} alt="" />
                    <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="" />
                </div>
                <div ref={seekBg}  onClick={seekSong} className="flex items-center gap-5">
                    <p>{time.currentTime.minute}:{time.currentTime.second}</p>
                    <div className="w-[60vw] max-w-[500px] h-1 bg-gray-600 rounded-full cursor-pointer group relative">
                       <div ref={seekBar} className="absolute top-0 left-0 h-full bg-green-500 rounded-full group-hover:bg-green-400 transition-all duration-300" style={{ width: '0%' }}></div> 
                    </div>
                    <p>{time.totalTime.minute}:{time.totalTime.second}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-75">
                <img className="w-4" src={assets.plays_icon} alt="" />
                <img className="w-4" src={assets.mic_icon} alt="" />
                <img className="w-4" src={assets.queue_icon} alt="" />
                <img className="w-4" src={assets.speaker_icon} alt="" />
                <img className="w-4" src={assets.volume_icon} alt="" />
                <img className="w-20 bg-slate-50 h-1 rounded" src={assets.clock_icon} alt="" />
              </div>

        </div>
    )
}


export default Player;
