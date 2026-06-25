export const parseList = (str) => {
    if (!str) return [];
    if (Array.isArray(str)) return str;
    try {
        const parsed = JSON.parse(str);
        if (Array.isArray(parsed)) return parsed;
        return [str];
    } catch (e) {
        return str.split('\n').map(s => s.trim()).filter(Boolean);
    }
};

export const parseBeneficios = (str) => {
    if (!str) return [];
    let cleanStr = str;
    try {
        const parsed = JSON.parse(str);
        if (Array.isArray(parsed)) return parsed;
        if (typeof parsed === 'string') cleanStr = parsed;
    } catch (e) { }

    if (typeof cleanStr !== 'string') return [cleanStr];

    cleanStr = cleanStr.replace(/\\n|\n/g, '').trim();
    
    cleanStr = cleanStr.replace(/([a-zã-õá-ú])([A-Z])/g, '$1|$2');
    
    cleanStr = cleanStr.replace(/\u00A0/g, '|');

    const keywords = ['Assistência', 'Refeitório', 'Acompanhamento', 'Transporte', 'Estacionamento', 'Vale', 'Plano', 'Seguro', 'Convênio', 'Bolsa'];
    keywords.forEach(kw => {
        cleanStr = cleanStr.replace(new RegExp(`\\s+${kw}`, 'g'), `|${kw}`);
    });

    return cleanStr.split('|').map(s => s.trim()).filter(s => s.length > 0);
};

export const parseTags = (rawValue) => {
    if (!rawValue) return [];
    if (Array.isArray(rawValue)) return rawValue.filter(Boolean);
    
    if (typeof rawValue === "string") {
        let cleanString = rawValue.trim().replace(/[\[\]"\\/]/g, '');
        if (cleanString.includes(';') || cleanString.includes(',')) {
            return cleanString.split(/[;,]/).map(v => v.trim()).filter(Boolean);
        } else {
            const trimmed = cleanString.trim();
            return trimmed ? [trimmed] : [];
        }
    }
    return [rawValue];
};
