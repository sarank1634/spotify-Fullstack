import { useState } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Routes,Route } from 'react-router-dom';
import AddSong from './pages/AddSong';
import { AddAlbum } from './pages/AddAlbum';
import { ListSong } from './pages/ListSong';

function App() {
 

  return (
    <>
     <div className="flex items-start min-h-screen">
      <ToastContainer />
      
      <div className="flex-1 h-screen overflow-y-scroll bg-[#FFF7]">
        <div className="PT-8 PL-5 SM:PL-12">
          <Routes>
            <Route path='/' element={<AddSong />} />
            <Route path='/add-album' element={<AddAlbum />} />
            <Route path='/list-song' element={<ListSong />} /> 
            <Route path='/list-album' element={<ListAlbum />} />
          </Routes>  

        </div>
      </div>
     </div>
    </>
  )
}

export default App
