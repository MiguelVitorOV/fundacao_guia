import { useFilters } from "../hooks/useFilters";
import { FilterBar } from "../components/FilterBar";

export function NoticiasPage() {
    const keysToExtract = ["tags"];
    
    const { 
        loading, 
        error, 
        filterOptions, 
        unfilteredData,
        searchQuery,
        filterValues,
        handleSearch, 
        handleFilterChange 
    } = useFilters("/noticias?recentes=900", null, keysToExtract, "titulo");

    const filtersConfig = [
        { name: "tags", placeholder: "Categoria", options: filterOptions.tags }
    ];

    let filteredNoticias = unfilteredData?.body?.noticias || [];
    
    if (searchQuery) {
        filteredNoticias = filteredNoticias.filter(noticia => 
            noticia.titulo?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    if (filterValues.tags) {
        filteredNoticias = filteredNoticias.filter(noticia => {
            return String(noticia.tags).includes(filterValues.tags);
        });
    }

    const noticiasList = filteredNoticias.map((noticia) => {
        return <li key={noticia.id}>{noticia.titulo}</li>
    });

    return (
        <div className="px-36 py-10 bg-neutral-100">
            <h1 className="text-blue-800 font-bold text-4xl text-center mb-2">Notícias da Fundação</h1>
            <p className="text-center text-text mb-8 w-2/3 mx-auto">Acompanhe as últimas novidades, projetos, comunicados oficiais e conquistas diárias da nossa instituição.</p>
            <FilterBar 
                filters={filtersConfig}
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
            />

            {loading && <p>Carregando notícias...</p>}
            {error && <p>Erro ao carregar notícias.</p>}

            <ul>
               {noticiasList}
            </ul>
        </div>
    );
}