"use client";
import AgendarBanhoTosa from "@/app/Components/Agendar/AgendarBanhoTosa";
import AgendarVet from "@/app/Components/Agendar/AgendarVet";
import Link from "next/link";
import { useState } from "react";

export default function Servicos() {
  const logado = localStorage.getItem("logado");

  const [selecionou, setSelecionou] = useState(0);

  return (
    <>
      <main>
        <div className="Servicos">
          {!logado ? (
            <>
              <img src="/images/cadastrar_aviso.png" alt="" />
              <h1>Cadastre seu Pet!</h1>
              <Link href="/pages/Login">Cadastrar</Link>
            </>
          ) : (
            <>
              <div className={selecionou == 0 ? "ativa" : "desativa"}>
                <h1>Escolha um Serviço</h1>
                <div className="servicos">
                  <div className="servico" onClick={() => setSelecionou(1)}>
                    <img src="/images/BanhoTosa.png" alt="" />
                    <div>
                      <h2>Banho & Tosa</h2>
                      <p>O banho mais relaxante pro seu pet</p>
                    </div>
                  </div>
                  <div className="servico" onClick={() => setSelecionou(2)}>
                    <img src="/images/Veterinario.png" alt="" />
                    <div>
                      <h2>Veterinário</h2>
                      <p>Veterinários profissionais pro seu pet</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={selecionou == 1 ? "ativa" : "desativa"}>
                <AgendarBanhoTosa />
                <span onClick={() => setSelecionou(0)}>Cancelar</span>
              </div>

              <div className={selecionou == 2 ? "ativa" : "desativa"}>
                <AgendarVet />
                <span onClick={() => setSelecionou(0)}>Cancelar</span>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
