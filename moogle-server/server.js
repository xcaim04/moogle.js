const express = require('express');
const searchRoutes = require('./routes/search');

const app = express();
const  PORT = 3000;

app.use(express.json());
app.use('/search', searchRoutes);

app.listen(PORT, () => {console.log(`Server on http://localhost:${PORT}`)});