import { NavLink, useNavigate } from "react-router"

export function FooterGlobal() {

    const navigate = useNavigate()

    return (
        <div className="flex p-5 gap-10 justify-between">
            <nav className="flex gap-10">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/noticias">Noticias</NavLink>
                <NavLink to="/vagas">Vagas</NavLink>
                <NavLink to="/eventos">Eventos</NavLink>
                <NavLink to="/localizacao">Localização</NavLink>
            </nav>

            <nav>
                <button onClick={() => {navigate("/login")}}>Login</button>
            </nav>
        </div>
    )
}
// add: contato