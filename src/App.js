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
    'X-RapidAPI-Key': '136dbafabdmsh324dbd9bc3a44cep132ec4jsn92bea8b9aea7',
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
  },
};

const searchSongURL = 'https://shazam.p.rapidapi.com/search'
const TopChartsURL = 'https://shazam.p.rapidapi.com/charts/track'

 function App() {
  
  const [home,setHome] = useState(true)
  const [favorites,setFavorites] = useState(false)
  const [search,setSearch] = useState(false)
  const [topCharts,setTopCharts] = useState(null)
  const [selectedSong,setSelectedSong] = useState(null)
  const [information,setInformation] = useState(null)
  const [songProgress,setSongProgress] = useState(0)
  const [songFavorites,setSongFavorites] = useState([])  
  const [volume,setVolume]=useState(1.0)
  const [searchSongs,setSearchSongs] = useState(null)
  const [favoriteIndex,setFavoriteIndex] = useState(0)
  const [searchIndex,setSearchIndex] = useState(0)
  const [usernames,setUserNames]=useState(null)

  

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


  

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/current-user', { withCredentials: true });
        setUserNames(response.data);
        
        console.log('This is the username:', response.data);
      } catch (error) {
        console.error('Error in obtaining username', error);
        
      }
    };

    fetchUsername();
  }, []);

  

const musicPlayerRef = useRef(null);



const nextAudioSearchRef = useRef(new Audio())

const playNextSongSearch = () => {
  if (searchIndex != null && searchSongs && searchSongs.tracks.hits.length > 0) {
    const nextIndex = (searchIndex + 1) % searchSongs.tracks.hits.length;
    setSearchIndex(nextIndex);
    const nextSong = searchSongs.tracks.hits[nextIndex];

    if (nextSong) {
      const nextAudio = nextAudioSearchRef.current;
      nextAudio.src = nextSong.track.hub.actions[1].uri;

      const nextSongData = {
        song: nextSong.track.hub.actions[1].uri,
        audioRef: nextAudioSearchRef,
      };

      stopSong();
      nextAudioSearchRef.current.pause();
      playSong(nextSongData);

      if (nextAudioSearchRef.current) {
        nextAudioSearchRef.current.addEventListener("ended", () => {
          stopSong();
        });
      }
    }
  }
};


const prevAudioSearchRef = useRef(new Audio())
const playPrevSongSearch = () => {
  if (searchIndex != null && searchSongs && searchSongs.tracks.hits.length > 0) {
    const prevIndex = (searchIndex -1 + searchSongs.tracks.hits.length) % searchSongs.tracks.hits.length;
    setFavoriteIndex(prevIndex);
    const prevSong = searchSongs.tracks.hits[prevIndex];

    if (searchSongs) {
      const prevAudio = prevAudioSearchRef.current;
      prevAudio.src = prevSong.track.hub.actions[1].uri;
      //prevAudio.volume = selectedSong.audioRef.current.volume;

      const prevSongData = {
        song: prevSong.track.hub.actions[1].uri,
        audioRef: prevAudioSearchRef,
      };
      stopSong()
      prevAudioSearchRef.current.pause()
      playSong(prevSongData);

      if (prevAudioSearchRef.current) {
        prevAudioSearchRef.current.addEventListener("ended", () => {
          stopSong();
        });
      }
    }
  }
};



const nextAudioFavRef = useRef(new Audio())
const playNextSongFavorites = () => {
  if (favoriteIndex != null) {
    const nextIndex = (favoriteIndex + 1) % songFavorites.length;
    setFavoriteIndex(nextIndex);
    const nextSong = songFavorites[nextIndex];

    if (songFavorites) {
      const nextAudio = nextAudioFavRef.current;
      nextAudio.src = nextSong.audio;

      const nextSongData = {
        song: nextSong.audio,
        audioRef: nextAudioFavRef,
      };
      stopSong()
      nextAudioFavRef.current.pause()
      playSong(nextSongData);

      if (nextAudioFavRef.current) {
        nextAudioFavRef.current.addEventListener("ended", () => {
          stopSong();
        });
      }
    }
  }
};


const prevAudioFavRef = useRef(new Audio())
const playPrevSongFavorites = () => {
  if (favoriteIndex != null) {
    const prevIndex = (favoriteIndex -1 + songFavorites.length) % songFavorites.length;
    setFavoriteIndex(prevIndex);
    const prevSong = songFavorites[prevIndex];

    if (songFavorites) {
      const prevAudio = prevAudioFavRef.current;
      prevAudio.src = prevSong.audio;
      prevAudio.volume = selectedSong.audioRef.current.volume;

      const prevSongData = {
        song: prevSong.audio,
        audioRef: prevAudioFavRef,
      };
      stopSong()
      prevAudioFavRef.current.pause()
      playSong(prevSongData);

      if (prevAudioFavRef.current) {
        prevAudioFavRef.current.addEventListener("ended", () => {
          stopSong();
        });
      }
    }
  }
};




const deleteUser= async()=>{
  try{
await axios.delete('http://localhost:8000/api/log-out')
}
catch(error){
console.error('Error in deleting the user', error)
}
}

return (
  <div className="App">
    <div className="playlist-background">
      {home === true ? <PlaylistHome usernames={usernames} /> : favorites ? <Playlist usernames={usernames} /> : search ? <SearchHeader usernames={usernames} 
      fetchSongs={fetchSongs} setSearchTerm={setSearchTerm} searchTerm={searchTerm} stopSong={stopSong} 
      /> : null}
    </div>
    <Sidebar showHome={show_home} showFavorites={show_favorites} showSearch={show_search} deleteUser={deleteUser} />

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
          playNextSongFavorites={playNextSongFavorites}
          favorites={favorites}
          favoriteIndex={favoriteIndex}
          setFavoriteIndex={setFavoriteIndex}
          playPrevSongFavorites={playPrevSongFavorites}
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
          playNextSongSearch={playNextSongSearch}
          playPrevSongSearch={playPrevSongSearch}
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
                playPrevSongSearch={playPrevSongSearch}
                playNextSongSearch={playNextSongSearch}
                searchIndex={searchIndex}
                search={search}
                searchSongs={searchSongs}
                setSearchIndex={setSearchIndex}
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