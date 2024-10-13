"use client";
import { TbEdit } from "react-icons/tb";
import { HiOutlineLogout } from "react-icons/hi";
import Link from "next/link";
import { useState } from "react";
import Atualizar_Perfil_Pet from "@/app/Components/EditarPerfil/EditarPet";
import Atualizar_Perfil_User from "@/app/Components/EditarPerfil/EditarUser";

export default function Perfil() {
  const logado = localStorage.getItem("logado");

  const handleLogout = () => {
    localStorage.removeItem("logado");
    localStorage.clear();
    window.location.reload();
  };

  const [atualizar, setAtualizar] = useState(0);

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
              <div className={atualizar == 0 ? "listadiv" : "desativa"}>
                <h1>Informações</h1>
                <div className="lista">
                  <button onClick={() => setAtualizar(1)}>
                    Editar informações do Pet <TbEdit size={18} />
                  </button>
                  <button onClick={() => setAtualizar(2)}>
                    Editar informações do Proprietário <TbEdit size={18} />
                  </button>
                  <div className="divide_perfil"></div>
                  <button className="sair" onClick={handleLogout}>
                    Sair
                    <HiOutlineLogout size={18} />
                  </button>
                </div>
              </div>
              <div className={atualizar == 1 ? "ativa" : "desativa"}>
                <Atualizar_Perfil_Pet />
                <span onClick={() => setAtualizar(0)}>Cancelar</span>
              </div>
              <div className={atualizar == 2 ? "ativa" : "desativa"}>
                <Atualizar_Perfil_User />
                <span onClick={() => setAtualizar(0)}>Cancelar</span>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
