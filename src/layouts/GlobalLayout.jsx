import { Outlet } from "react-router"
import { HeaderGlobal } from '../components/HeaderGlobal'
import { FooterGlobal } from '../components/FooterGlobal'

export function GlobalLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <HeaderGlobal />
            <main className="flex-auto">
                <Outlet />
            </main>
            <FooterGlobal />
        </div>
    )
}
