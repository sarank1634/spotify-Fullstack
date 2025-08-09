import { createContext, useEffect,useRef, useState} from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[1]);// store 
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({ //set time status
        currentTime: {
            second:0,
            minute:0
        },
        totalTime:{
            second: 0,
            minute: 0
        }
    })

    const Play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    }

    const Pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }
    //random click song to play
    const PlayWithId = async (id) => {
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true);
    }

    const Previous = async()=> {
        if(track.id > 0) {
            await setTrack(songsData[track.id - 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }  

    const Next = async()=> {
        if(track.id < songsData.length-1) {
            await setTrack(songsData[track.id +1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }  
 //seek song to play
    const seekSong = async(e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration);
    }

    useEffect(() => {
        setTimeout(() => {

            audioRef.current.ontimeupdate = () => {
                 seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration*100))+"%" ; //cpncat 
                
                 setTime({ 
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60),
                    },
                    totalTime:{
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60),
                    }
                })
            }
        }, 1000);
    },[audioRef])

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        Play, Pause,
        PlayWithId,
        Previous, Next,
        seekSong
    }

    return(
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;