import React from "react";
import '../CSS/MusicPlayer.css'
import album from '../Images/Album_cover.png'
import play from '../Images/Play-button.png'
import random from '../Images/Random-button.png'
import previous from '../Images/Previous-song.png'
import next from '../Images/Next-song.png'
import repeat from '../Images/Repeat.png'
import volume from '../Images/Volume.png'

const MusicPlayer = () => {
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
                <input type="range" id="progresion-music" min='0' max='100'></input>

        </div>
    )
}

export default MusicPlayer;
