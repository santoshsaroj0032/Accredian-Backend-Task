const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const refRoutes = require('./routes/referalRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/ref', refRoutes);

app.get("/", (req, res) => {
    res.send('Welcome to the Referral API');
});

// If you want to list the available routes or something specific from refRoutes:
app.get("/routes", (req, res) => {
    res.send(refRoutes.stack.map(route => route.route.path));
});

app.listen(7000, () => {
    console.log(`Server running on port 7000`);
});
