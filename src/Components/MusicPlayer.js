import React, { useEffect, useRef,useState } from "react";
import '../CSS/MusicPlayer.css'
import play from '../Images/Play-button.png'
import favorites from '../Images/Favorites.png'
import previous from '../Images/Previous-song.png'
import next from '../Images/Next-song.png'
import repeat from '../Images/Repeat.png'
import Volume from '../Images/Volume.png'
import stop from '../Images/Stop_button.svg'
import heart from '../Images/red_heart.png'

const MusicPlayer = ({ selectedSong, songProgress, setSongProgress,setInformation,topCharts,playSongApp
  ,information,setSongFavorites,songFavorites,volume,setVolume }) => {

const [currentIndex,setCurrentIndex] = useState(0)
const allIndices=[8,3,9,7,2,10,5,11,4]

  const inputRef = useRef(null)
  const volumeRef = useRef(null)

 

  useEffect(() => {
    // Verifica daca o melodie este selectata
    if (selectedSong) {

      const audioRef = selectedSong.audioRef
      
      if ((audioRef && audioRef.current)) {
        // Functia care actualizeaza progresul melodiei

        const updateProgress = () => {
          if (audioRef.current){
          const newProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100
          setSongProgress(newProgress)
          }
        }
        
        // Adauga un eveniment pentru a asculta schimbarile de timp in melodie
        audioRef.current.addEventListener('timeupdate', updateProgress)
        // Returneaza o functie pentru a elimina evenimentul dupa ce componenta se demonteaza
        return () => {
          if (audioRef.current) {
            audioRef.current.removeEventListener('timeupdate', updateProgress);
          }
        }
      }
    }
  }, [setSongProgress, selectedSong])

  useEffect(() => {
    // Verifica daca referinta la input exista si daca nu se cauta o pozitie noua pe elementul input
    if (inputRef.current && !inputRef.current.isSeeking) { // Elementul input va fi sincronizat cu progresul melodiei doar atunci cand utilizatorul nu cauta o pozitie noua pe bara de redare
      // Actualizeaza valoarea inputului cu progresul melodiei
      inputRef.current.value = songProgress // Song Progress retine progresul melodiei care va fi reprezentat pe input element
    }
  }, [songProgress])



// Funcția care gestionează schimbarea volumului
const handleVolumeChange = (value) => {
    // Verificăm dacă există variabilele volume și setVolume
    if (volume && setVolume) {
        // Convertim valoarea primită la tipul de date float
        const newVolume = parseFloat(value);

        // Actualizăm informațiile cu noul volum
        setInformation((prevInformation) => ({
            ...prevInformation,
            volume: newVolume,
        }));

        // Actualizăm volumul audio-ului în curs de redare (dacă există)
        if (selectedSong && selectedSong.audioRef && selectedSong.audioRef.current) {
            selectedSong.audioRef.current.volume = newVolume;
            // Setăm muted la true dacă volumul este 0
            selectedSong.audioRef.current.muted = newVolume === 0;
        }
    }
};
  


  const handleSeek = (value) => {
    // Verifica daca melodia este selectata si referinta catre elementul audio exista
    if (selectedSong && selectedSong.audioRef && selectedSong.audioRef.current) {
      // Calculeaza noua pozitie in timp in functie de valoarea selectata de utilizator
      const newTime = (value / 100) * selectedSong.audioRef.current.duration //Ex: value=40 Melodia va fi redata de la momentul in care 40% din melodie este parcursa
      // Actualizeaza timpul curent al melodiei
      selectedSong.audioRef.current.currentTime = newTime
      // Actualizeaza progresul melodiei
      setSongProgress(value)
    }
  }

  const playButton = () => {
    if (selectedSong && selectedSong.audioRef && selectedSong.audioRef.current) {
      const audioElement = selectedSong.audioRef.current;
      if (audioElement) {
        if (audioElement.paused) {
          audioElement.play();
        } else {
          audioElement.pause();
        }
      }
    } else {
      console.error('Selected song or audioRef is not properly initialized');
    }
  }
  

  const replayButton= ()=>{
    if(selectedSong&&selectedSong.audioRef&&selectedSong.audioRef.current){
      selectedSong.audioRef.current.load()
      selectedSong.audioRef.current.play()
    }
  }

  const favoritesButton=()=>{
    if(information&&songFavorites&&setSongFavorites){
      // Check if the song is already in favorites
    const isFavorite = songFavorites.some((favorites)=> favorites.title === information.title && favorites.artist === information.artist) 
    if(!isFavorite){
       // If the song is not in favorites, add it
      setSongFavorites((prevFavorites)=>[...prevFavorites,information])
      console.log('Cantecele favorite sunt:', songFavorites);
    }
    else{
      console.log("Song is already favorite")
    }
    }
  }
 

  
  // Funcția pentru a trece la următoarea melodie
const nextButton = () => {
  // Verifică dacă există date pentru toate indicii și dacă currentIndex nu este null
  if (allIndices && currentIndex != null) {
      // Calculează următorul index în mod circular
      const nextIndex = (currentIndex + 1) % allIndices.length;

      // Actualizează currentIndex cu următorul index
      setCurrentIndex(nextIndex);

      // Obține indexul melodiei următoare
      const nextSongIndex = allIndices[nextIndex];

      // Verifică dacă există date valide pentru următoarea melodie și dacă există o melodie selectată cu o referință audio
      if (
          topCharts &&
          topCharts.tracks &&
          topCharts.tracks[nextSongIndex] &&
          topCharts.tracks[nextSongIndex].hub.actions&&
          selectedSong&& selectedSong.audioRef 
         && selectedSong.audioRef.current
      ) {
      const  nextAudio=selectedSong.audioRef
      nextAudio.current.src=topCharts.tracks[nextSongIndex].hub.actions[1].uri
        
          // Creează obiectul pentru următoarea melodie
          const nextSongData = {
              title: topCharts.tracks[nextSongIndex].title,
              artist: topCharts.tracks[nextSongIndex].subtitle,
              image: topCharts.tracks[nextSongIndex].images.coverart,
              song:  topCharts.tracks[nextSongIndex].hub.actions[1].uri,
              audioRef:nextAudio,
              
              
            //Codul functioneaza cu exceptia acestei instructiuni.Cel mai probabil referinta catre elementul audio asociat fisierului audio nu este corecta.
              // De revizuit ce se intmapla cu elementul audio + De ce nu se opreste din redare elementul curent+ De ce nu incepe redarea elementul selectat
          };
          
          // Redă următoarea melodie
          playSongApp(nextSongData);
          
          
       
}}};



const previousButton=()=>{
  // Verifică dacă există date pentru toate indicii și dacă currentIndex nu este null
  if (allIndices && currentIndex != null) {
    // Calculează următorul index în mod circular
    const previousIndex = (currentIndex-1+allIndices.length) % allIndices.length;

    // Actualizează currentIndex cu următorul index
    setCurrentIndex(previousIndex);
    // Obține indexul melodiei următoare
    const nextSongIndex = allIndices[previousIndex];
    // Verifică dacă există date valide pentru următoarea melodie și dacă există o melodie selectată cu o referință audio
    if (
        topCharts &&
        topCharts.tracks &&
        topCharts.tracks[nextSongIndex] &&
        topCharts.tracks[nextSongIndex].hub.actions&&
        selectedSong&& selectedSong.audioRef 
       && selectedSong.audioRef.current
    ) {
     const nextAudio=selectedSong.audioRef
        // Creează obiectul pentru următoarea melodie
        const nextSongData = {
            title: topCharts.tracks[nextSongIndex].title,
            artist: topCharts.tracks[nextSongIndex].subtitle,
            image: topCharts.tracks[nextSongIndex].images.coverart,
            song:  topCharts.tracks[nextSongIndex].hub.actions[1].uri,
            audioRef:nextAudio,
            
            
          //Codul functioneaza cu exceptia acestei instructiuni.Cel mai probabil referinta catre elementul audio asociat fisierului audio nu este corecta.
            // De revizuit ce se intmapla cu elementul audio + De ce nu se opreste din redare elementul curent+ De ce nu incepe redarea elementul selectat
        };
        
        nextAudio.current.src=topCharts.tracks[nextSongIndex].hub.actions[1].uri
        // Redă următoarea melodie
        playSongApp(nextSongData);
       
      }
}

}
  
  const truncatedTitle = information.title.split('(')[0].trim()
  const truncatedArtist = information.artist.split('&')[0].trim()
  return (

    
    <div className="Music-Player-container">
     
     {information?(
      <div className="Album-info">
        <img src={information.image} alt="Album cover" />
        <h1>{truncatedTitle}</h1>
        <p>{truncatedArtist}</p>

      </div>
       ):console.log("Error, the properties can not be seen")}

       {information?(

<div className="music-layer-buttons">
{selectedSong && songFavorites && songFavorites.some((favorite) => favorite.title === information.title &&  favorite.artist === information.artist) ? (
  <img src={heart} alt="red_heart" />
) : (
  <img src={favorites} alt="favorites" onClick={favoritesButton} />
)}
<img src={previous} alt="previous" onClick={previousButton} />
{selectedSong && selectedSong.audioRef && selectedSong.audioRef.current ? (
  selectedSong.audioRef.current.paused ? (
    <img src={stop} alt="play" onClick={playButton} />
  ) : (
    <img src={play} alt="play" onClick={playButton} />
  )
) : null}
<img src={next} alt="next" onClick={nextButton} />
<img src={repeat} alt="repeat" onClick={replayButton} />
<img src={Volume} alt="volume" />
</div>

 ):console.log("Error, the properties can not be seen")}

      
      <input 
      ref={volumeRef}
      onChange={(e)=>handleVolumeChange(e.target.value)}
      type="range" 
      id="progresion-volume" 
      min='0' max='1'
      step="0.1"
      ></input>
      
      {songProgress ? (
        <input
          type="range"
          ref={inputRef}
          id="progresion-music"
          min="0"
          max="100"
          value={songProgress}
          onMouseDown={() => (inputRef.current.isSeeking = true)}
          onMouseUp={() => (inputRef.current.isSeeking = false)}
          onChange={(e) => handleSeek(e.target.value)}
        />
      ) : (
        null
      )}
     
    </div>
    
    
  )}
  /*Proprietatea isSeeking este adăugată pentru a urmări dacă utilizatorul este în curs de căutare (seeking) pe bara de progres a melodiei.

Atunci când utilizatorul face clic și ține apăsat pe bara de progres pentru a schimba poziția de redare a melodiei, evenimentul onMouseDown este activat și isSeeking este setată la true. În același timp, atunci când utilizatorul ridică degetul de pe bara de progres, evenimentul onMouseUp este activat și isSeeking este setată la false.

Prin verificarea stării isSeeking în useEffect, asigurăm că actualizarea valorii inputului se întâmplă doar atunci când utilizatorul nu este în proces de căutare, evitând astfel interferențe neașteptate cu interacțiunea utilizatorului. Aceasta asigură că valoarea bara de progres se actualizează doar în cazul în care utilizatorul nu este implicat activ în manipularea ei.*/


export default MusicPlayer;
