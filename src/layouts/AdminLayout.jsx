import { Outlet } from "react-router";
import { SidebarAdmin } from "../components/SidebarAdmin";

export function AdminLayout() {
    return (
        <div>
            <SidebarAdmin />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
