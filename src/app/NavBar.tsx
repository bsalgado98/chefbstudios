import styles from './NavBar.module.css';
import Image from 'next/image'
import chefBStudiosLettering from '@/img/chefBStudios_lettering.png';
import { SocialIcon } from 'react-social-icons';
import Link from 'next/link';

const NavBar = () => {
    return (
        <div className={styles.navbar}>
            <Link href={'/'} >
                <Image
                    className={styles.chefBStudiosLettering}
                    src={chefBStudiosLettering}
                    alt="chefBStudios logo but tiny"
                    width={75}
                    height={75}
                ></Image>
            </Link>
            <div className={styles.navBtnContainer}>
                <Link className={styles.navBtn} href={"/browse"}>Browse</Link>
                <Link className={styles.navBtn} href={"/schedule"}>Schedule Time</Link>
                <SocialIcon className={styles.socialIcon} url={"https://www.instagram.com/officialchefb/"} style={{ height: 50, width: 50}} />
                <SocialIcon className={styles.socialIcon} url={"https://twitter.com/officialchefb"} />
            </div>

        </div>
    )
}

export default NavBar;