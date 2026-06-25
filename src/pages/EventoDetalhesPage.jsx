import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useGetData } from "../hooks/useGetData";
import { parseTags } from "../utils/formatter";
import { PopUp } from "../components/PopUp";

export function EventoDetalhesPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [data, loading, error] = useGetData(`/eventos/${id}`);
    const evento = data?.body?.eventos?.[0] || data?.body?.evento || data?.body;

    const [showError, setShowError] = useState(false);
    useEffect(() => {
        if (error) setShowError(true);
    }, [error]);

    if (loading) {
        return (
            <div className="px-36 py-20 bg-neutral-100 min-h-[60vh] flex justify-center items-center">
                <p className="text-xl text-blue-800">Carregando detalhes do evento...</p>
            </div>
        );
    }

    if (error || (!evento && !loading)) {
        return (
            <div className="px-36 py-20 bg-neutral-100 min-h-[60vh] flex flex-col justify-center items-center gap-4">
                <p className="text-xl text-red-600">Erro ao carregar o evento ou evento não encontrado.</p>
                <button 
                    onClick={() => navigate('/eventos')} 
                    className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                    Voltar para Eventos
                </button>
            </div>
        );
    }

    const IMAGEM_PLACEHOLDER = "/public/placeholder.png";
    let imageUrl = IMAGEM_PLACEHOLDER;
    if (evento.imagens) {
        if (Array.isArray(evento.imagens) && evento.imagens.length > 0) {
            imageUrl = evento.imagens[0];
        } else if (typeof evento.imagens === 'string') {
            imageUrl = evento.imagens.split(',')[0];
        }
    }

    const publicoAlvoArray = parseTags(evento.publico_alvo);

    let statusColor = "bg-blue-100 text-blue-800 border border-blue-200";
    const lowerStatus = (evento.status || "").toLowerCase();
    if (lowerStatus.includes("agendado") || lowerStatus.includes("breve") || lowerStatus.includes("programado")) {
        statusColor = "bg-green-100 text-green-800 border border-green-200";
    } else if (lowerStatus.includes("encerrado") || lowerStatus.includes("realizado") || lowerStatus.includes("concluído")) {
        statusColor = "bg-gray-200 text-gray-700 border border-gray-300";
    } else if (lowerStatus.includes("cancelado")) {
        statusColor = "bg-red-100 text-red-800 border border-red-200";
    }

    const formatData = (dataStr) => {
        if (!dataStr) return '';
        if (typeof dataStr === 'string' && (dataStr.includes('-') || dataStr.includes('/'))) {
            if (dataStr.includes('T')) return new Date(dataStr).toLocaleDateString('pt-BR');
            return dataStr.replace(/-/g, '/');
        }
        return new Date(dataStr).toLocaleDateString('pt-BR');
    };

    return (
        <div className="bg-neutral-100 min-h-screen pt-10 pb-20">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {imageUrl !== IMAGEM_PLACEHOLDER && (
                    <div className="w-full h-64 md:h-80 overflow-hidden bg-gray-100">
                        <img 
                            src={imageUrl} 
                            alt={evento.titulo} 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                    </div>
                )}
                
                <div className="bg-blue-800 p-8 text-white relative">
                    <button 
                        onClick={() => navigate('/eventos')}
                        className="text-white/80 hover:text-white mb-6 flex items-center text-sm font-medium transition-colors"
                    >
                        ← Voltar para listagem
                    </button>
                    
                    {evento.status && (
                        <div className="absolute top-8 right-8">
                            <span className={`text-sm font-bold px-4 py-2 rounded-full shadow-sm ${statusColor}`}>
                                {evento.status.toUpperCase()}
                            </span>
                        </div>
                    )}
                    
                    <h1 className="text-3xl font-bold pr-32">{evento.titulo}</h1>
                    
                    {publicoAlvoArray.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {publicoAlvoArray.map((publico, index) => (
                                <span key={index} className="text-xs font-semibold text-blue-800 bg-white px-3 py-1 rounded-full">
                                    Público: {publico}
                                </span>
                            ))}
                        </div>
                    )}
                    
                    <div className="mt-6 flex flex-wrap gap-6 text-sm text-blue-100">
                        {(evento.data_inicio || evento.data) && (
                            <div className="flex items-center">
                                <span className="mr-2">📅</span> 
                                Início: {formatData(evento.data_inicio || evento.data)}
                                {evento.horario && ` às ${evento.horario}`}
                            </div>
                        )}
                        {evento.data_fim && (
                            <div className="flex items-center">
                                <span className="mr-2">⏳</span> 
                                Fim: {formatData(evento.data_fim)}
                            </div>
                        )}
                        {evento.local && (
                            <div className="flex items-center">
                                <span className="mr-2">📍</span> {evento.local}
                            </div>
                        )}
                        {evento.quantidade !== undefined && (
                            <div className="flex items-center">
                                <span className="mr-2">🎟️</span> Vagas: {evento.quantidade}
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-8">
                    {evento.descricao && (
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Sobre o Evento</h2>
                            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                {evento.descricao}
                            </div>
                        </div>
                    )}

                    <div className="mt-10 pt-6 border-t border-gray-100 flex justify-center">
                        {evento.link || evento.outros_links ? (
                            <button 
                                onClick={() => window.open(evento.link || evento.outros_links, '_blank', 'noopener,noreferrer')}
                                className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
                            >
                                Inscrever-se / Mais Detalhes
                            </button>
                        ) : (
                            <p className="text-gray-500 italic">Informações sobre inscrições estarão disponíveis em breve ou no local.</p>
                        )}
                    </div>
                </div>
            </div>
            {showError && <PopUp erro="Erro ao carregar detalhes do evento." onClose={() => setShowError(false)} />}
        </div>
    );
}
