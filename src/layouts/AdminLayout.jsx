import { Outlet } from "react-router"
import { SidebarAdmin } from "../components/SidebarAdmin"

export function AdminLayout() {
    return (
        <div className="flex">
            <SidebarAdmin />
            <main className="p-5">
                <Outlet />
            </main>
        </div>
    )
}
