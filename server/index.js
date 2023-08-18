const keys = require('./keys');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('Artvernture api.');
});

app.get('/student', (req, res) => {
	res.send('student routes here...');
});

// routes here...

app.listen(5000, () => {
	console.log('listening on port 5000');
});






