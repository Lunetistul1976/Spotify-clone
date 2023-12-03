import React from "react";
import '../CSS/SearchResults.css'
import Card from "./Card";

const SearchResults = ({ searchSongs, playSongHome, stopSong, setInformation, selectedSong, volume }) => {

   console.log("Acestea sunt cantecele cautate", searchSongs)

   const playSong = (songData) => {
      stopSong();
      playSongHome(songData);
      setInformation(songData);
    };

   return (
      <div className="Main-container1" >
         {searchSongs && searchSongs.tracks && searchSongs.tracks.hits.length > 0 ? (
            <div className="Main-songs1" >
               {searchSongs.tracks.hits.map((song, index) => (
                  <div key={index}>
                     <Card
                        topChartsImg={song.track.images.coverart}
                        topChartsSong={song.track.hub.actions[1].uri}
                        topChartsArtist={song.track.subtitle}
                        topChartsTitle={song.track.title}
                        playSongHome={playSong}
                        stopSong={stopSong}
                        setInformation={setInformation}
                        isPlaying={
                           selectedSong &&
                           selectedSong.song === song.track.hub.actions[1].uri
                        }
                        volume={volume}
                     />
                  </div>// Now, song represents the current element in the array, and you can access its properties directly. This should render all the results of the search correctly.
               ))}
            </div> 
         ) : (
               null
            )}
      </div>
   )
}

export default SearchResults;
