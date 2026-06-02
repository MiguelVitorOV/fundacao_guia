import { NavLink } from "react-router"

export function FooterGlobal() {
    const navLinkClass = ({ isActive }) => 
        `transition-all duration-200 text-sm ${
            isActive 
                ? "text-secondary font-semibold" 
                : "text-neutral-400 hover:text-secondary"
        }`

    return (
        <div className="flex flex-col bg-primary text-white">
            <div className="flex p-5 gap-10 justify-between">
                <nav className="flex gap-10">
                    <NavLink to="/" className={navLinkClass}>Home</NavLink>
                    <NavLink to="/noticias" className={navLinkClass}>Noticias</NavLink>
                    <NavLink to="/vagas" className={navLinkClass}>Vagas</NavLink>
                    <NavLink to="/eventos" className={navLinkClass}>Eventos</NavLink>
                    <NavLink to="/localizacao" className={navLinkClass}>Localização</NavLink>
                </nav>

                <nav>
                    <button onClick={() => {navigate("/login")}}>Área Administrativa</button>
                </nav>
            </div>
            <div className="flex items-center justify-center pb-3 text-xs text-neutral-400 gap-1">
                <p>© Desenvolvido por</p>
                <p className="text-white">The Corredores</p>
            </div>
        </div>
    )
}
// add: contato