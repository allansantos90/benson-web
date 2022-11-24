/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BudgetData } from "..";
import styles from "../../styles/Home.module.css";

export default function Edit() {
  const { query } = useRouter();
  const { register, handleSubmit, reset, setValue } = useForm();
  const { push } = useRouter();

  async function onSubmit(data: any) {
    await axios.put(`http://localhost:5000/budget/edit/${query.id}`, data);
    reset();
    push("/");
  }
  const [budget, setBudget] = useState<BudgetData>();

  function setBudgetValue() {
    setValue("name", budget?.name);
    setValue("cpf", budget?.cpf);
    setValue("phone", budget?.phone);
    setValue("email", budget?.email);
    setValue("genre", budget?.genre);
    setValue("date_nasc", budget?.date_nasc);
    setValue("city", budget?.city);
    setValue("state", budget?.state);
    setValue("cep", budget?.cep);
    setValue("professional", budget?.professional);
    setValue("date_start", budget?.date_start);
    setValue("date_end", budget?.date_end);
    setValue("day_week", budget?.day_week);
    setValue("observation", budget?.observation);
  }

  async function getBudget() {
    const response = await axios.get(
      `http://localhost:5000/budget/${query.id}`
    );
    const { data } = response;

    setBudget(data);
  }

  useEffect(() => {
    getBudget();
  }, []);

  useEffect(() => {
    setBudgetValue();
  }, [budget]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>Edição de orçamento: {budget?.name}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input type="text" placeholder="name" {...register("name")} />
        <input type="text" placeholder="cpf" {...register("cpf")} />
        <input type="text" placeholder="phone" {...register("phone")} />
        <input type="text" placeholder="email" {...register("email")} />
        <input type="text" placeholder="genre" {...register("genre")} />
        <input type="text" placeholder="date_nasc" {...register("date_nasc")} />
        <input type="text" placeholder="city" {...register("city")} />
        <input type="text" placeholder="state" {...register("state")} />
        <input type="text" placeholder="cep" {...register("cep")} />
        <input
          type="text"
          placeholder="professional"
          {...register("professional")}
        />
        <input
          type="text"
          placeholder="date_start"
          {...register("date_start")}
        />
        <input type="text" placeholder="date_end" {...register("date_end")} />
        <input type="text" placeholder="day_week" {...register("day_week")} />
        <input
          type="text"
          placeholder="observation"
          {...register("observation")}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5px",
          }}
        >
          <button type="submit" className={`${styles.buttons} ${styles.ver}`}>
            EDITAR
          </button>
          <Link href="/" className={`${styles.buttons} ${styles.edit}`}>
            VOLTAR
          </Link>
        </div>
      </form>
    </div>
  );
}
