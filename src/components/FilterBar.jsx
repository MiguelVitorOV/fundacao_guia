import Select from 'react-select';

export function FilterBar(props) {
  return (
    <div className="flex gap-4">
      
      <input
        type="text"
        placeholder="Pesquisar..."
        onChange={(e) => props.onSearch && props.onSearch(e.target.value)}
      />

      {props.filters && props.filters.length > 0 && (
        <div className="flex gap-3">
          {props.filters.map(filter => (
            <div key={filter.name}>
              <Select
                placeholder={filter.placeholder}
                options={filter.options || []}
                isClearable
                isSearchable
                onChange={(selected) => props.onFilterChange && props.onFilterChange(filter.name, selected ? selected.value : null)}
                noOptionsMessage={() => "Nenhuma opção"}
              />
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
}
