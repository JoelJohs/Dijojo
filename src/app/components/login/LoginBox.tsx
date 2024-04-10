import styles from "./LoginBox.module.css";
import Link from "next/link";

export default function LoginBox() {
  return (
    <div className={styles.container}>
      <h1>DiJojo Restaurant</h1>
      <div className={styles.mainBox}>
        <form action="" className={styles.formBox}>
          <label htmlFor="nombre">Nombre</label>
          <input type="text" id="nombre" name="nombre" />
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" />
          <Link href="/admin">
            <button type="submit">Login</button>
          </Link>
        </form>
      </div>
    </div>
  );
}
