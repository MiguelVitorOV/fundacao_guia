import { Link } from "react-router"
import { Briefcase, ArrowRight } from "lucide-react"

export function VagasListAdmin({ vagas }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="px-6 py-5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Briefcase className="text-indigo-800" size={22} />
                    <h2 className="text-xl font-bold text-gray-900">Vagas Recentes</h2>
                </div>
                <Link to="/admin/vagas" className="text-sm font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 transition-colors">
                    Gerenciar <ArrowRight size={16} />
                </Link>
            </div>
            <div className="px-6 pb-6 pt-2 flex flex-col gap-3">
                {vagas.map(vaga => (
                    <div key={vaga.id} className="bg-neutral-50 rounded-xl p-5 flex justify-between items-center border border-gray-100">
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg">{vaga.cargo}</h3>
                            <p className="text-sm text-gray-500 mt-0.5">{vaga.cidade} • {vaga.modalidade} • {vaga.tipo_vinculo}</p>
                        </div>
                        <span className="bg-gray-200 text-gray-700 text-sm font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                            {vaga.quantidade || 1} vagas
                        </span>
                    </div>
                ))}
                {vagas.length === 0 && <p className="text-gray-500 text-sm italic">Nenhuma vaga cadastrada.</p>}
            </div>
        </div>
    )
}
