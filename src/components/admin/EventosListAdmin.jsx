import { Link } from "react-router"
import { Calendar, ArrowRight } from "lucide-react"

export function EventosListAdmin({ eventos }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="px-6 py-5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Calendar className="text-emerald-700" size={22} />
                    <h2 className="text-xl font-bold text-gray-900">Próximos Eventos</h2>
                </div>
                <Link to="/admin/eventos" className="text-sm font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 transition-colors">
                    Gerenciar <ArrowRight size={16} />
                </Link>
            </div>
            <div className="px-6 pb-6 pt-2 flex flex-col gap-3">
                {eventos.map(evento => (
                    <div key={evento.id} className="bg-neutral-50 rounded-xl p-5 flex flex-col gap-3 border border-gray-100">
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg">{evento.titulo}</h3>
                            <p className="text-sm text-gray-500 mt-0.5">
                                {evento.data_inicio ? new Date(evento.data_inicio).toLocaleDateString("pt-BR") : "Data não informada"}
                            </p>
                        </div>
                        <div>
                            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-lg inline-block uppercase tracking-wider">
                                {evento.status || "Programado"}
                            </span>
                        </div>
                    </div>
                ))}
                {eventos.length === 0 && <p className="text-gray-500 text-sm italic">Nenhum evento programado.</p>}
            </div>
        </div>
    )
}
