import { useFilters } from "../hooks/useFilters";
import { FilterBar } from "../components/FilterBar";

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

    const filtersConfig = [
        { name: "modalidade", placeholder: "Modalidade", options: filterOptions.modalidade },
        { name: "cidade", placeholder: "Cidade", options: filterOptions.cidade },
        { name: "tipo_vinculo", placeholder: "Tipo de Vínculo", options: filterOptions.tipo_vinculo }
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

    const vagasList = filteredVagas.map((vaga) => {
        return (
            <li key={vaga.id}>
                {vaga.cargo} - {vaga.cidade} ({vaga.modalidade})
            </li>
        );
    });

    return (
        <div className="px-36 py-10">
            <FilterBar 
                filters={filtersConfig}
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
            />

            {loading && <p>Carregando vagas...</p>}
            {error && <p>Erro ao carregar vagas.</p>}
            
            <ul>
                {vagasList}
            </ul>
        </div>
    );
}