"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AgendarBanhoTosa() {
  const router = useRouter();
  const [servico, setServico] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("08:00");
  const [observacoes, setObservacoes] = useState("");
  const [error, setError] = useState("");

  const handleAgendar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = localStorage.getItem("userEmail");
    const agendamento = {
      servico,
      dia: data,
      hora,
      observacoes,
    };

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newAgendamento: agendamento }),
      });

      if (response.ok) {
        alert("Agendamento realizado com sucesso!");
        router.push("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Erro ao agendar:", error);
      setError("Ocorreu um erro ao agendar. Tente novamente.");
    }
  };

  return (
    <>
      <h1>Agendamento</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleAgendar}>
        <label className="select_style">
          <select
            name="banhotosa"
            id="banhotosa"
            value={servico}
            onChange={(e) => setServico(e.target.value)}
            required
          >
            <option value="BanhoTosa">Banho & Tosa</option>
            <option value="ApenasBanho">Apenas Banho</option>
            <option value="ApenasTosa">Apenas Tosa</option>
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
        />
        <button type="submit">Agendar</button>
      </form>
    </>
  );
}
