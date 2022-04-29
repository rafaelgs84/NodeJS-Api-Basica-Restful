const express = require('express');
const database = require('./database.json');
const app = express();

app.use(express.json());

app.get('/clients/', function (req, res) {
    res.json(database);
});

app.get('/clients/:id', function (req, res) {
    const { id } = req.params;
    const client = database.find(cli => cli.id == id);

    if (!client)
        return res.status(204).json();

    res.json(client)
});

app.post('/clients', function (req, res) {
    const { name, email } = req.body;

    //Rotina para armazenar as informações (name e e-mail)

    res.status(201).json({ name, email });
});

app.put('/clients/:id', function (req, res) {

    const { id } = req.params;
    const client = database.find(cli => cli.id == id);

    const { name, email } = req.body;

    client.name = name;
    client.email = email;

    res.json(client);
});

app.delete('/clients/:id', function (req, res) {
    const { id } = req.params;
    const clients = database.filter(cli => cli.id != id);
    res.json(clients);
});

app.listen(3000, function () {
    console.log("Server is running...");
});


