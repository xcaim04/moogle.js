const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

router.post('/', (req, res) => {
    const { query } = req.body;
    console.log({ message: `Searching: ${query}` });

    const contentPath = path.join(__dirname, '../../content');
    const files = fs.readdirSync(contentPath);

    const documents = files.map(file => {
        fs.readFileSync(path.join(contentPath, file), 'utf-8')
    });

    const results = '';

    res.json(results);

});

module.exports = router; // Exporta el router
