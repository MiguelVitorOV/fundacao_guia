import { useState, useEffect } from "react";
import { useFilters } from "../hooks/useFilters";
import { FilterBar } from "../components/FilterBar";
import { ListaBlocos } from "../components/ListaBlocos";
import { PopUp } from "../components/PopUp";

export function LocalizacaoPage() {
    const { 
        loading, 
        error,
        unfilteredData,
        searchQuery,
        filterValues,
        handleSearch, 
        handleFilterChange 
    } = useFilters("/localizacao/overview", null, [], "exame");

    const [showError, setShowError] = useState(false);
    useEffect(() => {
        if (error) setShowError(true);
    }, [error]);

    const optionsMap = {
        bloco: new Set(),
        setor: new Set()
    };

    if (unfilteredData?.body?.blocos) {
        unfilteredData.body.blocos.forEach((bloco) => {
            if (bloco.nome) optionsMap.bloco.add(bloco.nome);
            if (bloco.setores) {
                bloco.setores.forEach((setor) => {
                    if (setor.nome) optionsMap.setor.add(setor.nome);
                });
            }
        });
    }

    const formatOptions = (set) => Array.from(set).map(item => ({ value: item, label: item }));

    const customFilterOptions = {
        bloco: formatOptions(optionsMap.bloco),
        setor: formatOptions(optionsMap.setor)
    };

    const filtersConfig = [
        { name: "bloco", placeholder: "Bloco", options: customFilterOptions.bloco },
        { name: "setor", placeholder: "Setor", options: customFilterOptions.setor }
    ];

    let filteredBlocos = unfilteredData?.body?.blocos ? JSON.parse(JSON.stringify(unfilteredData.body.blocos)) : [];

    if (filterValues.bloco) {
        filteredBlocos = filteredBlocos.filter(bloco => bloco.nome === filterValues.bloco);
    }

    if (filterValues.setor) {
        filteredBlocos = filteredBlocos.map(bloco => {
            return {
                ...bloco,
                setores: bloco.setores?.filter(setor => setor.nome === filterValues.setor)
            };
        }).filter(bloco => bloco.setores && bloco.setores.length > 0);
    }

    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredBlocos = filteredBlocos.map(bloco => {
            return {
                ...bloco,
                setores: bloco.setores?.map(setor => {
                    return {
                        ...setor,
                        exames: setor.exames?.filter(exame => exame.nome?.toLowerCase().includes(query))
                    };
                }).filter(setor => setor.exames && setor.exames.length > 0)
            };
        }).filter(bloco => bloco.setores && bloco.setores.length > 0);
    }

    return (
        <div className="px-36 py-10 bg-neutral-100 min-h-screen">
            <h1 className="text-blue-800 font-bold text-4xl text-center mb-2">Se Localize na FCV</h1>
            <p className="text-center text-text mb-8 w-2/3 mx-auto">Encontre facilmente o bloco ou setor desejado. Utilize a busca abaixo para saber onde seu exame será realizado com agilidade.</p>
            <FilterBar 
                filters={filtersConfig}
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
            />

            {loading && <p className="text-center mt-10 text-blue-800">Carregando localização...</p>}
            {error && <p className="text-center mt-10 text-red-600">Erro ao carregar localização.</p>}

            {!loading && !error && <ListaBlocos blocos={filteredBlocos} />}
            {showError && <PopUp erro="Erro ao carregar dados de localização." onClose={() => setShowError(false)} />}
        </div>
    );
}