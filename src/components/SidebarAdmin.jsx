import { NavLink, useNavigate } from "react-router"
import { useAuth } from "../contexts/AuthContext"

export function SidebarAdmin() {

    const navigate = useNavigate()
    const { logout } = useAuth()

    const handleLogout = () => {
        navigate("/")

        setTimeout(() => {
            logout()
        }, 100)
    }

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
                <button onClick={handleLogout}>Sair</button>
            </nav>
        </div>
    )
}