import "./Menu.css";
import Link from "next/link";
import { MdPets } from "react-icons/md";
import { IoCalendarClear } from "react-icons/io5";
import { TiPlus } from "react-icons/ti";

export default function Menu() {
  return (
    <>
      <header>
        <nav>
          <Link href="/">
            <h2>Pet Shop</h2>
          </Link>
          <Link href="/pages/Servicos" className="link">
            <TiPlus />
            Agendar um Serviço
          </Link>
          <Link href="/pages/Agenda" className="link">
            <IoCalendarClear />
            Ver minha Agenda
          </Link>
        </nav>
        <Link href="/pages/Perfil" className="perfil">
          <MdPets size={20} />
          <p>Meu Pet</p>
        </Link>
      </header>
    </>
  );
}
