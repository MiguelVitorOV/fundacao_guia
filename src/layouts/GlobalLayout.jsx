import { Outlet } from "react-router";
import { HeaderGlobal } from '../components/HeaderGlobal';
import { FooterGlobal } from '../components/FooterGlobal';

export function GlobalLayout() {
    return (
        <div>
            <HeaderGlobal />
            <main>
                <Outlet />
            </main>
            <FooterGlobal />
        </div>
    );
}
