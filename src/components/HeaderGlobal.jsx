import { NavLink, Link } from "react-router"
import { HeartPulse } from "lucide-react"

export function HeaderGlobal() {
    const navLinkClass = ({ isActive }) =>
        `transition-all duration-200 border-b-2 font-semibold ${
            isActive
                ? "text-primary border-primary"
                : "text-neutral-500 border-transparent hover:text-secondary hover:border-secondary/30"
        }`
    return (
        <div className="flex p-5 gap-10 justify-between items-center border-b border-neutral-200">
            <div className="flex gap-2 items-center">
                <HeartPulse className="text-secondary"/>
                <Link to="/" className="font-bold text-xl text-primary hover:opacity-90">Fundação Guia</Link>
            </div>
            <nav className="flex gap-10">
                <NavLink to="/" className={navLinkClass}>
                    Home
                </NavLink>
                <NavLink to="/noticias" className={navLinkClass}>
                    Notícias
                </NavLink>
                <NavLink to="/vagas" className={navLinkClass}>
                    Vagas
                </NavLink>
                <NavLink to="/eventos" className={navLinkClass}>
                    Eventos
                </NavLink>
                <NavLink to="/localizacao" className={navLinkClass}>
                    Localização
                </NavLink>
            </nav>
        <div className="flex gap-2 invisible">
                <HeartPulse />
                <h1 className="font-bold text-xl">Fundação Guia</h1>
            </div>
        </div>
    )
}