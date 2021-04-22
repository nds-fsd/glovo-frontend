/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import styles from './logInPage.module.css';
import LogIn from '../../components/logIn';
import SignUpForm from '../../components/forms/signUpForm';

const LogInPage = () => {
  return (
    <div className={styles._container}>
      <div className={styles._logIn}>
        <LogIn />
      </div>
      <div className={styles._register}>
        <SignUpForm />
      </div>
    </div>
  );
};

export default LogInPage;