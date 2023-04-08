"use client";
import Image from 'next/image';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import AudioPlayer from '@/components/AudioPlayer/AudioPlayer';

function Browse() {
    const [albumArtwork, setAlbumArtwork] = useState(
        [
            "Guard Down (chefB Remix).png",
            "Down with this Ship.png",
            "Co-star.png",
            "Put It in the Bag.png",
            "Weathers Warmin Up.png",
            "Liars.jpeg",
            "Cypher 64.png",
            "Rapture (chefB Remix).jpeg",
            "I Wanna Be Down.jpeg",
            "Hi-life.png",
            "Don't Want to Go.png",
            "Caramel.jpeg"
        ]
    )
    const [requestedTrack, setRequestedTrack] = useState("")

    // useEffect(() => {
    //     fetch('/api/get-album-artwork').then(res => res.json()).then(data => {
    //         setAlbumArtwork(TRACK_ORDER)
    //     })
    // }, [])

    return (
        <div className={styles.browseContainer}>
            {
                albumArtwork.map((item: string) =>
                    <div className={styles.albumArtwork} key={`${item}`}>
                        <Image
                            alt={item}
                            src={`/album-artwork/${item}`}
                            key={item}
                            width={500}
                            height={500}
                        ></Image>
                        <div className={styles.albumArtworkOverlay} onClick={() => setRequestedTrack(item)}>
                            <h1 className={styles.albumArtworkTitle}>{item.substring(0, item.indexOf('.'))}</h1>
                        </div>
                    </div>
                )
            }
            {
                requestedTrack === ""
                    ? null
                    : <AudioPlayer track={requestedTrack} />
            }
        </div>
    )
}

export default Browse;