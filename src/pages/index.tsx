/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import styles from "../styles/Home.module.css";

export interface BudgetData {
  id: string;
  createdAt: string;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  genre: string;
  date_nasc: string;
  professional: string;
  date_start: string;
  date_end: string;
  day_week: string;
  observation: string;
  city: string;
  state: string;
  cep: string;
}

export default function Home() {
  const [budgets, setBudgets] = useState<BudgetData[]>([]);

  async function handleDelete(id: string) {
    await axios.delete(`http://localhost:5000/budget/delete/${id}`);
  }

  async function getBudgets() {
    const response = await axios.get("http://localhost:5000/budget");
    setBudgets(response.data);
  }

  useEffect(() => {
    getBudgets();
  }, [handleDelete]);

  return (
    <>
      <Head>
        <title>Benson App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "50px",
            }}
          >
            <h1>Orçamentos: {budgets?.length}</h1>
            <Link href="/create" className="buttonCreate">
              <MdAdd />
            </Link>
          </div>

          {budgets.length > 0 &&
            budgets.map((budget) => (
              <div key={budget.id} className={styles.container}>
                <ul>
                  <li>Nome: {budget.name}</li>
                  <li>cpf: {budget.cpf}</li>
                  <li>fone: {budget.phone}</li>
                  <li>email: {budget.email}</li>
                  <li>genero: {budget.genre}</li>
                  <li>data de nascimento: {budget.date_nasc}</li>
                  <li>Endereço</li>
                  <ul>
                    <li>cidade: {budget.city}</li>
                    <li>estado: {budget.state}</li>
                    <li>cep: {budget.cep}</li>
                  </ul>
                  <li>Profissional: {budget.professional}</li>
                  <li>Data do atendimento: {budget.date_start}</li>
                  <li>Data de conclusão: {budget.date_end}</li>
                  <li>Dia da semana: {budget.day_week}</li>
                  <li>Observações: {budget.observation}</li>
                </ul>
                <div className={styles.buttonsContainer}>
                  <Link href={`/budget/${budget.id}`}>
                    <button className={`${styles.buttons} ${styles.ver}`}>
                      Ver mais
                    </button>
                  </Link>
                  <Link href={`/edit/${budget.id}`}>
                    <button className={`${styles.buttons} ${styles.edit}`}>
                      Editar
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(budget.id)}
                    className={`${styles.buttons} ${styles.delete}`}
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}
        </div>
      </main>
    </>
  );
}
