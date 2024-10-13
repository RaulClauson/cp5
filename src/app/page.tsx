import Link from "next/link";

export default function Home() {
    return (
      <>
      <main>
        <div>
          <div className="home_titulo">
            <h1>Serviços</h1>
            <p>Agende agora um de nossos serviços para o seu Pet!</p>
          </div>
          <Link href="/pages/Servicos">Conhecer Serviços</Link>
        </div>
        <img src="/images/gato.jpeg" className="imagem_home" alt=""/>
      </main>
      </>
    );
  }
  