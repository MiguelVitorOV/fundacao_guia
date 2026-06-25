import { Outlet } from "react-router"
import { SidebarAdmin } from "../components/SidebarAdmin"

export function AdminLayout() {
    return (
        <div className="flex h-screen overflow-hidden bg-neutral-100">
            <SidebarAdmin />
            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    )
}
