var express = require('express');
var firebase = require('firebase');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var config = {
    apiKey: 'AIzaSyAAShL8tibPcPf4EtG1yn3JWNmlOfRcwgg',
    authDomain: 'nodedatabase-19b27.firebaseapp.com',
    databaseURL: 'https://nodedatabase-19b27.firebaseio.com',
    projectId: 'nodedatabase-19b27',
    storageBucket: 'nodedatabase-19b27.appspot.com',
    messagingSenderId: '578571105217'
};

firebase.initializeApp(config);

app.get('/', (req, res) => {
    console.log('HTTP GET Request');

    var referencePath = '/Users/';
    var userReference = firebase.database().ref(referencePath);

    userReference.on('value',
        (snapshot) => {
            console.log(snapshot.val());
            res.json(snapshot.val());
            userReference.off('value');
        },
        (errorObject) => {
            console.log(`The read failed: ${errorObject.code}`);
            res.send(`The read failed: ${errorObject.code}`);
        });
});

app.get('/:id', (req, res) => {
    console.log('HTTP GET by Id Request');

    var referencePath = `/Users/${req.params.id}/`;
    var userReference = firebase.database().ref(referencePath);

    userReference.on("value",
        (snapshot) => {
            console.log(snapshot.val());
            res.json(snapshot.val());
            userReference.off('value');
        },
        (errorObject) => {
            console.log(`The read failed: ${errorObject.code}`);
            res.send(`"The read failed: ${errorObject.code}`);
        });
});

app.post('/', (req, res) => {
    console.log('HTTP POST Request');

    var userName = req.body.userName;
    var name = req.body.name;
    var age = req.body.age;

    var referencePath = `/Users/${userName}/`;
    var userReference = firebase.database().ref(referencePath);

    userReference.set({
            Name: name,
            Age: age
        },
        (error) => {
            if (error)
                res.send(`Data could not be saved. ${error}"`);
            else
                res.send('Data saved successfully.');
        });
});

app.put('/:id', (req, res) => {
    console.log('HTTP Put Request');

    var name = req.body.name;
    var age = req.body.age;

    var referencePath = `/Users/${req.params.id}/`;
    var userReference = firebase.database().ref(referencePath);

    userReference.update({
            Name: name,
            Age: age
        },
        (error) => {
            if (error)
                res.send(`Data could not be updated. ${error}`);
            else
                res.send('Data updated successfully.');
        });
});

app.delete('/:id', (req, res) => {
    console.log("HTTP DELETE Request");

    var referencePath = `/Users/${req.params.id}/`;
    var userReference = firebase.database().ref(referencePath);

    userReference.remove((error) => {
        if (error)
            res.send(`Data could not be deleted. ${error}`);
        else
            res.send('Data deleted successfully.');
    });
});

var server = app.listen(8080, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('server listening at http://%s:%s', host, port);
});