import { prisma } from "@/libs/prisma";
import style from "./Platillos.module.css";
import HeaderAdmin from "@/app/components/admin/HeaderAdmin/HeaderAdmin";
import { Menu } from "@prisma/client";
import CardPlatillos from "@/app/components/admin/empleados/cardPlatillos/CardPlatillos";

async function loadPlatillos(): Promise<Menu[]> {
  return await prisma.menu.findMany({
    include: { section: true },
    orderBy: { sectionId: "asc" },
  });
}

const subPaginas = [
  {
    nombre: "Agregar Platillo",
    link: "/admin/platillos/nuevo",
  },
];

export default async function PlatillosPage() {
  const platillo = await loadPlatillos();
  return (
    <main className={style.mainPlatillos}>
      <HeaderAdmin pagina="Platillos" subPaginas={subPaginas} />
      <div className={style.platillosGrid}>
        {platillo.map((platillo, index) => (
          <CardPlatillos key={index} platillo={platillo} />
        ))}
      </div>
    </main>
  );
}
