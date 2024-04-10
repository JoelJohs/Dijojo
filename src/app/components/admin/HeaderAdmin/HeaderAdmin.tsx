import styles from "./HeaderAdmin.module.css";
import Link from "next/link";

interface Props {
  pagina: string;
  subPaginas: { nombre: string; link: string }[];
}

function HeaderAdmin({ pagina, subPaginas }: Props) {
  return (
    <div className={styles.empleadosContainer}>
      <h2>{pagina}</h2>
      <nav>
        <ul>
          {subPaginas.map((subPagina, index) => (
            <li key={index}>
              <Link href={subPagina.link}>{subPagina.nombre}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default HeaderAdmin;
