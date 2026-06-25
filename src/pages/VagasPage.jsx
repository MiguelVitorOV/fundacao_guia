import { useState, useEffect } from "react";
import { useFilters } from "../hooks/useFilters";
import { FilterBar } from "../components/FilterBar";
import { ListaVagas } from "../components/ListaVagas";
import { PopUp } from "../components/PopUp";

export function VagasPage() {
    const keysToExtract = ["modalidade", "cidade", "tipo_vinculo", "horas"];
    
    const { 
        loading, 
        error, 
        filterOptions, 
        unfilteredData,
        searchQuery,
        filterValues,
        handleSearch, 
        handleFilterChange 
    } = useFilters("/vagas", null, keysToExtract, "cargo");

    const [showError, setShowError] = useState(false);
    useEffect(() => {
        if (error) setShowError(true);
    }, [error]);

    const filtersConfig = [
        { name: "modalidade", placeholder: "Modalidade", options: filterOptions.modalidade },
        { name: "cidade", placeholder: "Cidade", options: filterOptions.cidade },
        { name: "tipo_vinculo", placeholder: "Vínculo", options: filterOptions.tipo_vinculo }
    ];

    let filteredVagas = unfilteredData?.body?.vagas || [];

    if (searchQuery) {
        filteredVagas = filteredVagas.filter(vaga => 
            vaga.cargo?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    if (filterValues.modalidade) {
        filteredVagas = filteredVagas.filter(vaga => 
            vaga.modalidade === filterValues.modalidade
        );
    }

    if (filterValues.cidade) {
        filteredVagas = filteredVagas.filter(vaga => 
            vaga.cidade === filterValues.cidade
        );
    }

    if (filterValues.tipo_vinculo) {
        filteredVagas = filteredVagas.filter(vaga => 
            vaga.tipo_vinculo === filterValues.tipo_vinculo
        );
    }

    return (
        <div className="px-36 py-10 bg-neutral-100 min-h-screen">
            <h1 className="text-blue-800 font-bold text-4xl text-center mb-2">Trabalhe Conosco</h1>
            <p className="text-center text-text mb-8 w-2/3 mx-auto">Faça parte da nossa equipe! Explore as oportunidades em aberto e encontre a vaga ideal para o seu perfil e momento de carreira.</p>
            <FilterBar 
                filters={filtersConfig}
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
            />

            {loading && <p>Carregando vagas...</p>}
            {error && <p>Erro ao carregar vagas.</p>}
            
            <ListaVagas vagas={filteredVagas} />
            {showError && <PopUp erro="Erro ao carregar vagas." onClose={() => setShowError(false)} />}
        </div>
    );
}