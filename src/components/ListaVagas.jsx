import { useGetData } from "../hooks/useGetData"
import { NavigateButton } from "./NavigateButton"

export function ListaVagas(props) {
    const [fetchedVagas, fetchedLoading, fetchedError] = useGetData(props.vagas ? null : `/vagas?recentes=${props.recentes}`)

    const vagasArray = props.vagas || (fetchedVagas && fetchedVagas.body?.vagas) || []
    const isLoading = props.vagas ? false : fetchedLoading
    const isError = props.vagas ? false : fetchedError

    const limit = props.recentes ? parseInt(props.recentes, 10) : undefined
    const vagasLimitadas = limit ? vagasArray.slice(0, limit) : vagasArray

    const vagasList = vagasLimitadas.map((vaga) => {
        // Tenta buscar o link em campos prováveis
        const link = vaga.link || vaga.link_candidatura || vaga.outros_links;
        const temLinkExterno = link && link.trim() !== "";

        return (
            <div 
                key={vaga.id}
                className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 group"
            >
                <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{vaga.cargo}</h3>
                    {vaga.modalidade && (
                        <span className="text-xs font-semibold text-blue-800 bg-blue-100 px-2 py-1 rounded whitespace-nowrap">
                            {vaga.modalidade}
                        </span>
                    )}
                </div>
                
                <div className="space-y-3 mb-6 flex-grow">
                    {vaga.cidade && (
                        <div className="flex items-center text-sm text-gray-600">
                            <span className="font-medium mr-2">📍 Local:</span> {vaga.cidade}
                        </div>
                    )}
                    {vaga.tipo_vinculo && (
                        <div className="flex items-center text-sm text-gray-600">
                            <span className="font-medium mr-2">💼 Vínculo:</span> {vaga.tipo_vinculo}
                        </div>
                    )}
                    {vaga.horas && (
                        <div className="flex items-center text-sm text-gray-600">
                            <span className="font-medium mr-2">⏱️ Carga Horária:</span> {vaga.horas}
                        </div>
                    )}
                </div>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                        {vaga.data_publicacao ? new Date(vaga.data_publicacao).toLocaleDateString('pt-BR') : 'Vaga Aberta'}
                    </span>
                    
                    <NavigateButton rota={`/vagas/${vaga.id}`} text="Ver Detalhes" variacao="primary" />
                </div>
            </div>
        )
    })
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
           {isLoading && <p>Carregando vagas...</p>}
           {isError && <p>Erro ao carregar vagas.</p>}
           {vagasList.length > 0 ? vagasList : (!isLoading && !isError && <p className="col-span-full text-center text-gray-500">Nenhuma vaga encontrada.</p>)}
        </div>
    )
}
