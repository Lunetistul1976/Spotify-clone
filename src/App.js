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
    'X-RapidAPI-Key': '136dbafabdmsh324dbd9bc3a44cep132ec4jsn92bea8b9aea7',
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
  },
};


const TopChartsURL = 'https://shazam.p.rapidapi.com/charts/track'

 function App() {
  
  const [home,setHome] = useState(true)
  const [favorites,setFavorites] = useState(false)
  const [search,setSearch] = useState(false)
  const [topCharts,setTopCharts] = useState([])

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
    const response = await axios.get(TopChartsURL,api_options)
    setTopCharts(response.data)
    console.log(topCharts)
   }
  if(home===true){
    fetchCharts();
  }
},[ ]) // The empty dependency array ensures this effect runs only once. Cand executi operatii in fundal precum retinerea datelor de la API se foloseste UseEffect



  return (
    <div className="App">
      <div className="playlist-background">
        {home === true ? <PlaylistHome  />: favorites?<Playlist/>: search?<SearchHeader/>:null}
      </div>
      <Sidebar showHome={show_home} showFavorites={show_favorites} showSearch={show_search}/> {/* Pentru a transmite date/proprietati din componenta aplicatie va trebui sa pozitionez aceea functie
      / atribut intre {} si sa ii asociez o variabila. Este bine ca numele se coincida */}
      {home===true ? <HomeMain topCharts={topCharts} />: favorites?<Main/>: search?<SearchResults/>:null}
      <MusicPlayer />
    </div>
  );
}

export default App;
