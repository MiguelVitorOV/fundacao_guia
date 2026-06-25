import { Link } from "react-router"
import { FileText, ArrowRight, Image as ImageIcon } from "lucide-react"

export function NoticiasListAdmin({ noticias }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="px-6 py-5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <FileText className="text-rose-700" size={22} />
                    <h2 className="text-xl font-bold text-gray-900">Últimas Notícias</h2>
                </div>
                <Link to="/admin/noticias" className="text-sm font-bold text-rose-700 hover:text-rose-900 flex items-center gap-1 transition-colors">
                    Gerenciar <ArrowRight size={16} />
                </Link>
            </div>
            <div className="px-6 pb-6 pt-2 flex flex-col gap-6">
                {noticias.map(noticia => (
                    <div key={noticia.id} className="flex gap-5 items-start">
                        <div className="w-28 h-24 shrink-0 bg-neutral-100 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200">
                            {noticia.imagemUrl ? (
                                <img src={noticia.imagemUrl} alt={noticia.titulo} className="w-full h-full object-cover" />
                            ) : (
                                <ImageIcon className="text-gray-400" size={32} strokeWidth={1.5} />
                            )}
                        </div>
                        <div className="flex flex-col justify-center h-full pt-1">
                            <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2 hover:text-blue-800 transition-colors cursor-pointer">{noticia.titulo}</h3>
                            <p className="text-sm text-gray-500 mt-2">
                                {noticia.dataPublicacao ? new Date(noticia.dataPublicacao).toLocaleDateString("pt-BR") : ""}
                            </p>
                        </div>
                    </div>
                ))}
                {noticias.length === 0 && <p className="text-gray-500 text-sm italic">Nenhuma notícia publicada.</p>}
            </div>
        </div>
    )
}
