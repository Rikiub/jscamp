export function fuzzyFilter(source: string[], target: string) {
    for (const s of source) {
        if (sanitizeString(s).includes(sanitizeString(target))) return true;
    }
    return false;
}

export function sanitizeString(str: string) {
    return str.toLowerCase().normalize("NFD").replace("/[\u0300-\u036f]/g", "");
}
