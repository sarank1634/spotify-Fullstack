import { useContext } from 'react'
import './App.css'
import Display from './components/Display'
import Player from './components/Player'
import Sidebar from './components/Sidebar'
import { PlayerContext } from './context/PlayerContext'

function App() {

  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black">{
      songsData && songsData.length !== 0
        ? <>
          <div className='h-[85%] flex'>
            <Sidebar />
            <Display />
          </div>
          <Player />
        </>
        : null
    } 
    {/*tracking files  */}
      <audio ref={audioRef} src={track ? track.file : null} preload='auto'></audio>
    </div>
  )
}

export default App;
