function computeTF(doc, term) {
    if (!doc || typeof doc !== 'string') {
        console.error('Invalid document:', doc);
        return 0; // Devuelve 0 si el documento no es válido
    }

    const words = doc.split(/\s+/);
    const termCount = words.filter(word => word.toLowerCase() === term.toLowerCase()).length;
    return termCount / words.length;
}


function computeIDF(docs, term) {
    const numDocsWithTerm = docs.filter(doc => doc.toLowerCase().includes(term.toLowerCase())).length;
    return Math.log(docs.length / (1 + numDocsWithTerm));
}

function computeTFIDF(doc, docs, term) {
    const tf = computeTF(doc, term);
    const idf = computeIDF(docs, term);
    return tf * idf;
}

module.exports = { computeTF, computeIDF, computeTFIDF };
