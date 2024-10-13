"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EditarPet = () => {
  const router = useRouter();
  const [petData, setPetData] = useState<any>({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPetData = async () => {
      const email = localStorage.getItem("userEmail");
      if (!email) {
        router.push("/pages/Login");
        return;
      }
      const response = await fetch("/api/user");
      const users = await response.json();
      const user = users.find((u: any) => u.email === email);
      if (user && user.pets.length > 0) {
        setPetData(user.pets[0]);
      } else {
        setError("Pet não encontrado.");
      }
    };
    fetchPetData();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
          updatedUser: { pets: [petData] },
        }),
      });

      if (response.ok) {
        alert("Dados do pet atualizados com sucesso!");
        router.push("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Erro ao atualizar os dados do pet:", error);
      setError(
        "Ocorreu um erro ao atualizar os dados do pet. Tente novamente."
      );
    }
  };

  return (
    <div>
      <h1>Editar Dados do Pet</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do Pet"
          value={petData.nome_pet || ""}
          onChange={(e) => setPetData({ ...petData, nome_pet: e.target.value })}
          required
        />
        <div>
          <input
            type="text"
            placeholder="Espécie"
            value={petData.especie || ""}
            onChange={(e) =>
              setPetData({ ...petData, especie: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Raça"
            value={petData.raca || ""}
            onChange={(e) => setPetData({ ...petData, raca: e.target.value })}
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Idade"
            value={petData.idade || ""}
            onChange={(e) =>
              setPetData({ ...petData, idade: parseInt(e.target.value) })
            }
            required
          />
          <input
            type="number"
            placeholder="Peso"
            value={petData.peso || ""}
            onChange={(e) =>
              setPetData({ ...petData, peso: parseInt(e.target.value) })
            }
            required
          />
          <input
            type="text"
            placeholder="Cor"
            value={petData.cor || ""}
            onChange={(e) => setPetData({ ...petData, cor: e.target.value })}
            required
          />
        </div>
        <textarea
          placeholder="Observações"
          value={petData.observacoes || ""}
          onChange={(e) =>
            setPetData({ ...petData, observacoes: e.target.value })
          }
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditarPet;
