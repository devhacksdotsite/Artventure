const keys = require('./keys');

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;


/* Set middleware. TODO: Move me to a middleware dir */
// built-in middleware to handle urlencoded from data
app.use(express.urlencoded({ extended: false }));

// built-in middleware to handle for json
app.use(express.json());

// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

const adminRoutes = require('./routes/api/admin/index');
//const studentRoutes = require('./routes/studentRoutes');
//const sharedRoutes = require('./routes/sharedRoutes');

app.use('/', require('./routes/root'));
app.use('/admin', adminRoutes);

//app.use('/student', studentRoutes);
//app.use('/shared', sharedRoutes);

app.all('*', (req, res) => {
  res.status(404);

  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ "error": "404 Not Found" });
  } else {
    res.type('txt').send("404 Not Found");
  }
});

// app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`listening on port ${ PORT }`);
});






