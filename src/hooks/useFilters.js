import { useState, useEffect } from "react";
import { useGetData } from "./useGetData";


export function useFilters(baseUrl, filterPath, keysToExtract, searchKey = "search") {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterValues, setFilterValues] = useState({});
    const [filterOptions, setFilterOptions] = useState({});

    const [unfilteredData, unfilteredLoading, unfilteredError] = useGetData(baseUrl);

    const buildUrl = () => {
        if (!filterPath) return baseUrl;

        const [path, existingQuery] = filterPath.split("?");
        const params = new URLSearchParams(existingQuery || "");
        
        let hasNewFilters = false;

        if (searchQuery) {
            params.append(searchKey, searchQuery);
            hasNewFilters = true;
        }
        
        Object.keys(filterValues).forEach((key) => {
            if (filterValues[key]) {
                params.append(key, filterValues[key]);
                hasNewFilters = true;
            }
        });

        if (hasNewFilters) {
            const decodedQuery = decodeURIComponent(params.toString().replace(/\+/g, '%20'));
            return `${path}?${decodedQuery}`;
        }
        return baseUrl;
    };

    const url = buildUrl();
    const isFiltered = url !== baseUrl;
    
    const [filteredData, filteredLoading, filteredError] = useGetData(isFiltered ? url : null);

    const data = isFiltered ? filteredData : unfilteredData;
    const loading = isFiltered ? filteredLoading : unfilteredLoading;
    const error = isFiltered ? filteredError : unfilteredError;
    
    useEffect(() => {
        if (!unfilteredData?.body) return;

        const optionsMap = {};
        
        keysToExtract.forEach(key => {
            optionsMap[key] = new Set();
        });
        
        let list = [];
        const bodyVals = Object.values(unfilteredData.body);
        list = bodyVals.find(val => Array.isArray(val)) || [];
        
        list.forEach((item) => {
            keysToExtract.forEach(key => {
                let rawValue = item[key];
                
                if (rawValue) {
                    let parsedValues = [rawValue];

                    if (typeof rawValue === "string") {
                        let cleanString = rawValue.trim();
                        
                        if (cleanString.startsWith('"') && cleanString.endsWith('"')) {
                            cleanString = cleanString.slice(1, -1);
                        }

                        if (cleanString.includes(';')) {
                            parsedValues = cleanString.split(';').map(v => v.trim());
                        } else {
                            parsedValues = [cleanString];
                        }
                    } else if (Array.isArray(rawValue)) {
                        parsedValues = rawValue;
                    }

                    parsedValues.forEach(val => {
                        if (val) optionsMap[key].add(val);
                    });
                }
            });
        });
        
        const formattedOptions = {};
        keysToExtract.forEach(key => {
            formattedOptions[key] = Array.from(optionsMap[key]).map(item => ({ value: item, label: item }));
        });
        
        setFilterOptions(formattedOptions);
    }, [unfilteredData]);

    const handleSearch = (term) => {
        setSearchQuery(term);
    };

    const handleFilterChange = (name, value) => {
        setFilterValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return {
        data,
        loading,
        error,
        filterOptions,
        unfilteredData,
        searchQuery,
        filterValues,
        handleSearch,
        handleFilterChange
    };
}
