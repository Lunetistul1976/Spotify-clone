import React, { useRef, useEffect} from "react";
import '../CSS/Card.css'
import Play from '../Images/Play-button-green.png'

const Card = ({ topChartsImg, topChartsTitle, topChartsArtist, topChartsSong,isPlaying,playSongHome,stopSong }) => {

    const audioRef = useRef(null)
    

    /*

Comentarii

const audioRef = useRef(null): Se declară o referință (ref) pentru a accesa elementul audio în componenta React.

const [playMusic, setPlayMusic] = useState(false): Se declară o variabilă de stare playMusic și o funcție setPlayMusic pentru a gestiona starea de redare a muzicii.

const playAudio = Se definește o funcție pentru a reda sau opri muzica. Dacă muzica este deja în redare (isPlaying), atunci se oprește redarea cu audioRef.current.pause(). Altfel, se redă muzica cu audioRef.current.play() și se folosește funcția playSong pentru a începe redarea cântecului și se actualizează starea playMusic.

const stopAudio =  Se definește o funcție pentru a opri redarea muzicii. Se folosește audioRef.current.pause() pentru a opri muzica, se setează starea playMusic la false și se apelează funcția stopSong().

useEffect(() => Utilizează efectul pentru a monitoriza starea isPlaying și redă sau oprește muzica în funcție de aceasta. Dacă isPlaying este true, se redă muzica cu audioRef.current.play(). Dacă isPlaying este false, se oprește muzica cu audioRef.current.pause()

Utilizează efectul pentru a adăuga un ascultător pentru evenimentul "ended" al elementului audio și apela funcția stopSong() atunci când muzica se termină. Acest efect se activează atunci când se schimbă funcția stopSong.



*/
    const playAudio = () => {
        

            playSongHome({
                song:topChartsSong,
                audioRef: audioRef,})
            
    };
    
             useEffect(() => {
                if (audioRef.current) {
                    audioRef.current.addEventListener("ended", () => {
                        stopSong()
                    });
                }
            }, [stopSong]);
     
     
         
    return (
        <div className="music-card-bg" onClick={isPlaying?stopSong:playAudio}>
            <div className="music-img">
                <img src={topChartsImg} alt="cover" />
            </div>
            <div className="music-img-hidden">
                <img src={Play} alt="Play button" />
            </div>
            <div className="music-artist-title">
                <h4 className="music-title">{topChartsTitle}</h4>
                <p className="music-artist">{topChartsArtist}</p>
            </div>
            <audio ref={audioRef} src={topChartsSong} />
        </div>
    );
}

export default Card;
