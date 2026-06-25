import { CrudComponent } from "../../components/CrudComponent"
import { CreateModalNoticias } from "../../components/Modais/CreateModalNoticias"
import { FileText } from "lucide-react"

export function NoticiasManagePage() {

    return (
        <div className="p-8 w-full max-w-5xl mx-auto">
            <div className="mb-8 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-rose-100 text-rose-700 shadow-sm border border-rose-200">
                    <FileText size={28} strokeWidth={2} />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-text tracking-tight">Gerenciar Notícias</h1>
                    <p className="text-gray-500 mt-1 font-medium">Crie, edite ou remova as notícias do portal.</p>
                </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
                <CrudComponent 
                url="/noticias?recentes=900" 
                deleteUrl="/adminAcao/noticias" 
                item="noticias" 
                principal="titulo" 
                CreateModal={CreateModalNoticias} />
            </div>
        </div>
    )
}
