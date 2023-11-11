import Sidebar from './Components/Sidebar';
import MusicPlayer from './Components/MusicPlayer';
import Main from './Components/Main';
import Playlist from './Components/Playlist';
import PlaylistHome from './Components/PlaylistHome';
import HomeMain from './Components/Home_Main';
import SearchHeader from './Components/SearchHeader';
import './App.css';
import React,{useEffect, useState} from 'react';
import SearchResults from './Components/Search_Results';
import axios from 'axios';

const api_options={
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'fb2caa4809msh99ba38d666e8431p18e1dbjsn4f05e91d59c8',
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
  },
};


const TopChartsURL = 'https://shazam.p.rapidapi.com/charts/track'

 function App() {
  
  const [home,setHome] = useState(true)
  const [favorites,setFavorites] = useState(false)
  const [search,setSearch] = useState(false)
  const [topCharts,setTopCharts] = useState([])
  const [selectedSong,setSelectedSong] = useState(null)
  const [information,setInformation] = useState(null)
  const [songProgress,setSongProgress] = useState(0)

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
  }
  setSelectedSong(songData)
};



  const show_home=(e)=>{
    e.preventDefault()
    setHome(true)
    setFavorites(false)
  };
  const show_favorites = (e) =>{
    e.preventDefault()
    setFavorites(true)
    setHome(false)
  }

  const show_search= (e) =>{
   e.preventDefault()
   setSearch(true)
   setFavorites(false)
   setHome(false)
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



  return (
    <div className="App">
      <div className="playlist-background">
        {home === true ? <PlaylistHome  />: favorites?<Playlist/>: search?<SearchHeader/>:null}
      </div>
      <Sidebar showHome={show_home} showFavorites={show_favorites} showSearch={show_search}/> {/* Pentru a transmite date/proprietati din componenta aplicatie va trebui sa pozitionez aceea functie
      / atribut intre {} si sa ii asociez o variabila. Este bine ca numele se coincida */}
      {home===true ? <HomeMain topCharts={topCharts} playSongApp={playSong} stopSongApp={stopSong} selectedSong={selectedSong} setSelectedSong={setSelectedSong} />
      : favorites?<Main/>: search?<SearchResults/>:null}
      <MusicPlayer selectedSong={selectedSong} songProgress={songProgress} setSongProgress={setSongProgress} />
    </div>
  );
}

export default App;
