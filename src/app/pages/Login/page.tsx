"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email_login, setEmail_login] = useState("");
  const [senha_login, setSenha_login] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email_login, senha: senha_login }),
      });

      if (response.ok) {
        localStorage.setItem("userEmail", email_login);
        localStorage.setItem("logado", "true");
        router.push("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Ocorreu um erro ao fazer login. Tente novamente.");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("logado") === "true") {
      router.push("/");
    }
  }, [router]);

  const [login, setLogin] = useState(true);
  const [cadastro1, setCadastro1] = useState(false);
  const [cadastro2, setCadastro2] = useState(false);
  const [cadastro3, setCadastro3] = useState(false);

  const [nome_pet, setNome_pet] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [cor, setCor] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = {
      nome,
      email,
      senha,
      pets: [{ nome_pet, especie, raca, idade, peso, cor, observacoes }],
      agendamentos: [],
    };

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newUser }),
      });

      if (response.ok) {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("logado", "true");
        router.push("/");
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erro ao cadastrar o usuário:", error);
      alert("Ocorreu um erro ao cadastrar o usuário. Tente novamente.");
    }
  };

  return (
    <main>
      {/* LOGIN */}
      <div className={login ? "ativa2" : "desativa2"}>
        <h1>Boas-Vindas!</h1>
        <form onSubmit={handleLogin}>
          {error && <p>{error}</p>}
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail_login(e.target.value)}
            value={email_login}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setSenha_login(e.target.value)}
            value={senha_login}
          />
          <button type="submit">Entrar</button>
          <span
            onClick={() => {
              setLogin(false);
              setCadastro1(true);
            }}
          >
            Ainda não tem uma conta? <span className="bold">Cadastre-se</span>
          </span>
        </form>
      </div>

      {/* CADASTRO 1 */}
      <div className={cadastro1 ? "ativa2" : "desativa2"}>
        <h1>Qual o nome do Pet?</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (nome_pet) {
              setCadastro1(false);
              setCadastro2(true);
            }
          }}
        >
          <input
            type="text"
            placeholder="Thor"
            required
            onChange={(e) => setNome_pet(e.target.value)}
            value={nome_pet}
          />
          <button type="submit">Próximo</button>
          <span
            onClick={() => {
              setCadastro1(false);
              setLogin(true);
            }}
          >
            Já tem uma conta? <span className="bold">Logar-me</span>
          </span>
        </form>
      </div>

      {/* CADASTRO 2 */}
      <div className={cadastro2 ? "ativa" : "desativa"}>
        <h1>
          Informações de <span className="bold">{nome_pet}</span>
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (especie && raca && idade && peso && cor) {
              setCadastro2(false);
              setCadastro3(true);
            }
          }}
        >
          <div>
            <input
              type="text"
              placeholder="Cachorro"
              required
              onChange={(e) => setEspecie(e.target.value)}
              value={especie}
            />
            <input
              type="text"
              placeholder="Vira-Lata"
              required
              onChange={(e) => setRaca(e.target.value)}
              value={raca}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Idade"
              min={0}
              required
              onChange={(e) => setIdade(e.target.value)}
              value={idade}
            />
            <input
              type="number"
              placeholder="Peso"
              min={1}
              required
              onChange={(e) => setPeso(e.target.value)}
              value={peso}
            />
            <input
              type="text"
              placeholder="Caramelo"
              required
              onChange={(e) => setCor(e.target.value)}
              value={cor}
            />
          </div>
          <textarea
            placeholder="Observações"
            onChange={(e) => setObservacoes(e.target.value)}
            value={observacoes}
          />
          <button type="submit">Próximo</button>
          <span
            onClick={() => {
              setCadastro2(false);
              setLogin(true);
            }}
          >
            Já tem uma conta? <span className="bold">Logar-me</span>
          </span>
        </form>
      </div>

      {/* CADASTRO 3 */}
      <div className={cadastro3 ? "ativa" : "desativa"}>
        <h1>
          Quem é o Proprietário de <span className="bold">{nome_pet}</span>?
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            required
            onChange={(e) => setNome(e.target.value)}
            value={nome}
          />
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Senha"
            required
            onChange={(e) => setSenha(e.target.value)}
            value={senha}
          />
          <button type="submit">Finalizar</button>
          <span
            onClick={() => {
              setCadastro3(false);
              setLogin(true);
            }}
          >
            Já tem uma conta? <span className="bold">Logar-me</span>
          </span>
        </form>
      </div>
    </main>
  );
}
