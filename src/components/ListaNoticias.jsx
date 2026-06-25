import { useGetData } from "../hooks/useGetData"

export function ListaNoticias(props) {
    const [fetchedNoticias, fetchedLoading, fetchedError] = useGetData(props.noticias ? null : `/noticias?recentes=${props.recentes}`)

    const IMAGEM_PLACEHOLDER = "/public/placeholder.png"

    const noticiasArray = props.noticias || (fetchedNoticias && fetchedNoticias.body.noticias) || []
    const isLoading = props.noticias ? false : fetchedLoading
    const isError = props.noticias ? false : fetchedError

    const limit = props.recentes ? parseInt(props.recentes, 10) : undefined
    const noticiasLimitadas = limit ? noticiasArray.slice(0, limit) : noticiasArray

    const noticiasList = noticiasLimitadas.map((noticia) => {
        const temLinkExterno = noticia.outros_links && noticia.outros_links.trim() !== ""
        let imageUrl = IMAGEM_PLACEHOLDER
        if (noticia.imagens) {
            if (Array.isArray(noticia.imagens) && noticia.imagens.length > 0) {
                imageUrl = noticia.imagens[0]
            } else if (typeof noticia.imagens === 'string') {
                imageUrl = noticia.imagens.split(',')[0]
            }
        }

        let tagsArray = []
        if (typeof noticia.tags === 'string') {
            let cleanString = noticia.tags.trim().replace(/[\[\]"\\/]/g, '')
            if (cleanString.includes(';') || cleanString.includes(',')) {
                tagsArray = cleanString.split(/[;,]/).map(t => t.trim()).filter(Boolean)
            } else {
                tagsArray = [cleanString.trim()].filter(Boolean)
            }
        } else if (Array.isArray(noticia.tags)) {
            tagsArray = noticia.tags
        }

        return (
            <div 
                key={noticia.id}
                className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
            >
                <div className="overflow-hidden h-48 w-full bg-gray-100">
                    <img 
                        src={imageUrl} 
                        alt={noticia.titulo} 
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => { e.target.src = IMAGEM_PLACEHOLDER }}
                    />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                    {tagsArray.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {tagsArray.map((tag, index) => (
                                <span key={index} className="text-xs font-semibold text-blue-800 bg-blue-100 px-2 py-1 rounded w-fit">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{noticia.titulo}</h3>
                    {noticia.resumo && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{noticia.resumo}</p>
                    )}
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                            {noticia.data_publicacao ? new Date(noticia.data_publicacao).toLocaleDateString('pt-BR') : ''}
                        </span>
                        
                        {temLinkExterno && (
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation()
                                    window.open(noticia.outros_links, '_blank', 'noopener,noreferrer')
                                }}
                                className="bg-blue-800 text-white px-3 py-1.5 text-xs font-medium rounded hover:bg-blue-700 transition-colors"
                            >
                                Ler Mais
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )
    })
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
           {isLoading && <p>Carregando...</p>}
           {isError && <p>Erro ao carregar notícias.</p>}
           {noticiasList}
        </div>
    )
}