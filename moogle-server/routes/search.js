const express = require('express');
const router = express.Router();
const tfidf = require('../TF-IDF/engine');
const fs = require('fs');
const path = require('path');

router.post('/', (req, res) => {
    const { query } = req.body;

    if (!query || query.trim() === '') {
        return res.status(400).json({ error: 'La consulta no puede estar vacía.' });
    }

    const contentPath = path.join(__dirname, '../../content');
    const files = fs.readdirSync(contentPath);

    const documents = files.map(file => {
        const content = fs.readFileSync(path.join(contentPath, file), 'utf-8');
        if (!content) console.warn(`El archivo ${file} está vacío.`);
        return content || ''; // Devuelve una cadena vacía si el archivo está vacío
    });

    const results = files.map((file, index) => ({
        url: `/content/${file}`,
        score: tfidf.computeTFIDF(documents[index], documents, query),
    })).sort((a, b) => b.score - a.score);

    res.json(results);
});

module.exports = router;
