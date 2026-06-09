import { useFilters } from "../hooks/useFilters";
import { FilterBar } from "../components/FilterBar";

export function EventosPage() {
    const keysToExtract = ["status", "tags"];
    
    const { 
        loading, 
        error, 
        filterOptions, 
        unfilteredData,
        searchQuery,
        filterValues,
        handleSearch, 
        handleFilterChange 
    } = useFilters("/eventos", null, keysToExtract, "titulo");

    const filtersConfig = [
        { name: "status", placeholder: "Status", options: filterOptions.status },
        { name: "tags", placeholder: "Público Alvo", options: filterOptions.tags }
    ];

    let filteredEventos = unfilteredData?.body?.eventos || [];

    if (searchQuery) {
        filteredEventos = filteredEventos.filter(evento => 
            evento.titulo?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    if (filterValues.status) {
        filteredEventos = filteredEventos.filter(evento => 
            evento.status === filterValues.status
        );
    }

    if (filterValues.tags) {
        filteredEventos = filteredEventos.filter(evento => 
            String(evento.tags).includes(filterValues.tags) || String(evento.publico_alvo).includes(filterValues.tags)
        );
    }

    const eventosList = filteredEventos.map((evento) => {
        return <li key={evento.id}>{evento.titulo} - {evento.status}</li>
    });

    return (
        <>
            <h1>Eventos</h1>
            
            <FilterBar 
                filters={filtersConfig}
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
            />

            {loading && <p>Carregando eventos...</p>}
            {error && <p>Erro ao carregar eventos.</p>}
            
            <ul>
                {eventosList}
            </ul>
        </>
    );
}