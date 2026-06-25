import { CrudComponent } from "../../components/CrudComponent"
import { CreateModalEventos } from "../../components/Modais/CreateModalEventos"
import { Calendar } from "lucide-react"

export function EventosManagePage() {
    return (
        <div className="p-8 w-full max-w-5xl mx-auto">
            <div className="mb-8 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-emerald-100 text-emerald-700 shadow-sm border border-emerald-200">
                    <Calendar size={28} strokeWidth={2} />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-text tracking-tight">Gerenciar Eventos</h1>
                    <p className="text-gray-500 mt-1 font-medium">Cadastre, edite ou cancele os eventos da fundação.</p>
                </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
                <CrudComponent 
                url="/eventos" 
                deleteUrl="/adminAcao/eventos" 
                item="eventos" 
                principal="titulo" 
                CreateModal={CreateModalEventos} />
            </div>
        </div>
    )
}