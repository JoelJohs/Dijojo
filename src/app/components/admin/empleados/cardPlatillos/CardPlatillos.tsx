"use client";

import Menu from "@/app/interfaces/platillos.interface";

import { useState } from "react";
import { PencilIcon, TrashIcon } from "@primer/octicons-react";
import { useRouter } from "next/navigation";
import styles from "./CardPlatillos.module.css";

interface Props {
  platillo: Menu;
}

export default function CardPlatillos(platillo: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUserEdit = () => {
    try {
      router.push(`platillos/editar/${platillo.platillo.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      router.refresh();
    }
  };

  const handleUserDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/menu/${platillo.platillo.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        throw new Error("Error al eliminar el platillo");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.cardPlatillos}>
      <h3>{platillo.platillo.name}</h3>
      <p>{platillo.platillo.description}</p>
      <p>${platillo.platillo.price}</p>
      <div>
        <button onClick={handleUserEdit}>
          <PencilIcon size={30} className={styles.edit} />
        </button>
        <button onClick={handleUserDelete} disabled={loading}>
          {loading ? (
            "Eliminando..."
          ) : (
            <TrashIcon size={30} className={styles.delete} />
          )}
        </button>
      </div>
    </div>
  );
}
