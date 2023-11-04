import React from "react";
import login from '../Images/Login.png'
import '../CSS/SearchHeader.css'
import searchLoop from '../Images/Search_Icon.png'

const SearchHeader = (props)=>{
    return(
    <div className="Playlist-container" style={{backgroundColor:"#1DB954"}}>
    <div className="Playlist-info_b">  
    <img src={searchLoop} alt="Search"/>
    <input type="text" placeholder="Search"/> 
    </div>
    <div className="Login-section">
    <img src={login} alt="login"/>
    <button className="Login">Rares</button>
    </div>
 
    </div>
    )
}

export default SearchHeader