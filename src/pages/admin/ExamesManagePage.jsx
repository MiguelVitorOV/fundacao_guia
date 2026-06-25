import { CrudComponent } from "../../components/CrudComponent"
import { CreateModalExames } from "../../components/Modais/CreateModalExames"
import { MapPin } from "lucide-react"

export function ExamesManagePage() {
    return (
        <div className="p-8 w-full max-w-5xl mx-auto">
            <div className="mb-8 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-cyan-100 text-cyan-700 shadow-sm border border-cyan-200">
                    <MapPin size={28} strokeWidth={2} />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-text tracking-tight">Gerenciar Localização</h1>
                    <p className="text-gray-500 mt-1 font-medium">Administre os exames, setores e blocos da fundação.</p>
                </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
                <CrudComponent 
                url="/exames" 
                deleteUrl="/adminAcao/exame" 
                item="exames" 
                principal="nome" 
                CreateModal={CreateModalExames} />
            </div>
        </div>
    )
}