const express = require('express');

const config = require('../config.js');
const user = require('./components/user/network.js');

const app = express();

// ROUTES
app.use('/api/user', user);

app.listen(config.api.port, () => {
    console.log('Listening in port', config.api.port);
});