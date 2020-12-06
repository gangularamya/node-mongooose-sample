var express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://nodemongodb:4yDOSsRbbwj69auEWiwTuJeIvdZFO5tW5KEfeOikKFAutFG9UonoHFbjCZ6oALGkJ8SLmHo2PWVatJUi554IKg==@nodemongodb.mongo.cosmos.azure.com:10255/testdb?ssl=true&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@nodemongodb@&retrywrites=false', {
    useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log("connected")
});
const kittySchema = new mongoose.Schema({
    name: String
});

const Kitten = mongoose.model('Kitten', kittySchema);

var app = express();
app.get('/', function (req, res) {
    const silence = new Kitten({
        name: Math.random()
    });
    console.log(silence.name);
    silence.save((err, result) => {
        if (err) console.log(err)
        console.log("success");
        res.send(result);
    })

});
app.listen(process.env.PORT||3000, function () {
    console.log('Example app listening on port 3000!');
});