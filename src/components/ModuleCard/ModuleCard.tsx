import { NextPage } from "next";
import Image, { StaticImageData } from "next/image";
import styles from './ModuleCard.module.css';

interface ModuleCardProps {
    title: string;
    img: { file: StaticImageData, alt: string };
}

const ModuleCard: NextPage<ModuleCardProps> = (props) => {
    const { title, img } = props;
    return (
        <div className={styles.rotatingDashed}>
            <span className={styles.dashing}><i></i></span>
            <span className={styles.dashing}><i></i></span>
            <span className={styles.dashing}><i></i></span>
            <span className={styles.dashing}><i></i></span>
            <div className={styles.moduleCard}>
                <div>
                    <Image className={styles.moduleImg} src={img.file} alt={img.alt} fill={true}></Image>
                </div>
                <div className={styles.moduleTitle}>
                    {title}
                </div>
            </div>
        </div>
    )
}

export default ModuleCard;