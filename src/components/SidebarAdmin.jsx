import { NavLink, useNavigate } from "react-router"
import { useAuth } from "../contexts/AuthContext"
import { FileText, Briefcase, Calendar, MapPin, LogOut, HeartPulse } from "lucide-react"

export function SidebarAdmin() {

    const navigate = useNavigate()
    const { logout } = useAuth()

    const handleLogout = () => {
        navigate("/")

        setTimeout(() => {
            logout()
        }, 100)
    }

    const navItems = [
        { path: "/admin", end: true, label: "Visão Geral", icon: HeartPulse },
        { path: "/admin/noticias", label: "Notícias", icon: FileText },
        { path: "/admin/vagas", label: "Vagas", icon: Briefcase },
        { path: "/admin/eventos", label: "Eventos", icon: Calendar },
        { path: "/admin/exames", label: "Localização", icon: MapPin },
    ]

    return (
        <aside className="w-64 h-full bg-blue-800 text-white flex flex-col shadow-xl z-10">
            <div className="p-6 pb-8 border-b border-primary">
                <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                    <HeartPulse className="text-secondary" size={28} strokeWidth={2.5} />
                    Painel Admin
                </h1>
                <p className="text-blue-200 text-sm mt-1 font-medium">Fundação Guia</p>
            </div>

            <nav className="flex-1 py-6 px-4 flex flex-col gap-2 overflow-y-auto">
                <div className="text-xs font-bold text-blue-200 uppercase tracking-wider mb-2 px-3 opacity-80">
                    Menu Principal
                </div>

                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.end}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all duration-200 ${isActive
                                ? "bg-primary text-white shadow-sm border border-blue-200/20"
                                : "text-blue-200 hover:bg-primary/50 hover:text-white"
                            }`
                        }
                    >
                        <item.icon size={20} strokeWidth={2} />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-primary">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-3 py-3 rounded-lg font-medium text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all duration-200"
                >
                    <LogOut size={20} strokeWidth={2} />
                    Sair do Sistema
                </button>
            </div>
        </aside>
    )
}