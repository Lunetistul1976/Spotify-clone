import React from "react";
import album_img from '../Images/Album_cover.png'
import login from '../Images/Login.png'
import '../CSS/Playlist.css'

const PlaylistHome = ({usernames})=>{
    return(
    <div className="Playlist-container" style={{backgroundColor:"#1DB954"}}>
    <div className="Playlist-info">
    <img src={album_img} alt="Easy cover"/>
    <div className="Playlist-titile">
    <h1 >BEST SONGS</h1>
    </div>
    
    </div>
    <div className="Login-section">
    <img src={login} alt="login"/>
    { usernames ?
    <button className="Login">{usernames.username}</button>: null}
    </div>
 
    </div>
    )
}

export default PlaylistHome