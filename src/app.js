const express = require('express');
const app = express();

app.get('/getUserData', (req, res) => {
    throw new Error('nvnnvnv');
});

app.use((err, req, res, next) => {
    console.log("Error:", err.message);
    res.status(500).send('something went wrong');//instead of werid ui it gives some good error handling
});

app.listen(5700, () => {
    console.log("Server running");
});