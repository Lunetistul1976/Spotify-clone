import React from "react";
import '../CSS/Card.css'
import Play from '../Images/Play-button-green.png'

const Card = ({topChartsImg,topChartsTitle,topChartsArtist})=>{
return(


<div className="music-card-bg">
<div className="music-img">
<img src={topChartsImg} alt="cover"></img>
</div>
<div class="music-img-hidden">
<img  src={Play} alt="Play button" />
</div>
<div className="music-artist-title">
<h4 className="music-title">{topChartsTitle}</h4>
<p className="music-artist">{topChartsArtist}</p>
</div>

</div>
    
)

}


export default Card