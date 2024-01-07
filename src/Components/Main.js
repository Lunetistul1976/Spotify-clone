import React, { useEffect, useRef } from "react";
import '../CSS/Main.css';
import MusicPlayer from "../Components/MusicPlayer";

const Main = ({stopSong, songProgress, setSongProgress, information, songFavorites, 
  setSongFavorites, volume, setVolume, 
  setInformation, topCharts, 
  playSongApp, setSelectedSong, selectedSong, playNextSongFavorites,favorites,favoriteIndex,setFavoriteIndex,playPrevSongFavorites }) => {

  const newSongFavorites = songFavorites ? Object.values(songFavorites) : [];

  const favoriteAudioRef = useRef(null);

  console.log("Valoarea variabilei selected song este", selectedSong)

  console.log("Valorile din set songFavorites", songFavorites)
  
  const playAudio = (selectedAudio) => {

    
    playSongApp({ audioRef: favoriteAudioRef, song: selectedAudio.audio });
   
    setInformation({
      image: selectedAudio.image,
      artist: selectedAudio.artist,
      title: selectedAudio.title,
      volume:volume,
      duration: favoriteAudioRef.duration,
      audioRef: favoriteAudioRef.current,
      audio:selectedAudio.audio,
    })
  };
    
  const handleImageClick=(selectedAudio)=>{
    if(selectedSong && selectedSong.song === selectedAudio.audio){
      stopSong()
    }
    else{
      stopSong()
      favoriteAudioRef.current.src=selectedAudio.audio
      playAudio(selectedAudio)
      
    }
  }

  useEffect(() => {
    if (favoriteAudioRef.current) {
        favoriteAudioRef.current.addEventListener("ended", () => {
            stopSong()
        });
    }
}, [stopSong]);


  return (
    <div className="Main-container2">
      {newSongFavorites.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th style={{ width: "20%" }}></th>
              <th>Name</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(newSongFavorites) ? (
              newSongFavorites.map((song, index) => (
                <React.Fragment key={index}>
                  {song && song.image && song.title && song.artist && song.duration && song.audio ? (
                    <tr>
                      <td>
                        <img
                          src={song.image}
                          alt='Album cover'
                          onClick={()=> handleImageClick(song)}
                        />
                        <audio src={song.audio} ref={favoriteAudioRef} />
                      </td>
                      <td>{song.title.split('(')[0].trim()}</td>
                      <td>{song.artist}</td>
                      <td>{song.title.split('(')[0].trim()}</td>
                      <td>{Math.floor(song.duration)} s</td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ zIndex: "1000000" }}>Error at displaying favorite songs</td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ zIndex: "1000000" }}>Error: Invalid data structure for favorite songs</td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        null 
      )}
      {selectedSong && (
        <div className="MusicPlayer-container4">
          <MusicPlayer
            selectedSong={selectedSong}
            songProgress={songProgress}
            setSongProgress={setSongProgress}
            information={information}
            songFavorites={songFavorites}
            setSongFavorites={setSongFavorites}
            volume={volume}
            setVolume={setVolume}
            setInformation={setInformation}
            topCharts={topCharts}
            playSongApp={playSongApp}
            setSelectedSong={setSelectedSong}
            playNextSongFavorites={playNextSongFavorites}
            favorites2={favorites}
            favoriteIndex={favoriteIndex}
            setFavoriteIndex={setFavoriteIndex}
            playPrevSongFavorites={playPrevSongFavorites}
          />
        </div>
      )}
    </div>
  );
}

export default Main;
