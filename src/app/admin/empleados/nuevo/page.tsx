"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderAdmin from "@/app/components/admin/HeaderAdmin/HeaderAdmin";
import styles from "./Nuevo.module.css";
import { PlusCircleIcon, PencilIcon } from "@primer/octicons-react";

const subPaginas = [
  {
    nombre: "Volver",
    link: "/admin/empleados",
  },
];

interface Params {
  id: string;
}

export default function CrearEmpleado({ params }: { params: Params }) {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rolId, setRolId] = useState("");

  useEffect(() => {
    if (params.id) {
      fetch(`/api/admin/empleados/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setNombre(data.name);
          setEmail(data.email);
        });
    }
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("La contraseña y la confirmación de la contraseña no coinciden.");
      return;
    }

    if (params.id) {
      const res = await fetch(`/api/admin/empleados/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nombre,
          email: email,
          password: password,
        }),
      });

      const data = await res.json();
      console.log(data);

      router.push("/admin");
    } else {
      const res = await fetch("/api/admin/empleados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nombre,
          email: email,
          password: password,
          rolId: parseInt(rolId),
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        router.push("/admin/empleados");
      } else {
        alert(data.message);
      }
    }
  };

  return (
    <div>
      <HeaderAdmin pagina="Agregar Empleado" subPaginas={subPaginas} />

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
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              id="email"
              required
            />
          </div>
          <div className={styles.input}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              id="password"
              required
            />
          </div>
          <div className={styles.input}>
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
              id="confirmPassword"
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
                  value={rolId}
                  onChange={(e) => setRolId(e.target.value)}
                  name="rol"
                  id="rol"
                  required
                >
                  <option value="" disabled>
                    Seleccionar Rol
                  </option>
                  <option value="1">Administrador</option>
                  <option value="2">Mesero</option>
                  <option value="3">Cocinero</option>
                </select>
              </>
            )}
          </div>
          <button className={styles.boton} type="submit">
            {params.id ? (
              <>
                <PencilIcon className={styles.icon} size={30} />
                Editar Empleado
              </>
            ) : (
              <>
                <PlusCircleIcon className={styles.icon} size={30} />
                Agregar Empleado
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
