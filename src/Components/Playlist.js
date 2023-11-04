import React from "react";
import album_img from '../Images/Album_cover.png'
import login from '../Images/Login.png'
import '../CSS/Playlist.css'

const Playlist = (props)=>{
    return(
    <div className="Playlist-container">
    <div className="Playlist-info">
    <img src={album_img} alt="Easy cover"/>
    <div className="Playlist-titile">
    <h1 >P L A Y L I S T</h1>
    <h1 >Favorites</h1>
    </div>
    
    </div>
    <div className="Login-section">
    <img src={login} alt="login"/>
    <button className="Login">Rares</button>
    </div>
 
    </div>
    )
}

export default Playlist