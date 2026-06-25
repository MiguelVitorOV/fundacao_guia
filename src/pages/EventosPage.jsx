import { useFilters } from "../hooks/useFilters";
import { FilterBar } from "../components/FilterBar";

export function EventosPage() {
    const keysToExtract = ["status", "publico_alvo"];
    
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
        { name: "publico_alvo", placeholder: "Público Alvo", options: filterOptions.publico_alvo }
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

    if (filterValues.publico_alvo) {
        filteredEventos = filteredEventos.filter(evento => 
            String(evento.publico_alvo).includes(filterValues.publico_alvo) || String(evento.publico_alvo).includes(filterValues.publico_alvo)
        );
    }

    const eventosList = filteredEventos.map((evento) => {
        return <li key={evento.id}>{evento.titulo} - {evento.status}</li>
    });
    console.log(filterOptions)
    console.log(filterValues)

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