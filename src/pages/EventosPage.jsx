import { useState, useEffect } from "react";
import { useFilters } from "../hooks/useFilters";
import { FilterBar } from "../components/FilterBar";
import { ListaEventos } from "../components/ListaEventos";
import { PopUp } from "../components/PopUp";

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

    const [showError, setShowError] = useState(false);
    useEffect(() => {
        if (error) setShowError(true);
    }, [error]);

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

    return (
         <div className="px-36 py-10 bg-neutral-100 min-h-screen">
            <h1 className="text-blue-800 font-bold text-4xl text-center mb-2">Agenda de Eventos</h1>
            <p className="text-center text-text mb-8 w-2/3 mx-auto">Fique por dentro do que acontece na Fundação. Participe de nossos encontros, palestras e ações voltadas para a comunidade.</p>
            <FilterBar 
                filters={filtersConfig}
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
            />

            {loading && <p>Carregando eventos...</p>}
            {error && <p>Erro ao carregar eventos.</p>}
            
            <ListaEventos eventos={filteredEventos} />
            {showError && <PopUp erro="Erro ao carregar eventos." onClose={() => setShowError(false)} />}
        </div>
    );
}