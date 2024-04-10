import Sidebar from "../components/admin/Sidebar";
import Upbar from "../components/admin/Upbar";
import styles from "./AdminLayout.module.css";
import "@/app/admin/adminGlobal.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Upbar />
      <div className={styles.adminContainer}>
        <Sidebar />
        <div className="contenido">{children}</div>
      </div>
    </main>
  );
}
