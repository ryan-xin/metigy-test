/* ------------ Express Server Initialization ----------- */

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Set PORT, listen for requests
app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.REACT_APP_SERVER_PORT}...`);
});

/* ------------------- Keyword Routes ------------------- */

const keywordsRoutes = require('./routes/keywords');

app.get('/keywords', keywordsRoutes.getKeyword);
app.post('/keywords', keywordsRoutes.createKeyword);
app.post('/keywords/:id/delete', keywordsRoutes.deleteKeyword);

/* --------------------- Site Route -------------------- */

const sitesRoutes = require('./routes/sites');

app.get('/sites', sitesRoutes.getSite);
app.post('/sites', sitesRoutes.createSite);
app.post('/sites/:id/delete', sitesRoutes.deleteSite);

/* ------------------- Settings Route ------------------- */

const settingsRoutes = require('./routes/settings');

app.get('/settings/:id', settingsRoutes.getSetting);
app.post('/settings/:id/edit', settingsRoutes.updateSetting);




