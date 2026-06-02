import { NavLink, Link } from "react-router"
import { HeartPulse, Phone, MapPin, MousePointer2 } from "lucide-react"

export function FooterGlobal() {
    const navLinkClass = ({ isActive }) => 
        `transition-all duration-200 ${
            isActive 
                ? "text-secondary font-semibold" 
                : "hover:text-secondary"
        }`

    return (
        <footer className="flex flex-col bg-primary text-white border-t border-blue-800 text-sm ">
            <div className="flex gap-60 items-start p-5 mx-10 mb-5">
                <div className="flex flex-col w-1/4 gap-10 justify-between">
                    <div className="flex flex-wrap gap-2 items-center">
                        <HeartPulse className="text-secondary"/>
                        <Link to="/" className="font-bold text-xl hover:opacity-90">Fundação Guia</Link>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi.</p>
                </div>
                
                <div className="flex flex-col gap-10 justify-between">
                    <h1 className="font-bold text-lg">Navegação</h1>
                    <nav className="flex flex-col gap-2">
                        <NavLink to="/" className={navLinkClass}>Home</NavLink>
                        <NavLink to="/noticias" className={navLinkClass}>Noticias</NavLink>
                        <NavLink to="/vagas" className={navLinkClass}>Vagas</NavLink>
                        <NavLink to="/eventos" className={navLinkClass}>Eventos</NavLink>
                        <NavLink to="/localizacao" className={navLinkClass}>Localização</NavLink>
                    </nav>
                </div>
                <div className="flex flex-col flex-wrap w-1/4 gap-10 justify-betwee">
                    <h1 className="font-bold text-lg text-white">Sobre a FCV</h1>
                    <div className="flex gap-2 items-center">
                        <Phone className="text-secondary"/>
                        <span>(32) 3729-7000</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <MapPin className="text-secondary"/>
                        <span>Avenida Cristiano Ferreira Varella, 555, Universitário, Muriaé, MG, CEP 36888-233</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <MousePointer2 className="text-secondary"/>
                        <a href="https://fcv.org.br/" target="_blank" className="hover:text-secondary">fcv.org.br</a>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center p-3 text-xs text-neutral-400 gap-1 border-t border-blue-800">
                <p>© Desenvolvido por</p>
                <p className="text-white">The Corredores</p>
                <nav className="ml-auto">
                    <button onClick={() => {navigate("/login")}}>Área Administrativa</button>
                </nav>
            </div>
        </footer>
    )
}
// add: contato