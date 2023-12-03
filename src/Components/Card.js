import React, { useRef, useEffect } from "react";
import '../CSS/Card.css'
import Play from '../Images/Play-button-green.png'

const Card = ({ topChartsImg, topChartsTitle, topChartsArtist, topChartsSong, isPlaying, playSongHome, stopSong, setInformation, volume }) => {

    const audioRef = useRef(null)

    const playAudio = () => {
        playSongHome({
            song: topChartsSong,
            audioRef: audioRef,
        })

        setInformation({
            image: topChartsImg,
            artist: topChartsArtist,
            title: topChartsTitle,
            volume: volume,
            duration: audioRef.current.duration,
            audioRef: audioRef.current,
            audio: topChartsSong,
        });
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener("ended", () => {
                stopSong();
            });
        }
    }, [stopSong]);

    const truncatedTitle = topChartsTitle.split('(')[0].trim();
    const truncatedArtist = topChartsArtist.split('&')[0].trim()

    /* 1) topChartsTitle.split('('): This part of the code uses the split method on the topChartsTitle string. The split method is used to split a string into an array of substrings based on a specified delimiter. 
    In this case, the delimiter is '('. So, the string is split into an array of substrings where each substring is separated by the '(' character.

2) [0]: After splitting the string, [0] is used to access the first element (the substring before the first occurrence of '(') in the resulting array.

3).trim(): The trim method is then called on the obtained substring. This method removes any leading or trailing whitespace from the string. It ensures that there are no extra spaces around the extracted substring.

4) const truncatedTitle = ...: Finally, the result after splitting, selecting the first element, and trimming whitespace is stored in the variable truncatedTitle. This variable now contains the content of topChartsTitle up to the first occurrence of '('.

In summary, this line of code extracts the content of topChartsTitle up to the first '(' character, removes any leading or trailing whitespace, and assigns the result to the variable truncatedTitle. This is used to display a truncated version of the title in the UI.*/

    return (
        <div className="music-card-bg" onClick={isPlaying ? stopSong : playAudio}>
            <div className="music-img">
                <img src={topChartsImg} alt="cover" />
            </div>
            <div className="music-img-hidden">
                <img src={Play} alt="Play button" />
            </div>
            <div className="music-artist-title">
                <h4 className="music-title">{truncatedTitle}</h4>
                <p className="music-artist">{truncatedArtist}</p>
            </div>
            <audio
                ref={audioRef}
                src={topChartsSong}
            />
        </div>
    );
}

export default Card;
