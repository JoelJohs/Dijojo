import HeaderAdmin from "@/app/components/admin/HeaderAdmin/HeaderAdmin";
import CardEmpleados from "@/app/components/admin/empleados/tablaEmpleados/CardEmpleados";
import { prisma } from "@/libs/prisma";
import { User } from "@prisma/client";
import styles from "./Empleados.module.css";

async function loadUsers(): Promise<User[]> {
  return await prisma.user.findMany({
    include: { rol: true },
    orderBy: { id: "asc" },
  });
}

const subPaginas = [
  {
    nombre: "Agregar Empleado",
    link: "/admin/empleados/nuevo",
  },
];

export default async function PaginaEmpleados() {
  const users = await loadUsers();

  return (
    <main className={styles.mainEmpleados}>
      <HeaderAdmin pagina="Empleados" subPaginas={subPaginas} />
      <div className={styles.cardsEmpleados}>
        {users.map((user, index) => (
          <CardEmpleados key={index} user={user} />
        ))}
      </div>
    </main>
  );
}
