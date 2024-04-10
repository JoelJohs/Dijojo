import Link from "next/link";
import styles from "./AdminMenus.module.css";

const Menus = [
  {
    id: 1,
    name: "Empleados",
    path: "/admin/empleados",
  },
  {
    id: 2,
    name: "Platillos",
    path: "/admin/platillos",
  },
];

export default function AdminMenus() {
  return (
    <div className={styles.AdminMenus}>
      {Menus.map((menu) => (
        <div key={menu.id} className={styles.LinkContainer}>
          <Link href={menu.path}>{menu.name}</Link>
          <hr />
        </div>
      ))}
    </div>
  );
}
