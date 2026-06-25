import Select from 'react-select';

export function FilterBar(props) {
  return (
    <div className="flex gap-4 justify-between items-center bg-neutral-100/70 p-6 border-b-2 border-primary/80 my-4 rounded-md">

      <input
        className="bg-transparent rounded-full w-1/2 border-2 border-primary focus:outline-none p-3 px-6 text-text"
        type="text"
        placeholder="Pesquisar..."
        onChange={(e) => props.onSearch && props.onSearch(e.target.value)}
      />

      {props.filters && props.filters.length > 0 && (
        <div className="flex gap-3 items-center">
          {props.filters.map(filter => (
            <div key={filter.name} className="w-48">
              <Select
                placeholder={filter.placeholder}
                options={filter.options || []}
                isClearable
                isSearchable
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: '9999px',
                    borderColor: '#0C3B70',
                    borderWidth: '2px',
                    padding: '2px 8px',
                    backgroundColor: 'transparent'
                  })
                }}
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
