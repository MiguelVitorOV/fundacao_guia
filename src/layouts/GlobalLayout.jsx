import { Outlet } from "react-router"
import { HeaderGlobal } from '../components/HeaderGlobal'
import { FooterGlobal } from '../components/FooterGlobal'

export function GlobalLayout() {
    return (
        <div>
            <HeaderGlobal />
            <main className="m-5">
                <Outlet />
            </main>
            <FooterGlobal />
        </div>
    )
}
