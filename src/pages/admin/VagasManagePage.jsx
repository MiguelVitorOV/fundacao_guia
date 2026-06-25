import { CrudComponent } from "../../components/CrudComponent"
import { CreateModalVagas } from "../../components/Modais/CreateModalVagas"
import { Briefcase } from "lucide-react"

export function VagasManagePage() {
    return (
        <div className="p-8 w-full max-w-5xl mx-auto">
            <div className="mb-8 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-indigo-100 text-indigo-700 shadow-sm border border-indigo-200">
                    <Briefcase size={28} strokeWidth={2} />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-text tracking-tight">Gerenciar Vagas</h1>
                    <p className="text-gray-500 mt-1 font-medium">Administre as oportunidades de emprego abertas.</p>
                </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
                <CrudComponent 
                url="/vagas" 
                deleteUrl="/adminAcao/vagas" 
                item="vagas" 
                principal="cargo" 
                CreateModal={CreateModalVagas} />
            </div>
        </div>
    )
}