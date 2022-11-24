/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BudgetData } from "..";
import styles from "../../styles/Home.module.css";

export default function Ver() {
  const { query } = useRouter();
  const [budget, setBudget] = useState<BudgetData>();

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
      <h1>Visualização Orçamento</h1>

      {budget && (
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
            <Link href="/">
              <button className={`${styles.buttons} ${styles.ver}`}>
                Voltar
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
