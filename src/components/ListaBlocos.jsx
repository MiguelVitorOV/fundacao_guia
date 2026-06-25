export function ListaBlocos({ blocos }) {
    if (!blocos || blocos.length === 0) {
        return (
            <div className="w-full py-10 text-center">
                <p className="text-gray-500 text-lg">Nenhuma localização encontrada com os filtros selecionados.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto mt-8">
            {blocos.map((bloco) => (
                <div key={bloco.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="bg-blue-800 px-6 py-4 flex items-center gap-3">
                        <h2 className="text-2xl font-bold text-white">{bloco.nome.toUpperCase()}</h2>
                    </div>
                    
                    <div className="p-6">
                        {bloco.setores && bloco.setores.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {bloco.setores.map((setor) => (
                                    <div key={setor.id} className="bg-neutral-50 rounded-lg p-5 border border-neutral-200 hover:shadow-sm transition-shadow">
                                        <div className="flex items-center gap-2 mb-4 border-b border-neutral-200 pb-2">
                                            <h3 className="font-bold text-text text-lg">{setor.nome}</h3>
                                        </div>
                                        
                                        {setor.exames && setor.exames.length > 0 ? (    
                                            <>
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Exames realizados aqui:</p>
                                                <ul className="space-y-2">
                                                {setor.exames.map((exame) => (
                                                    <li key={exame.id} className="flex items-start gap-2 text-gray-700 text-sm">
                                                        <span className="text-blue-500 mt-0.5 font-bold">•</span>
                                                        <span>{exame.nome}</span>
                                                    </li>
                                                ))}
                                                </ul>
                                            </>
                                        ) : (
                                            <p className="text-sm text-gray-500 italic">Nenhum exame listado neste setor.</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic text-center py-4">Nenhum setor encontrado neste bloco.</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
