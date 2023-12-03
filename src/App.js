import Sidebar from './Components/Sidebar';
import MusicPlayer from './Components/MusicPlayer';
import Main from './Components/Main';
import Playlist from './Components/Playlist';
import PlaylistHome from './Components/PlaylistHome';
import HomeMain from './Components/Home_Main';
import SearchHeader from './Components/SearchHeader';
import './App.css';
import React,{useEffect, useState,useRef} from 'react';
import SearchResults from './Components/Search_Results';
import axios from 'axios';

const api_options={
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'd49948f7f9msh31004b1b44f6034p1b3e47jsn6c2a0f663014',
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
  },
};

const searchSongURL = 'https://shazam.p.rapidapi.com/search'
const TopChartsURL = 'https://shazam.p.rapidapi.com/charts/track'

 function App() {
  
  const [home,setHome] = useState(true)
  const [favorites,setFavorites] = useState(false)
  const [search,setSearch] = useState(false)
  const [topCharts,setTopCharts] = useState([])
  const [selectedSong,setSelectedSong] = useState(null)
  const [information,setInformation] = useState(null)
  const [songProgress,setSongProgress] = useState(0)
  const [songFavorites,setSongFavorites] = useState([])  
  const [volume,setVolume]=useState(1.0)
  const [searchSongs,setSearchSongs] = useState([])

  

  const stopSong=()=>{// Aceasta functie este folosita pentru a opri melodia din redare
    if(selectedSong&&selectedSong.audioRef&&selectedSong.audioRef.current){
      selectedSong.audioRef.current.pause()
    }
    setSelectedSong(null)
  };

const playSong=(songData)=>{ // Aceasta functie este folosita pentru a seta valoarea variabilei selectedSong la null
  //Pentru a apela metoda Play a elementului audio si pentru a updata obiectul selectedSong. Acesta va retine fisierul audio si referinta catre elementul audio folosit curent
  setSelectedSong(null)
  if(songData&&songData.audioRef&&songData.audioRef.current)
  {
    songData.audioRef.current.play()
    setSelectedSong(songData)
  }
  setSelectedSong(songData)
  setInformation({songData})

};



  const show_home=(e)=>{
    e.preventDefault()
    setHome(true)
    setFavorites(false)
    if(selectedSong && selectedSong.audioRef.current){
      selectedSong.audioRef.current.pause()
      setSelectedSong(null)
    }
  };
  const show_favorites = (e) =>{
    e.preventDefault()
    setFavorites(true)
    setHome(false)
    if(selectedSong && selectedSong.audioRef.current){
      selectedSong.audioRef.current.pause()
      setSelectedSong(null)
    }
  }

  const show_search= (e) =>{
   e.preventDefault()
   setSearch(true)
   setFavorites(false)
   setHome(false)
   if(selectedSong && selectedSong.audioRef.current){
    selectedSong.audioRef.current.pause()
    setSelectedSong(null)
  }
  }


  



useEffect(()=>{
  const fetchCharts = async() =>{
    try {
    const response = await axios.get(TopChartsURL,api_options)
    setTopCharts(response.data)
    console.log(topCharts)
   }
   catch(error){
    console.log("Error in obtaining data:" ,error)//Se incearca executia codului.Daca apare o eroare aceasta va fi prinsa de blocul/functia catch si afisata in consola
   }
  }
  if(home){
    fetchCharts();
  }
},[]) // The empty dependency array ensures this effect runs only once. 
//Cand executi operatii in fundal precum retinerea datelor de la API se foloseste UseEffect

const [searchTerm,setSearchTerm] = useState('')

  const fetchSongs = async(searchTerm)=>{
     try{
     const response = await axios.get(searchSongURL,{
      ...api_options,
      params:{
        term:searchTerm,
      },
    });
     setSearchSongs(response.data)
     console.log(searchSongs)
     }
     catch(error){
      console.log("Error in obtaining data:" ,error)
     }
  }


const musicPlayerRef = useRef(null);


return (
  <div className="App">
    <div className="playlist-background">
      {home === true ? <PlaylistHome /> : favorites ? <Playlist /> : search ? <SearchHeader 
      fetchSongs={fetchSongs} setSearchTerm={setSearchTerm} searchTerm={searchTerm} stopSong={stopSong} 
      /> : null}
    </div>
    <Sidebar showHome={show_home} showFavorites={show_favorites} showSearch={show_search} />

    <div>
      {home === true ? (
        <div>
          <HomeMain
            topCharts={topCharts}
            playSongApp={playSong}
            stopSongApp={stopSong}
            selectedSong={selectedSong}
            setSelectedSong={setSelectedSong}
            setInformation={setInformation}
            volume={volume}
            ref={musicPlayerRef}
            songProgress={songProgress}
            setSongProgress={setSongProgress}
            information={information}
            songFavorites={songFavorites}
            setSongFavorites={setSongFavorites}
            setVolume={setVolume}
          />
          {selectedSong && (
            <div className="MusicPlayer-container">
              <MusicPlayer
                ref={musicPlayerRef}
                selectedSong={selectedSong}
                songProgress={songProgress}
                setSongProgress={setSongProgress}
                information={information}
                songFavorites={songFavorites}
                setSongFavorites={setSongFavorites}
                volume={volume}
                setVolume={setVolume}
                setInformation={setInformation}
                stopSong={stopSong}
              />
            </div>
          )}
        </div>
      ) : favorites ? (
        <div>
          <Main 
          selectedSong={selectedSong}
          songFavorites={songFavorites}
          playSong={playSong}
          songProgress={songProgress}
          setSongProgress={setSongProgress}
          information={information}
          setSongFavorites={setSongFavorites}
          volume={volume}
          setVolume={setVolume}
          setInformation={setInformation}
          topCharts={topCharts}
          playSongApp={playSong}
          setSelectedSong={setSelectedSong}
          stopSong={stopSong}
          />
          {selectedSong && (
            <div className="MusicPlayer-container">
              <MusicPlayer
                ref={musicPlayerRef}
                selectedSong={selectedSong}
                songProgress={songProgress}
                setSongProgress={setSongProgress}
                information={information}
                songFavorites={songFavorites}
                setSongFavorites={setSongFavorites}
                volume={volume}
                setVolume={setVolume}
                setInformation={setInformation}
                stopSong={stopSong}
              />
            </div>
          )}
        </div>
      ) : search ? (
        <div>
          <SearchResults 
          searchSongs={searchSongs}
          setSearchSongs={setSearchSongs}
          playSongHome={playSong}
          stopSong={stopSong}
          setInformation={setInformation}
          selectedSong={selectedSong}
          volume={volume}
          />
          {selectedSong && (
            <div className="MusicPlayer-container2">
              <MusicPlayer
                ref={musicPlayerRef}
                selectedSong={selectedSong}
                songProgress={songProgress}
                setSongProgress={setSongProgress}
                information={information}
                songFavorites={songFavorites}
                setSongFavorites={setSongFavorites}
                volume={volume}
                setVolume={setVolume}
                setInformation={setInformation}
              />
            </div>
          )}
        </div>
      ) : null}
    </div>
  </div>
);
}

export default App;