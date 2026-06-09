import { useFilters } from "../hooks/useFilters";
import { FilterBar } from "../components/FilterBar";

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

    const localizacaoList = filteredBlocos.map((bloco) => {
        return (
            <div key={bloco.id} className="p-5 border border-black w-fit rounded-md mb-5">
                <h1 className="font-extrabold text-xl">{bloco.nome.toUpperCase()}</h1>
                <div className="flex flex-col gap-5 p-5">
                    {bloco.setores?.map((setor) => {
                        return (
                            <div key={setor.id} className="border border-black rounded-md w-max p-3">
                                <h2 className="font-bold pb-3 text-center">{setor.nome}</h2>
                                <ul>
                                    {setor.exames?.map((exame) => {
                                        return (
                                            <li key={exame.id}>
                                                <p>{exame.nome}</p>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    });

    return (
        <div>
            <h1>Localização</h1>
            
            <FilterBar 
                filters={filtersConfig}
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
            />

            {loading && <p>Carregando localização...</p>}
            {error && <p>Erro ao carregar localização.</p>}

            {localizacaoList}
        </div>
    );
}