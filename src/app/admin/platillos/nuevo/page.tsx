"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderAdmin from "@/app/components/admin/HeaderAdmin/HeaderAdmin";
import { PlusCircleIcon, PencilIcon } from "@primer/octicons-react";
import styles from "./Nuevo.module.css";

const subPaginas = [
  {
    nombre: "Volver",
    link: "/admin/platillos",
  },
];

interface Params {
  id: string;
}

export default function NuevoPlatillo({ params }: { params: Params }) {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [seccion, setSeccion] = useState("");

  useEffect(() => {
    if (params.id) {
      fetch(`/api/admin/menu/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setNombre(data.name);
          setDescripcion(data.description);
          setPrecio(data.price);
        });
    }
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (params && params.id) {
      const res = await fetch(`/api/admin/menu/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nombre,
          description: descripcion,
          price: parseFloat(precio),
        }),
      });
      const data = await res.json();
      console.log(data);

      router.push("/admin");
    } else {
      const res = await fetch(`/api/admin/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nombre,
          description: descripcion,
          price: parseFloat(precio),
          sectionId: parseInt(seccion),
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.id) {
        router.push("/admin/platillos");
      } else {
        alert("Error al agregar el platillo");
      }
    }
  };

  return (
    <div>
      <HeaderAdmin pagina="Agregar Platillo" subPaginas={subPaginas} />

      {/* Formulario */}
      <div className={styles.contenedor}>
        <form className={styles.formulario} onSubmit={handleSubmit}>
          <div className={styles.input}>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              name="nombre"
              id="nombre"
              required
            />
          </div>
          <div className={styles.input}>
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              name="descripcion"
              id="descripcion"
              required
            />
          </div>
          <div className={styles.input}>
            <label htmlFor="precio">Precio</label>
            <input
              type="text"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              name="precio"
              id="precio"
              required
            />
          </div>
          <div className={styles.input}>
            {params.id ? (
              ""
            ) : (
              <>
                <label htmlFor="rol">Rol</label>
                <select
                  className={styles.select}
                  value={seccion}
                  onChange={(e) => setSeccion(e.target.value)}
                  name="seccion"
                  id="seccion"
                  required
                >
                  <option value="" disabled>
                    Seleccionar Seccion
                  </option>
                  <option value="1">Comida</option>
                  <option value="2">Menu Infantil</option>
                  <option value="3">Bebidas</option>
                </select>
              </>
            )}
          </div>
          <button className={styles.boton} type="submit">
            {params.id ? (
              <>
                <PencilIcon className={styles.icon} size={30} />
                Editar Platillo
              </>
            ) : (
              <>
                <PlusCircleIcon className={styles.icon} size={30} />
                Agregar Platillo
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
