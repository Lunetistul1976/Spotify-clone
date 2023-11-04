import React from "react";
import '../CSS/HomeMain.css'

import Card from "../Components/Card.js";


const HomeMain=({topCharts}) =>{
   
   return(
<div className="Main-container">
{topCharts.tracks && topCharts.tracks.length>0?
<div className="Main-songs">
   
<Card topChartsImg={topCharts.tracks[0].images.coverart} topChartsTitle={topCharts.tracks[0].title} topChartsArtist={topCharts.tracks[0].subtitle}/> 
{/*Checking if topCharts.tracks exists and has a length greater than 0 is a defensive coding practice to ensure that you don't run into errors 
when trying to access properties of an object or array that might not exist or be empty.
In JavaScript, attempting to access properties or elements of an undefined variable or an empty array 
can result in runtime errors, which can cause your application to break. 
By using conditional checks like topCharts.tracks && topCharts.tracks.length > 0, 
you are ensuring that the data you want to access actually exists before attempting to access it. */}
<Card topChartsImg={topCharts.tracks[3].images.coverart} 
topChartsTitle={topCharts.tracks[3].title} topChartsArtist={topCharts.tracks[3].subtitle}/> 
<Card topChartsImg={topCharts.tracks[4].images.coverart} 
topChartsTitle={topCharts.tracks[4].title} topChartsArtist={topCharts.tracks[4].subtitle}/> 

</div>
:console.log("Error")}

{topCharts.tracks && topCharts.tracks.length>0?
<div className="Main-songs_2">

<Card topChartsImg={topCharts.tracks[6].images.coverart} 
topChartsTitle={topCharts.tracks[6].title} topChartsArtist={topCharts.tracks[6].subtitle}/> 
<Card topChartsImg={topCharts.tracks[15].images.coverart} 
topChartsTitle={topCharts.tracks[15].title} topChartsArtist={topCharts.tracks[15].subtitle}/> 
<Card topChartsImg={topCharts.tracks[16].images.coverart} 
topChartsTitle={topCharts.tracks[16].title} topChartsArtist={topCharts.tracks[16].subtitle}/> 

</div>
:console.log("Error")}


{topCharts.tracks && topCharts.tracks.length>0?

<div className="Main-songs_3">

<Card topChartsImg={topCharts.tracks[8].images.coverart} 
topChartsTitle={topCharts.tracks[8].title} topChartsArtist={topCharts.tracks[8].subtitle}/> 
<Card topChartsImg={topCharts.tracks[13].images.coverart} 
topChartsTitle={topCharts.tracks[13].title} topChartsArtist={topCharts.tracks[13].subtitle}/> 
<Card topChartsImg={topCharts.tracks[10].images.coverart} 
topChartsTitle={topCharts.tracks[10].title} topChartsArtist={topCharts.tracks[10].subtitle}/> 

</div>
:console.log("Error")}

</div>


   )
}

export default HomeMain