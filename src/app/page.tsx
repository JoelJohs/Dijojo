import styles from "./page.module.css";
import LoginBox from "./components/login/LoginBox";

export default function Login() {
  return (
    <div className={styles.mainContainer}>
      <LoginBox />
    </div>
  );
}
