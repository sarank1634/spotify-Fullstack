import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    const [albumsData, setAlbumsData] = useState([]);
    const [songsData, setSongsData] = useState([]);
    const [track, setTrack] = useState(null);
    const baseUrl = 'http://localhost:4000';



    // track will be set after songs are fetched
    // const [track, setTrack] = useState(songsData[1]); // removed
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
        if (songsData && songsData[id]) {
            setTrack(songsData[id]);
            audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const Previous = async () => {
        if (track && track.id > 0 && songsData) {
            setTrack(songsData[track.id - 1]);
            audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const Next = async () => {
        if (track && songsData && track.id < songsData.length - 1) {
            setTrack(songsData[track.id + 1]);
            audioRef.current.play();
            setPlayStatus(true);
        }
    }
 //seek song to play
    const seekSong = async(e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration);
    }

    const getSongsData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/songs/list`);
            // Assuming the API returns { songs: [...] }
            setSongsData(response.data.songs || []);
            // Set initial track to first song if available
            if (response.data.songs && response.data.songs.length > 0) {
                setTrack(response.data.songs[0]);
            }
        } catch (error) {
            console.error('Failed to fetch songs:', error);
        }
    }

    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/albums/list`);
            setAlbumsData(response.data.albums || []);
        } catch (error) {
            console.error('Failed to fetch albums:', error);
        }
    }

    useEffect(() => {
        getAlbumsData();
        getSongsData();
    }, []);


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
        playStatus,
        setPlayStatus,
        time,
        setTime,
        Play,
        Pause,
        PlayWithId,
        Previous,
        Next,
        seekSong,
        getAlbumsData,
        getSongsData,
        albumsData,
        setAlbumsData,
        songsData,
        setSongsData
    }

    return(
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;