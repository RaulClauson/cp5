"use client";
import EditarBanhoTosa from "@/app/Components/EditarServico/EditarBanhoTosa";
import EditarVet from "@/app/Components/EditarServico/EditarVet";
import Link from "next/link";
import { useState, useEffect } from "react";
import { TbEdit } from "react-icons/tb";
import { useRouter } from "next/navigation";

// Define the type for Agendamento
interface Agendamento {
  id: number;
  servico: string;
  dia: string;
  hora: string;
  observacoes?: string;
}

export default function Agenda() {
  const logado = localStorage.getItem("logado") === "true";
  const router = useRouter();
  const [editar, setEditar] = useState(0); // Controls which editing component to show
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [selectedAgendamento, setSelectedAgendamento] =
    useState<Agendamento | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAgendamentos = async () => {
      const email = localStorage.getItem("userEmail");
      try {
        const response = await fetch("/api/user");
        const users = await response.json();
        const user = users.find((u: { email: string }) => u.email === email);

        if (user && user.agendamentos && user.agendamentos.length > 0) {
          setAgendamentos(user.agendamentos);
        } else {
          setError("Nenhum agendamento encontrado.");
        }
      } catch (err) {
        console.error("Erro ao buscar agendamentos:", err);
        setError("Ocorreu um erro ao buscar os agendamentos.");
      }
    };

    fetchAgendamentos();
  }, [router]);

  const handleAgendamentoUpdated = () => {
    setEditar(0);
    setSelectedAgendamento(null);
    setError("");
    fetchAgendamentos();
  };

  const fetchAgendamentos = async () => {
    const email = localStorage.getItem("userEmail");
    try {
      const response = await fetch("/api/user");
      const users = await response.json();
      const user = users.find((u: { email: string }) => u.email === email);
      if (user && user.agendamentos.length > 0) {
        setAgendamentos(user.agendamentos);
      } else {
        setAgendamentos([]);
        setError("Nenhum agendamento encontrado.");
      }
    } catch (err) {
      console.error("Erro ao buscar agendamentos:", err);
      setError("Ocorreu um erro ao buscar os agendamentos.");
    }
  };

  // Group agendamentos by servico
  const groupedAgendamentos: Record<string, Agendamento[]> =
    agendamentos.reduce((acc, agendamento) => {
      (acc[agendamento.servico] = acc[agendamento.servico] || []).push(
        agendamento
      );
      return acc;
    }, {} as Record<string, Agendamento[]>);

  return (
    <>
      <main>
        <div>
          {!logado ? (
            <>
              <img src="/images/cadastrar_aviso.png" alt="" />
              <h1>Cadastre seu Pet!</h1>
              <Link href="/pages/Login">Cadastrar</Link>
            </>
          ) : (
            <>
              <div className={editar === 0 ? "listadiv" : "desativa"}>
                <h1>Lista de Serviços</h1>
                {error && <p>{error}</p>}
                {Object.entries(groupedAgendamentos).map(
                  ([servico, agendamentos]) => (
                    <div key={servico}>
                      <h2>{servico}</h2>
                      {agendamentos.map((agendamento) => (
                        <div className="lista" key={agendamento.id}>
                          <button
                            onClick={() => {
                              setSelectedAgendamento(agendamento);
                              setEditar(servico === "Veterinário" ? 2 : 1);
                            }}
                          >
                            <p>
                              {agendamento.dia} às {agendamento.hora}
                            </p>
                            <TbEdit size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
              {editar === 1 && selectedAgendamento && (
                <div className="ativa">
                  <EditarBanhoTosa
                    agendamento={selectedAgendamento}
                    onAgendamentoUpdated={handleAgendamentoUpdated}
                  />
                  <span onClick={() => setEditar(0)}>Cancelar</span>
                </div>
              )}
              {editar === 2 && selectedAgendamento && (
                <div className="ativa">
                  <EditarVet
                    agendamento={selectedAgendamento}
                    onAgendamentoUpdated={handleAgendamentoUpdated}
                  />
                  <span onClick={() => setEditar(0)}>Cancelar</span>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
