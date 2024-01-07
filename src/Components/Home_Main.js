import React,{useEffect, useRef} from "react";
import '../CSS/HomeMain.css';
import Card from "../Components/Card.js";
import MusicPlayer from "../Components/MusicPlayer";

const HomeMain = ({ topCharts, playSongApp, stopSongApp, selectedSong, setInformation, volume,songProgress,setSongProgress
  ,information,songFavorites,setSongFavorites,setVolume,setSelectedSong }) => {
  const mainIndices = [8, 3, 9];
  const secondIndices = [7, 2, 10];
  const thirdIndices = [5, 11, 4];

  const audioRef = useRef(new Audio());

  const playSong = (songData) => {
    stopSongApp();
    playSongApp(songData);
    setInformation(songData);
  };

  useEffect(() => {
    const handleResize = () => {
      const musicPlayerContainer = document.querySelector('.MusicPlayer-container2');
      if (musicPlayerContainer && window.innerWidth < 768) {
        musicPlayerContainer.classList.add('move-down');
      } else if (musicPlayerContainer) {
        musicPlayerContainer.classList.remove('move-down');
      }
    };
  
    handleResize();
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="Main-container">
      {topCharts && topCharts.tracks && topCharts.tracks.length > 0 ? (
        <div className="Main-songs">
          {mainIndices.map((index) => (
            topCharts.tracks[index].hub.actions ? (
              <div key={index}>
                <Card
                  topChartsImg={topCharts.tracks[index].images.coverart}
                  topChartsSong={topCharts.tracks[index].hub.actions[1].uri}
                  topChartsTitle={topCharts.tracks[index].title}
                  topChartsArtist={topCharts.tracks[index].subtitle}
                  playSongHome={playSong}
                  stopSong={stopSongApp}
                  setInformation={setInformation}
                  isPlaying={
                    selectedSong &&
                    selectedSong.song === topCharts.tracks[index].hub.actions[1].uri
                  }
                  volume={volume}
                />
              </div>
            ) : (console.log("Error at second if Card 1:"))
          ))}
        </div>
      ) : (
        <div className="Main-songs"></div>
      )}

      {topCharts && topCharts.tracks && topCharts.tracks.length > 0 ? (
        <div className="Main-songs_2">
          {secondIndices.map((index) => (
            topCharts.tracks[index].hub.actions ? (
              <div key={index}>
                <Card
                  topChartsImg={topCharts.tracks[index].images.coverart}
                  topChartsSong={topCharts.tracks[index].hub.actions[1].uri}
                  topChartsTitle={topCharts.tracks[index].title}
                  topChartsArtist={topCharts.tracks[index].subtitle}
                  playSongHome={playSong}
                  stopSong={stopSongApp}
                  setInformation={setInformation}
                  isPlaying={
                    selectedSong &&
                    selectedSong.song === topCharts.tracks[index].hub.actions[1].uri
                  }
                  volume={volume}
                />
              </div>
            ) : (console.log("Error at second if Card 2:"))
          ))}
        </div>
      ) : (
        <div className="Main-songs2"></div>
      )}

      {topCharts && topCharts.tracks && topCharts.tracks.length > 0 ? (
        <div className="Main-songs_3">
          {thirdIndices.map((index) => (
            topCharts.tracks[index].hub.actions ? (
              <div key={index}>
                <Card
                  topChartsImg={topCharts.tracks[index].images.coverart}
                  topChartsSong={topCharts.tracks[index].hub.actions[1].uri}
                  topChartsTitle={topCharts.tracks[index].title}
                  topChartsArtist={topCharts.tracks[index].subtitle}
                  playSongHome={playSong}
                  stopSong={stopSongApp}
                  setInformation={setInformation}
                  isPlaying={
                    selectedSong &&
                    selectedSong.song === topCharts.tracks[index].hub.actions[1].uri
                  }
                  volume={volume}
                />
              </div>
            ) : (console.log("Error at second if Card 3:"))
          ))}
        </div>
      ) : (
        <div className="Main-songs3"></div>
      )}

      {selectedSong && (
        <div className="MusicPlayer-container2">
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
            playSongApp={playSong}
            setSelectedSong={setSelectedSong}
            audioRef={audioRef}
          />
        </div>
      )}
    </div>
  );
}

export default HomeMain;
