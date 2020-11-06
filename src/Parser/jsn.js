
export const stringify = (o) => { Object.keys(o).forEach(k => { if (typeof o[k] === 'string' && o[k].includes('{')){ o[k] = JSON.parse(o[k]) } }); return JSON.stringify(o); }