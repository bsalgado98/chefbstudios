import styles from './AudioPlayer.module.css';
import { NextPage } from "next";
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import { BsFillVolumeUpFill } from 'react-icons/bs'
import { IconContext } from 'react-icons';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface AudioPlayerType {
    track: string
}

const AudioPlayer: NextPage<AudioPlayerType> = ({ track }) => {
    const [showPlayer, setShowPlayer] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isScrubbing, setIsScrubbing] = useState(false)
    const playerRef = useRef<HTMLAudioElement>()
    const playerSourceRef = useRef<HTMLSourceElement>()

    const playerProgressRef = useRef<HTMLDivElement>()
    const playerProgressBarRef = useRef<HTMLDivElement>()
    const playerProgressThumbRef = useRef<HTMLDivElement>()

    const playerTimeRef = useRef<HTMLLabelElement>()
    const playerDurationRef = useRef<HTMLLabelElement>()

    const playerVolumeSliderRef = useRef<HTMLDivElement>()
    const playerVolumeSliderBarRef = useRef<HTMLDivElement>()
    const playerVolumeSliderThumbRef = useRef<HTMLDivElement>()

    // Format the time in the format of "mm:ss"
    function formatTime(time: number) {
        if (Number.isNaN(time)) return "00:00"
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(1, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    playerRef.current?.addEventListener('canplaythrough', () => {
        playerRef.current?.play()
        setIsPlaying(true)
    })

    playerProgressRef.current?.addEventListener('mousedown', handleMouseDown) // TODO change to thumb ref
    playerVolumeSliderRef.current?.addEventListener('mousedown', () => {
        document.addEventListener('mousemove', handleVolumeChange)
    })

    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', handleVolumeChange)
    })

    function handleVolumeChange(e: MouseEvent) {
        if (!playerVolumeSliderRef.current || !playerRef.current || !playerVolumeSliderThumbRef.current || !playerVolumeSliderBarRef.current) return
        const { left, width } = playerVolumeSliderRef.current.getBoundingClientRect()
        const x = e.clientX - left
        const clampedPosition = Math.max(0, Math.min(x, width))
        const volume = clampedPosition / width
        playerRef.current.volume = volume
        playerVolumeSliderThumbRef.current.style.left = `${volume * 100}%`;
        playerVolumeSliderBarRef.current.style.width = `${volume * 100}%`;
    }

    useEffect(() => {
        if (isScrubbing) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
            return () => {
                document.removeEventListener('mouseup', handleMouseUp)
                document.removeEventListener('mousemove', handleMouseMove)
            }
        }
        playerRef.current?.addEventListener('timeupdate', handleTimeUpdate)
        return () => playerRef.current?.removeEventListener('timeupdate', handleTimeUpdate)
    }, [isScrubbing])

    function handleTimeUpdate() {
        if (isScrubbing) return
        if (!playerRef.current) return 

        const currentTime = playerRef.current.currentTime
        const duration = playerRef.current.duration
        const progress = (currentTime / duration)

        if (!playerTimeRef.current || !playerDurationRef.current) return

        updateProgress(progress)
        playerTimeRef.current.textContent = formatTime(currentTime)
        playerDurationRef.current.textContent = formatTime(duration)
    }

    function handleMouseDown(e: MouseEvent) {
        setIsScrubbing(true)
        if (!playerProgressRef.current) return
        const { left, width } = playerProgressRef.current.getBoundingClientRect()
        const x = e.clientX - left
        const percentage = x / width

        updateProgress(percentage)
    }

    function handleMouseMove(e: MouseEvent) {
        if (!playerProgressRef.current || !playerTimeRef.current) return
        const { left, width } = playerProgressRef.current.getBoundingClientRect()
        const x = e.clientX - left
        const clampedPosition = Math.max(0, Math.min(x, width))
        const percentage = clampedPosition / width

        playerTimeRef.current.textContent = formatTime(percentage * 100)
        updateProgress(percentage)
    }

    function handleMouseUp(e: MouseEvent) {
        setIsScrubbing(false)
        if (!playerRef.current || !playerProgressRef.current) return
        const { left, width } = playerProgressRef.current.getBoundingClientRect()
        const x = e.clientX - left
        const percentage = x / width
        const duration = playerRef.current.duration
        playerRef.current.currentTime = percentage * duration  

        document.removeEventListener('mousemove', handleMouseMove)
    }

    function updateProgress(percentage: number) {
        if (!playerProgressBarRef.current || !playerProgressThumbRef.current) return

        playerProgressBarRef.current.style.width = `${percentage * 100}%`
        playerProgressThumbRef.current.style.left = `${percentage * 100}%`
    }

    useEffect(() => {
        if (track === "") return

        playTrack(track)
    }, [track])
    
    const playTrack = (item: string) => {
        setShowPlayer(true)

        playerRef.current?.pause()
        if (playerSourceRef.current) {
            playerSourceRef.current.src = `/api/get-tracks?track=${item}`
        }
        playerRef.current?.load()
    }

    const handlePauseBtn = () => {
        playerRef.current?.pause()
        setIsPlaying(false)
    }

    const handlePlayBtn = () => {
        playerRef.current?.play()
        setIsPlaying(true)
    }

    return (
        <div className={styles.player} id="player">
            <style jsx>{
                `
                    #player {
                        z-index: 999;
                        transition: transform ease 0.2s;
                        transform: translateY(${showPlayer ? '0' : '75px'});
                        opacity: ${showPlayer ? '1' : '0'};
                    }
                `
            }</style>
            <div className={styles.playerTrackInfoContainer}>
                <Image
                    alt={track}
                    src={`/album-artwork/${track}`}
                    key={track}
                    width={50}
                    height={50}
                ></Image>
                <div className={styles.playerTrackInfo}>
                    <h2 className={styles.playerSongTitle}>{track.substring(0, track.indexOf("."))}</h2>
                    <p className={styles.playerArtistTitle}>chefB</p>
                </div>
            </div>
            <div className={styles.playerControls}>
                {
                    !isPlaying
                        ?
                            <button className={styles.playBtn} onClick={handlePlayBtn}>
                                <IconContext.Provider value={{ size: "4em", color: "rgb(255, 87, 87)" }}>
                                    <AiFillPlayCircle stroke="0" />
                                </IconContext.Provider>
                            </button>
                        :
                            <button className={styles.pauseBtn} onClick={handlePauseBtn}>
                                <IconContext.Provider value={{ size: "4em", color: "rgb(255, 87, 87)" }}>
                                    <AiFillPauseCircle />
                                </IconContext.Provider>
                            </button>
                }
                <div className={styles.playerProgressContainer}>
                    <span ref={playerTimeRef} className={styles.playerTime}></span>
                    <div ref={playerProgressRef} className={styles.playerProgress}>
                        <div ref={playerProgressBarRef} className={styles.playerProgressBar}></div>
                        <div className={styles.playerProgressBarDuration}></div>
                        <div ref={playerProgressThumbRef} className={styles.playerProgressSliderThumb}></div>
                    </div>
                    <span ref={playerDurationRef} className={styles.playerDuration}></span>
                </div>
            </div>
            <div className={styles.playerVolume}>
                <IconContext.Provider value={{ size: "2em", color: "#e0e0e06c" }}>
                    <BsFillVolumeUpFill />
                </IconContext.Provider>
                <div ref={playerVolumeSliderRef} className={styles.playerProgress}>
                    <div ref={playerVolumeSliderBarRef} className={styles.playerProgressBar}></div>
                    <div className={styles.playerProgressBarDuration}></div>
                    <div ref={playerVolumeSliderThumbRef} className={styles.playerVolumeSliderThumb}></div>
                </div>
            </div>
            <audio ref={playerRef}>
                <source ref={playerSourceRef} type="audio/wav"></source>
            </audio>
        </div> 
    )
}

export default AudioPlayer