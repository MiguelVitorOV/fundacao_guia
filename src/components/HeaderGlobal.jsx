import { NavLink, Link } from "react-router"
import { HeartPulse } from "lucide-react"

export function HeaderGlobal() {
    return (
        <div className="flex p-5 gap-10 justify-between">
            <div className="flex gap-2 items-center">
                <HeartPulse className="text-secondary"/>
                <Link to="/" className="font-bold text-xl text-primary">Fundação Guia</Link>
            </div>
            <nav className="flex gap-10">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/noticias">Noticias</NavLink>
                <NavLink to="/vagas">Vagas</NavLink>
                <NavLink to="/eventos">Eventos</NavLink>
                <NavLink to="/localizacao">Localização</NavLink>
            </nav>
        <div className="flex gap-2 invisible">
                <HeartPulse />
                <h1 className="font-bold text-xl">Fundação Guia</h1>
            </div>
        </div>
    )
}