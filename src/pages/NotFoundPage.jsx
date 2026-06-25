import { Link } from "react-router"
import { AlertTriangle, Home } from "lucide-react"

export function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <div className="bg-blue-50 text-blue-800 p-6 rounded-full mb-6 shadow-sm border border-blue-100">
                <AlertTriangle size={64} strokeWidth={1.5} />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                Página não encontrada
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Desculpe, mas a página que você está procurando não existe, foi removida ou está temporariamente indisponível.
            </p>
            
            <Link 
                to="/" 
                className="flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-lg font-bold hover:bg-blue-800 transition-colors shadow-md group"
            >
                <Home size={20} className="group-hover:-translate-y-0.5 transition-transform" />
                Voltar para o Início
            </Link>
        </div>
    )
}
