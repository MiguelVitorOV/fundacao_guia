import { NavLink, useNavigate } from "react-router"

export function SidebarAdmin() {

    const navigate = useNavigate()

    return (
        <div className="flex flex-col p-5 gap-10 justify-between h-screen">
            <h1>Dashboard</h1>
            <nav className="flex flex-col gap-10">
                <NavLink to="/admin">Home</NavLink>
                <NavLink to="/admin/noticias">Noticias</NavLink>
                <NavLink to="/admin/vagas">Vagas</NavLink>
                <NavLink to="/admin/eventos">Eventos</NavLink>
                <NavLink to="/admin/exames">Localização</NavLink>
            </nav>

            <nav>
                <button onClick={() => {navigate("/")}}>Sair</button>
            </nav>
        </div>
    )
}