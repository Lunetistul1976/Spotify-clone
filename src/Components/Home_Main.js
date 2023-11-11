import React from "react";
import '../CSS/HomeMain.css'
import Card from "../Components/Card.js";

const HomeMain = ({ topCharts,playSongApp,stopSongApp,selectedSong }) => {
  const mainIndices = [1, 3, 4];
  const secondIndices = [7, 2, 15];
  const thirdIndices = [10, 14, 11];

console.log('This is the selected song:',selectedSong)
 
 

  const playSong = (songData) => { //Aceasta functie este folosita pentru a apela functia stop song asupra cantecului redat in prezent atunci cand utilizatorul interactioneaza cu un alt cantec
    // De asemena aceasta functie va incepe redarea cantecului selectat de utilizator
    // Stop the current song if there is one playing
    stopSongApp();
    // Play the new song
     playSongApp(songData)
    
    
  };

  return (
    <div className="Main-container">
      {topCharts && topCharts.tracks && topCharts.tracks.length > 0 ? (
        <div className="Main-songs">
          {mainIndices.map((index) => ( /* Cand folosesc proprietatile unui obiect, inainte de a le putea folosi trebuie sa verific daca acestea
          sunt definite/ exista. Daca lucrez cu o lista, inainte de a accesa index ul acelei liste va trebui sa verific daca exista lista 
          */
             topCharts.tracks[index].hub.actions  ?  (
              <Card
                topChartsImg={topCharts.tracks[index].images.coverart}
                topChartsSong={topCharts.tracks[index].hub.actions[1].uri}
                topChartsTitle={topCharts.tracks[index].title}
                topChartsArtist={topCharts.tracks[index].subtitle}
                
                playSongHome={ playSong}
                stopSong={stopSongApp}
                isPlaying={
                  selectedSong &&
                  selectedSong.song === topCharts.tracks[index].hub.actions[1].uri
                }
              />
            ):(console.log("Error at second if Card 1:"))
          ))}
        </div>
      ) : (
        console.log("Error at Card 1")
      )}

      {topCharts && topCharts.tracks && topCharts.tracks.length > 0 ? (
        <div className="Main-songs_2">
          {secondIndices.map((index) => (
             topCharts.tracks[index].hub.actions ?  (
               <Card
                 topChartsImg={topCharts.tracks[index].images.coverart}
                 topChartsSong={topCharts.tracks[index].hub.actions[1].uri}
                 topChartsTitle={topCharts.tracks[index].title}
                 topChartsArtist={topCharts.tracks[index].subtitle}
                 playSongHome={playSong}
                 stopSong={stopSongApp}
                 isPlaying={
                   selectedSong &&
                   selectedSong.song === topCharts.tracks[index].hub.actions[1].uri
                 }
               />
             ):(console.log("Error at second if Card 2:"))
          ))}
        </div>
      ) : (
        console.log("Error at Card 2")
      )}

      {topCharts && topCharts.tracks && topCharts.tracks.length > 0 ? (
        <div className="Main-songs_3">
          {thirdIndices.map((index) => (
            topCharts.tracks[index].hub.actions ?  (
               <Card
                 topChartsImg={topCharts.tracks[index].images.coverart}
                 topChartsSong={topCharts.tracks[index].hub.actions[1].uri}
                 topChartsTitle={topCharts.tracks[index].title}
                 topChartsArtist={topCharts.tracks[index].subtitle}
                 playSongHome={playSong}
                 stopSong={stopSongApp}
                 isPlaying={
                   selectedSong &&
                   selectedSong.song === topCharts.tracks[index].hub.actions[1].uri
                 }
               />
             ):(console.log("Error at second if Card 3:"))
          ))}
        </div>
      ) : (
        console.log("Error at  Card 3")
      )}
    </div>
  );
}

export default HomeMain;
