import { Routes, Route } from "react-router";

import { HomePage } from "../pages/HomePage";
import { NoticiasPage } from "../pages/NoticiasPage";
import { VagasPage } from "../pages/VagasPage";
import { EventosPage } from "../pages/EventosPage";
import { LocalizacaoPage } from "../pages/LocalizacaoPage";

import { LoginPage } from "../pages/admin/LoginPage";
import { DashboardPage } from "../pages/admin/DashboardPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/noticias" element={<NoticiasPage />} />
            <Route path="/vagas" element={<VagasPage />} />
            <Route path="/eventos" element={<EventosPage />} />
            <Route path="/localizacao" element={<LocalizacaoPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<DashboardPage />} />
        </Routes>
    );
}

export default AppRoutes;