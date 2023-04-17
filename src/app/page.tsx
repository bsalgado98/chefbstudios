'use client'
import Image from 'next/image'
import styles from './page.module.css'
import chefBStudiosLogo from '@/img/chefBStudios_logo.png';
import chefBTracks from '@/img/chefBTracks.png';
import studioB from '@/img/studio.png';
import socialMedia from '@/img/social_media.png';

import ModuleCard from '@/components/ModuleCard/ModuleCard';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
    const [logoSize, setLogoSize] = useState(600);
    let mediaQuery: MediaQueryList;

    const handleResize = () => {
        if (mediaQuery && mediaQuery.matches) {
            setLogoSize(400)
        } else {
            setLogoSize(600)
        }
    }

    useEffect(() => {
        mediaQuery = window.matchMedia('(max-width: 767px)');
        window.dispatchEvent(new Event('resize'))
    }, [])

    if (typeof window !== "undefined") {
        window.addEventListener('resize', handleResize)
    }

    return (
        <main className={styles.main}>
            <div className={styles.landingHero}>
                <div className={styles.heroLeft}>
                    <Image
                        src={chefBStudiosLogo}
                        alt="chefBStudios logo"
                        width={logoSize}
                        height={logoSize}
                    ></Image>
                </div>
                <div className={styles.heroRight}>
                    <h1>The intersection of</h1>
                    <h1>👨🏻‍💻 and 🎵</h1>
                </div>
            </div>
            <div className={styles.landingModulesView}>
                <h1>chefB&apos;s House</h1><h2 className={styles.rainbowShimmer}>Specials</h2>
                <div className={styles.landingModules}>
                    <Link href={'/browse'}>
                        <ModuleCard title={"Browse chefB"} img={{file: chefBTracks, alt: "chefB's Tracks"}}/>
                    </Link>
                    <Link href={'/schedule'}>
                        <ModuleCard title={"Book studio time"} img={{file: studioB, alt: "chefB's Studio B"}}/>
                    </Link>
                    <Link href={"https://www.instagram.com/officialchefb/"}>
                        <ModuleCard title={"Instagram"} img={{file: socialMedia, alt: "chefB's Instagram"}}/>
                    </Link>
                </div>
            </div>
        </main>
    )
}
