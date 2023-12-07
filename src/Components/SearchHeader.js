import React from "react";
import login from '../Images/Login.png'
import '../CSS/SearchHeader.css'
//import searchLoop from '../Images/Search_Icon.png'

const SearchHeader = ({fetchSongs,searchTerm,setSearchTerm,stopSong})=>{
   

   const handleSearch=()=>{
    stopSong()
    fetchSongs(searchTerm);
    
   }

    return(
    <div className="Playlist-container2" style={{backgroundColor:"#1DB954"}}>
    <div className="Playlist-info_b2">  
    {/*<img src={searchLoop} alt="Search"/>*/}
    <input type="text" placeholder="Search"
    value={searchTerm}
    onChange={(e)=> setSearchTerm(e.target.value)}
    onKeyDown={(e)=>{
        if(e.key ==='Enter'){
            handleSearch()
        }
    }}
    /> 
    </div>
    <div className="Login-section2">
    <img src={login} alt="login"/>
    <button className="Login2">Rares</button>
    </div>
 
    </div>
    )
}

export default SearchHeader