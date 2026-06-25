import { Routes, Route } from "react-router"

import { HomePage } from "../pages/HomePage"
import { NoticiasPage } from "../pages/NoticiasPage"
import { VagasPage } from "../pages/VagasPage"
import { EventosPage } from "../pages/EventosPage"
import { LocalizacaoPage } from "../pages/LocalizacaoPage"
import { VagaDetalhesPage } from "../pages/VagaDetalhesPage"

import { LoginPage } from "../pages/LoginPage"

import { DashboardPage } from "../pages/admin/DashboardPage"
import { NoticiasManagePage } from "../pages/admin/NoticiasManagePage"
import { VagasManagePage } from "../pages/admin/VagasManagePage"
import { EventosManagePage } from "../pages/admin/EventosManagePage"
import { ExamesManagePage } from "../pages/admin/ExamesManagePage"

import { GlobalLayout } from "../layouts/GlobalLayout"
import { AdminLayout } from "../layouts/AdminLayout"
import { ProtectedRoute } from "../components/ProtectedRoute"

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<GlobalLayout />} >
                <Route index element={<HomePage />} />
                <Route path="noticias" element={<NoticiasPage />} />
                <Route path="vagas" element={<VagasPage />} />
                <Route path="vagas/:id" element={<VagaDetalhesPage />} />
                <Route path="eventos" element={<EventosPage />} />
                <Route path="localizacao" element={<LocalizacaoPage />} />
            </Route>

            <Route path="/login" element={<LoginPage />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminLayout />} >
                    <Route index element={<DashboardPage />} />
                    <Route path="noticias" element={<NoticiasManagePage />} />
                    <Route path="vagas" element={<VagasManagePage />} />
                    <Route path="eventos" element={<EventosManagePage />} />
                    <Route path="exames" element={<ExamesManagePage />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes