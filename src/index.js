const express = require('express');
const app = express();
const { PORT } = require('./config/config')
const { startDb } = require('./database/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

var port = PORT || process.env.PORT || 3000
startDb();
const initRoutes = require('./routes/routes');

app.use(cors());
app.set('views', path.join(__dirname, 'views')) // Redirect to the views directory inside the src directory
app.use(express.static(path.join(__dirname, '../public'))); // load local css and js files
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

initRoutes(app)
app.listen(port, () => console.log('Server listening on ' + port))
