import styles from './signUpPage.module.css';
import SignUpForm from '../../components/forms/signUpForm';

export const SignUpPage = () => {
  return (
    <div className={styles.mainContainer}>
      <SignUpForm></SignUpForm>
    </div>
  );
};
