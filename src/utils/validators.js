export function isPositiveNumber(v) { return typeof v === 'number' && v >= 0; }
export function isNonEmptyArray(v) { return Array.isArray(v) && v.length > 0; }
export function isValidDate(v) { return v instanceof Date && !isNaN(v); }
