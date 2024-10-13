"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EditarUser = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem("userEmail");
      if (!email) {
        router.push("/pages/Login");
        return;
      }
      const response = await fetch("/api/user");
      const users = await response.json();
      const user = users.find((u: any) => u.email === email);
      if (user) {
        setUserData(user);
      } else {
        setError("Usuário não encontrado.");
      }
    };
    fetchUserData();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
          updatedUser: userData,
        }),
      });

      if (response.ok) {
        alert("Dados atualizados com sucesso!");
        router.push("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
      setError("Ocorreu um erro ao atualizar os dados. Tente novamente.");
    }
  };

  return (
    <div>
      <h1>Editar Dados do Usuário</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={userData.nome || ""}
          onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={userData.senha || ""}
          onChange={(e) => setUserData({ ...userData, senha: e.target.value })}
          required
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditarUser;
