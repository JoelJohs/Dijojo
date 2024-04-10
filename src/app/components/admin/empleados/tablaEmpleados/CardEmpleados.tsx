"use client";

import { useState } from "react";
import User from "@/app/interfaces/users.interface";
import style from "./CardEmpleados.module.css";
import { PencilIcon, TrashIcon } from "@primer/octicons-react";
import { useRouter } from "next/navigation";

interface Props {
  user: User;
}

export default function CardEmpleados(user: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUserEdit = () => {
    try {
      router.push(`empleados/editar/${user.user.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      router.refresh();
    }
  };

  const handleUserDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/empleados/${user.user.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        throw new Error("Error al eliminar el empleado");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.cardEmpleado}>
      <div>
        <p>
          Nombre: <span>{user.user.name}</span>
        </p>
      </div>
      <div>
        <p>
          E-mail: <span>{user.user.email}</span>
        </p>
      </div>
      <div>
        <p>
          Rol Asignado: <span>{user.user.rol?.name}</span>
        </p>
      </div>
      <div>
        <button onClick={handleUserEdit}>
          <PencilIcon size={30} className={style.edit} />
        </button>
        <button onClick={handleUserDelete} disabled={loading}>
          {loading ? (
            "Eliminando..."
          ) : (
            <TrashIcon size={30} className={style.delete} />
          )}
        </button>
      </div>
    </div>
  );
}
