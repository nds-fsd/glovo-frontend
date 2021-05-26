import styles from './footer.module.css';
import { Android } from '../../assets/icons/android';
import { Apple } from '../../assets/icons/apple';
import { Twitter } from '../../assets/icons/Twitter';
import { Facebook } from '../../assets/icons/facebook';

export const Footer = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.glovoApp}>
        <div className={styles.textTitle}>
          <h1>Globo App</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and <br />
            typesetting industry. Lorem Ipsum has been the
            <br /> industry standard dummy text ever since the 1500s.
          </p>
        </div>
        <div className={styles.downloadIcon}>
          <div className={styles.downloadButton}>
            <Android />
            <p>Download</p>
          </div>
          <div className={styles.downloadButton}>
            <Apple />
            <p>Download</p>
          </div>
        </div>
      </div>
      <div className={styles.bottomHalfContainer}>
        <div className={styles.bottomTextContainer}>
          <div>
            <h1>Glovo</h1>
          </div>
          <div>
            <p>
              Lorem Ipsum is simply dummy text of the printing and <br />
              typesetting industry. Lorem Ipsum has been the
              <br /> industry standard dummy text ever since the 1500s.
            </p>
          </div>
          <div className={styles.socialMedia}>
            <Twitter />
            <Facebook />
          </div>
        </div>
      </div>
    </div>
  );
};
