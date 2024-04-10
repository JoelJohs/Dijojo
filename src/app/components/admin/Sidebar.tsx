import Link from "next/link";
import styles from "./Sidebar.module.css";
import AdminMenus from "@/app/components/admin/AdminMenus";

export default function Sidebar() {
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.titleContainer}>
        <Link href="/admin">
          <h1>Admin Dashboard</h1>
        </Link>
      </div>
      <AdminMenus />
    </div>
  );
}
