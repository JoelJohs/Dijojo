"use client";
import { useForm } from "react-hook-form";
import styles from "./page.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();

  const [error, setError] = useState("");

  const onSubmit = handleSubmit(async (data: FormData) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res) {
      if (res.error) {
        setError("Error en el inicio de sesión. Por favor, intenta de nuevo.");
      } else {
        setError("");
        router.push("/admin");
      }
    } else {
      console.error("Sign-in response is undefined");
    }
    console.log(res);
  });

  return (
    <div className={styles.mainContainer}>
      <form onSubmit={onSubmit} className={styles.loginForm}>
        {error !== "" && <span className={styles.error}>{error}</span>}
        <h1 className={styles.title}>Dijojo Restaurant</h1>

        <label htmlFor="email" className={styles.label}>
          Email:
        </label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
          placeholder="email@example.com"
          className={styles.input}
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}

        <label htmlFor="password" className={styles.label}>
          Password:
        </label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
          placeholder="******"
          className={styles.input}
        />
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}

        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}
