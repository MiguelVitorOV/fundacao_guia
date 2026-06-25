import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useGetData } from "../hooks/useGetData";
import { parseList, parseBeneficios } from "../utils/formatter";
import { PopUp } from "../components/PopUp";

export function VagaDetalhesPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [data, loading, error] = useGetData(`/vagas/${id}`);
    const vaga = data?.body?.vagas?.[0] || data?.body?.vaga || data?.body;

    const [showError, setShowError] = useState(false);
    useEffect(() => {
        if (error) setShowError(true);
    }, [error]);

    if (loading) {
        return (
            <div className="px-36 py-20 bg-neutral-100 min-h-[60vh] flex justify-center items-center">
                <p className="text-xl text-blue-800">Carregando detalhes da vaga...</p>
            </div>
        );
    }

    if (error || (!vaga && !loading)) {
        return (
            <div className="px-36 py-20 bg-neutral-100 min-h-[60vh] flex flex-col justify-center items-center gap-4">
                <p className="text-xl text-red-600">Erro ao carregar a vaga ou vaga não encontrada.</p>
                <button 
                    onClick={() => navigate('/vagas')} 
                    className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-primary"
                >
                    Voltar para Vagas
                </button>
            </div>
        );
    }

    const link = vaga.como_se_inscrever || vaga.link || vaga.link_candidatura || vaga.outros_links;
    const temLinkExterno = link && link.trim() !== "";

    const atividadesList = parseList(vaga.principais_atividades);
    const requisitosList = parseList(vaga.requisitos);
    const beneficiosList = parseBeneficios(vaga.beneficios);

    return (
        <div className="bg-neutral-100 min-h-screen pt-10 pb-20">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-blue-800 p-8 text-white">
                    <button 
                        onClick={() => navigate('/vagas')}
                        className="text-white/80 hover:text-white mb-6 flex items-center text-sm font-medium transition-colors"
                    >
                        ← Voltar para listagem
                    </button>
                    
                    <div className="flex justify-between items-start gap-4 flex-wrap">
                        <h1 className="text-3xl font-bold">{vaga.cargo}</h1>
                        {vaga.modalidade && (
                            <span className="bg-white/20 text-white border border-white/30 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                                {vaga.modalidade}
                            </span>
                        )}
                    </div>
                    
                    <div className="mt-6 flex flex-wrap gap-6 text-sm text-blue-100">
                        {vaga.cidade && (
                            <div className="flex items-center">
                                <span className="mr-2">📍</span> {vaga.cidade}
                            </div>
                        )}
                        {vaga.tipo_vinculo && (
                            <div className="flex items-center">
                                <span className="mr-2">💼</span> {vaga.tipo_vinculo}
                            </div>
                        )}
                        {vaga.horas && (
                            <div className="flex items-center">
                                <span className="mr-2">⏱️</span> {vaga.horas}
                            </div>
                        )}
                        {vaga.quantidade && (
                            <div className="flex items-center">
                                <span className="mr-2">👥</span> {vaga.quantidade} {vaga.quantidade > 1 ? 'vagas' : 'vaga'}
                            </div>
                        )}
                        {vaga.data_publicacao && (
                            <div className="flex items-center">
                                <span className="mr-2">📅</span> Publicado em {new Date(vaga.data_publicacao).toLocaleDateString('pt-BR')}
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-8">
                    {atividadesList.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Principais Atividades</h2>
                            <ul className="list-disc pl-5 text-gray-700 space-y-2">
                                {atividadesList.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {requisitosList.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Requisitos</h2>
                            <ul className="list-disc pl-5 text-gray-700 space-y-2">
                                {requisitosList.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {beneficiosList.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Benefícios</h2>
                            <ul className="list-disc pl-5 text-gray-700 space-y-2">
                                {beneficiosList.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {vaga.descricao && (
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Sobre a Vaga</h2>
                            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                {vaga.descricao}
                            </div>
                        </div>
                    )}

                    <div className="mt-10 pt-6 border-t border-gray-100 flex justify-center">
                        {temLinkExterno ? (
                            <button 
                                onClick={() => window.open(link, '_blank', 'noopener,noreferrer')}
                                className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
                            >
                                Candidatar-se
                            </button>
                        ) : (
                            <p className="text-gray-500 italic">As inscrições para esta vaga não são feitas por link externo.</p>
                        )}
                    </div>
                </div>
            </div>
            {showError && <PopUp erro="Erro ao carregar detalhes da vaga." onClose={() => setShowError(false)} />}
        </div>
    );
}
