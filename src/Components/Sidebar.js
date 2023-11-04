import React from "react";
import  '../CSS/Sidebar.css'
import logo from '../Images/Spotify_Logo.png'
import home from '../Images/Home.jpg'
import search from '../Images/Search_Icon.png'
import favorites from '../Images/Favorites.png'
import logout from '../Images/logout.svg'

const Sidebar = (props) =>{ /*Fiecare component creat va avea parametrul/argumentul props . Acesta este folosit pentru a mostenii proprietatile/atributele
 si metodele/functiile componentei APP.js in fiecare componenta creata ulterior.  Toate datele se transmit intre componente folosind obiectul props */
    return(
    <div className="Sidebar-container">
       <ul className="Sidebar-Links">
        <li><img src={logo} alt="Spotify "/></li>
        <li><img src={home} alt="home"/><a href="home"onClick={props.showHome}>Home</a></li> {/*Pentru a accesa datele trimise ca props voi folosi sintaxa {props.variabila}
        Astfel accesez atributul/metoda obiectului props */}
        <li><img src={search} alt="search"/><a href="search" onClick={props.showSearch}>Search</a></li>{/* As we already saw before, React re-renders a component when you call 
        the setState function to change the state (or the provided function from the useState hook in function components).
         As a result, the child components only update when the parent component's state changes with one of those functions. */}
        <li><img src={favorites} alt="favorites"/><a href="favorites" onClick={props.showFavorites}>Favorites</a></li>
        <li><img src={logout} alt="logout"/><a href="logout">Log Out</a></li>

       </ul>

        
        
    </div>
    )
}

export default Sidebar