import React, { useEffect, useRef } from "react";
import '../CSS/MusicPlayer.css'
import album from '../Images/Album_cover.png'
import play from '../Images/Play-button.png'
import random from '../Images/Random-button.png'
import previous from '../Images/Previous-song.png'
import next from '../Images/Next-song.png'
import repeat from '../Images/Repeat.png'
import volume from '../Images/Volume.png'

const MusicPlayer = ({ selectedSong, songProgress, setSongProgress }) => {

  const inputRef = useRef(null)
  useEffect(() => {
    // Verifica daca o melodie este selectata
    if (selectedSong) {

      const audioRef = selectedSong.audioRef
      if (audioRef && audioRef.current) {
        // Functia care actualizeaza progresul melodiei
        const updateProgress = () => {
          const newProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100
          setSongProgress(newProgress)
        }
        // Adauga un eveniment pentru a asculta schimbarile de timp in melodie
        audioRef.current.addEventListener('timeupdate', updateProgress)
        // Returneaza o functie pentru a elimina evenimentul dupa ce componenta se demonteaza
        return () => {
          audioRef.current.removeEventListener('timeupdate', updateProgress)
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

  return (
    <div className="Music-Player-container">
      <div className="Album-info">
        <img src={album} alt="Album cover" />
        <h1>Easy</h1>
        <p>KSI</p>
      </div>

      <div className="music-layer-buttons">
        <img src={random} alt="random button" />
        <img src={previous} alt="previous" />
        <img src={play} alt="play" />
        <img src={next} alt="next" />
        <img src={repeat} alt="repeat" />
        <img src={volume} alt="volume" />
      </div>


      <input type="range" id="progresion-volume" min='0' max='100'></input>
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
        <p>Error</p>
      )}
    </div>
  )
  /*Proprietatea isSeeking este adăugată pentru a urmări dacă utilizatorul este în curs de căutare (seeking) pe bara de progres a melodiei.

Atunci când utilizatorul face clic și ține apăsat pe bara de progres pentru a schimba poziția de redare a melodiei, evenimentul onMouseDown este activat și isSeeking este setată la true. În același timp, atunci când utilizatorul ridică degetul de pe bara de progres, evenimentul onMouseUp este activat și isSeeking este setată la false.

Prin verificarea stării isSeeking în useEffect, asigurăm că actualizarea valorii inputului se întâmplă doar atunci când utilizatorul nu este în proces de căutare, evitând astfel interferențe neașteptate cu interacțiunea utilizatorului. Aceasta asigură că valoarea bara de progres se actualizează doar în cazul în care utilizatorul nu este implicat activ în manipularea ei.*/
}

export default MusicPlayer;
