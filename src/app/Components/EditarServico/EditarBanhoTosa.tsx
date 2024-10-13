"use client";
import { useState } from "react";

interface Agendamento {
  id: number;
  servico: string;
  dia: string;
  hora: string;
  observacoes?: string;
}

interface EditarProps {
  agendamento: Agendamento;
  onAgendamentoUpdated: () => void;
}

export default function EditarBanhoTosa({
  agendamento,
  onAgendamentoUpdated,
}: EditarProps) {
  const [servico, setServico] = useState(agendamento.servico || "Banho & Tosa");
  const [data, setData] = useState(agendamento.dia || "");
  const [hora, setHora] = useState(agendamento.hora || "08:00");
  const [observacoes, setObservacoes] = useState(agendamento.observacoes || "");
  const [error, setError] = useState("");

  const handleEditar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = localStorage.getItem("userEmail");

    const updatedAgendamento = {
      id: agendamento.id,
      servico,
      dia: data,
      hora,
      observacoes,
    };

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, updatedAgendamento }),
      });

      if (response.ok) {
        alert("Agendamento atualizado com sucesso!");
        onAgendamentoUpdated();
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Erro ao atualizar agendamento:", error);
      setError("Ocorreu um erro ao atualizar o agendamento. Tente novamente.");
    }
  };

  const handleDeletar = async () => {
    const email = localStorage.getItem("userEmail");

    try {
      const response = await fetch("/api/user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, agendamentoId: agendamento.id }),
      });

      if (response.ok) {
        alert("Agendamento deletado com sucesso!");
        onAgendamentoUpdated();
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Erro ao deletar agendamento:", error);
      setError("Ocorreu um erro ao deletar o agendamento. Tente novamente.");
    }
  };

  return (
    <>
      <h1>Editar Agendamento de Banho & Tosa</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleEditar}>
        <label className="select_style">
          <select
            value={servico}
            onChange={(e) => setServico(e.target.value)}
            required
          >
            <option value="Banho & Tosa">Banho & Tosa</option>
            <option value="Apenas Banho">Apenas Banho</option>
            <option value="Apenas Tosa">Apenas Tosa</option>
          </select>
        </label>
        <div>
          <input
            type="date"
            value={data}
            onFocus={(e) => {
              if ("showPicker" in e.currentTarget) {
                e.currentTarget.showPicker();
              }
            }}
            onChange={(e) => setData(e.target.value)}
            required
          />
          <select
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          >
            <option value="08:00">08:00</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
          </select>
        </div>
        <textarea
          placeholder="Observações"
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
        ></textarea>
        <div>
          <button type="submit">Editar</button>
          <button type="button" className="deletar" onClick={handleDeletar}>
            Deletar
          </button>
        </div>
      </form>
    </>
  );
}
