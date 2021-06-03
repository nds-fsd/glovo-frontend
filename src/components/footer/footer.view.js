/* eslint-disable no-unused-vars */
import styles from './footer.module.css';
import { Android } from '../../assets/icons/android';
import { Apple } from '../../assets/icons/apple';
import { Twitter } from '../../assets/icons/Twitter';
import { Facebook } from '../../assets/icons/facebook';

export const Footer = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.glovoApp}>
        <div className={styles.appsInfo}>
          <div>
            <h1>Globo App</h1>
            <p>
              We want to make things easier for you, try our mobile versions and get something to
              eat today!
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
      </div>
      <div className={styles.bottomHalfContainer}>
        <div className={styles.bottomTextContainer}>
          <div>
            <h1>Social Media</h1>
          </div>
          <div>
            <p>
              Stay tuned in our Social Media for exclusive offers and coupons. <br />
              Find news about the best restaurants around!
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
