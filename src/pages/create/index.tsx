import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import styles from "../../styles/Home.module.css";

export default function CreateBudget() {
  const { register, handleSubmit, reset } = useForm();
  const { push } = useRouter();

  async function onSubmit(data: any) {
    await axios.post("http://localhost:5000/budget", data);
    reset();
    push("/");
  }

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
      <h1>Criação de orçamento</h1>
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
            CRIAR
          </button>
          <Link href="/" className={`${styles.buttons} ${styles.edit}`}>
            VOLTAR
          </Link>
        </div>
      </form>
    </div>
  );
}
