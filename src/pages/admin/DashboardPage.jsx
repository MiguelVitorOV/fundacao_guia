import { useGetData } from "../../hooks/useGetData"
import { Briefcase, FileText, Calendar, Activity } from "lucide-react"
import { useState, useEffect } from "react"
import { PopUp } from "../../components/PopUp"

import { VagasListAdmin } from "../../components/admin/VagasListAdmin"
import { EventosListAdmin } from "../../components/admin/EventosListAdmin"
import { NoticiasListAdmin } from "../../components/admin/NoticiasListAdmin"

export function DashboardPage() {

    const [dataNoticias, , errorNoticias] = useGetData(`/noticias?recentes=900`)
    const [dataEventos, , errorEventos] = useGetData(`/eventos`)
    const [dataVagas, , errorVagas] = useGetData(`/vagas`)
    const [dataExames, , errorExames] = useGetData(`/localizacao/overview`)

    const [popup, setPopup] = useState({ isOpen: false, erro: "" })

    useEffect(() => {
        if (errorNoticias || errorEventos || errorVagas || errorExames) {
            setPopup({ isOpen: true, erro: "Erro ao carregar dados da Visão Geral" })
        }
    }, [errorNoticias, errorEventos, errorVagas, errorExames])

    const noticias = dataNoticias?.body?.noticias || []
    const eventos = dataEventos?.body?.eventos || []
    const vagas = dataVagas?.body?.vagas || []
    
    let examesCount = 0
    if (dataExames) {
        for (const bloco of dataExames.body.blocos) {
            for (const setor of bloco.setores) {
                examesCount += setor.exames.length
            }
        }
    }

    const recentVagas = vagas.slice(0, 3)
    const recentEventos = eventos.slice(0, 2)
    const recentNoticias = noticias.slice(0, 4)

    return (
        <div className="p-8 w-full max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-text">Visão Geral</h1>
                <p className="text-gray-500 mt-1">Acompanhe os principais indicadores da Fundação Guia.</p>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-indigo-100 text-indigo-700">
                        <Briefcase size={32} strokeWidth={1.5} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500">Vagas Disponíveis</p>
                        <p className="text-4xl font-extrabold text-gray-900 mt-1">{vagas.length}</p>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-rose-100 text-rose-600">
                        <FileText size={32} strokeWidth={1.5} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500">Notícias Publicadas</p>
                        <p className="text-4xl font-extrabold text-gray-900 mt-1">{noticias.length}</p>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-emerald-100 text-emerald-600">
                        <Calendar size={32} strokeWidth={1.5} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500">Eventos Programados</p>
                        <p className="text-4xl font-extrabold text-gray-900 mt-1">{eventos.length}</p>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-pink-100 text-pink-600">
                        <Activity size={32} strokeWidth={1.5} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500">Exames Cadastrados</p>
                        <p className="text-4xl font-extrabold text-gray-900 mt-1">{examesCount}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Esquerda: Vagas e Eventos */}
                <div className="flex flex-col gap-8">
                    <VagasListAdmin vagas={recentVagas} />
                    <EventosListAdmin eventos={recentEventos} />
                </div>

                {/* Direita: Últimas Notícias */}
                <NoticiasListAdmin noticias={recentNoticias} />
            </div>

            {popup.isOpen && (
                <PopUp 
                    erro={popup.erro} 
                    onClose={() => setPopup({ isOpen: false, erro: "" })} 
                />
            )}
        </div>
    )
}