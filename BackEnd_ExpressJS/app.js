require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./app/routes/routes');
const authRoutes = require('./app/routes/authRoutes');
const keeperController  = require('./app/controllers/keeperController');
const app = express();

app.use(cors());

app.use(keeperController.middleware);

app.use('/', routes);
app.use('/api', authRoutes);

const server = app.listen(9000, async () => {
    const port = server.address().port;
    const host = server.address().address;
    const dictTranslations = await keeperController.getDictionary();
    console.log(dictTranslations['serverRunningOn'][process.env.LANGUAGE] + ` ${host}: ${port}`);
});