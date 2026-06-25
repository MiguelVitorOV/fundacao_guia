import { useGetData } from "../hooks/useGetData"
import { parseTags } from "../utils/formatter"
import { NavigateButton } from "./NavigateButton"

export function ListaEventos(props) {
    const [fetchedEventos, fetchedLoading, fetchedError] = useGetData(props.eventos ? null : `/eventos?recentes=${props.recentes}`)

    const IMAGEM_PLACEHOLDER = "/placeholder.png"

    const eventosArray = props.eventos || (fetchedEventos && fetchedEventos.body?.eventos) || []
    const isLoading = props.eventos ? false : fetchedLoading
    const isError = props.eventos ? false : fetchedError

    const limit = props.recentes ? parseInt(props.recentes, 10) : undefined
    const eventosLimitados = limit ? eventosArray.slice(0, limit) : eventosArray

    const eventosList = eventosLimitados.map((evento) => {
        let imageUrl = IMAGEM_PLACEHOLDER
        if (evento.imagens) {
            if (Array.isArray(evento.imagens) && evento.imagens.length > 0) {
                imageUrl = evento.imagens[0]
            } else if (typeof evento.imagens === 'string') {
                imageUrl = evento.imagens.split(',')[0]
            }
        }

        const publicoAlvoArray = parseTags(evento.publico_alvo)

        let statusColor = "bg-blue-100 text-blue-800"
        const lowerStatus = (evento.status || "").toLowerCase()
        if (lowerStatus.includes("agendado") || lowerStatus.includes("breve")) {
            statusColor = "bg-green-100 text-green-800"
        } else if (lowerStatus.includes("encerrado") || lowerStatus.includes("realizado") || lowerStatus.includes("concluído")) {
            statusColor = "bg-gray-200 text-gray-600"
        } else if (lowerStatus.includes("cancelado")) {
            statusColor = "bg-red-100 text-red-800"
        }

        return (
            <div
                key={evento.id}
                className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
            >
                <div className="overflow-hidden h-48 w-full bg-gray-100 relative">
                    <img
                        src={imageUrl}
                        alt={evento.titulo}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => { e.target.src = IMAGEM_PLACEHOLDER }}
                    />
                    {evento.status && (
                        <div className="absolute top-4 right-4">
                            <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-sm ${statusColor}`}>
                                {evento.status}
                            </span>
                        </div>
                    )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    {publicoAlvoArray.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {publicoAlvoArray.map((publico, index) => (
                                <span key={index} className="text-xs font-semibold text-blue-800 bg-blue-50 border border-blue-100 px-2 py-1 rounded w-fit">
                                    {publico}
                                </span>
                            ))}
                        </div>
                    )}

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{evento.titulo}</h3>

                    <div className="space-y-2 mb-6 flex-grow">
                        {(evento.data_inicio || evento.data) && (
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="mr-2">📅</span>
                                {new Date(evento.data_inicio || evento.data).toLocaleDateString('pt-BR')}
                                {evento.horario && ` às ${evento.horario}`}
                            </div>
                        )}
                        {evento.local && (
                            <div className="flex items-center text-sm text-gray-600 line-clamp-1">
                                <span className="mr-2">📍</span> {evento.local}
                            </div>
                        )}
                        {(evento.descricao || evento.resumo) && (
                            <p className="text-gray-600 text-sm mt-3 line-clamp-2">{evento.descricao || evento.resumo}</p>
                        )}
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100 flex justify-end">
                        <NavigateButton rota={`/eventos/${evento.id}`} text="Ver Detalhes" variacao="primary" />
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
            {isLoading && <p className="text-blue-800 col-span-full">Carregando eventos...</p>}
            {isError && <p className="text-red-600 col-span-full">Erro ao carregar eventos.</p>}
            {eventosList.length > 0 ? eventosList : (!isLoading && !isError && <p className="col-span-full text-center text-gray-500">Nenhum evento encontrado.</p>)}
        </div>
    )
}
