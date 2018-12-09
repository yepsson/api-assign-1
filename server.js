var express = require('express');
var app = express();
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient , assert = require('assert');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const pug = require('pug');


app.use(bodyParser.urlencoded({ extended: false }));

//Ansluter till databasen
mongoose.connect('mongodb://localhost:27017/Foodstore');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});                   

//Schemat för databasobjekten
MatSchema = new mongoose.Schema({
    namn: String,
    antal: Number,
    pris: Number
});

var food = mongoose.model('Foodstore', MatSchema);

app.get('/', function (req,res){
    food.find(function (err, foods) {
        if (err) return console.error(err);
        res.render('index',{foods});
    });
});
//sätter renderings pathen och vilken engine som ska användas
app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'pug');

//Routes
app.post('/add' , add);
app.post('/delete' , deleteObject);
app.post('/update' , update);

//uppdaterar databasobjekten ifrån inputs
function update(req,res){
    var namn= req.body.updateNamn;
    var antal= req.body.updateAntal;
    var pris= req.body.updatePris;
    var id = req.body.updateId;
    food.findOne({namn: namn}, function (err, doc){
        if (err){
            res.send('error');
        }
        else{
            doc.namn = namn;
            doc.antal = antal;
            doc.pris = pris;

            doc.save();
            res.redirect('/');
        }
    })
}

//tar input ifrån inputs och lägger till i databasen
function add(req, res){
    var antal = parseInt(req.body.antal);
    var pris = parseInt(req.body.pris);
    var matNamn = req.body.namn;

    var nyMat = new food({namn:matNamn, antal: antal, pris: pris});
    
    if(parseInt(antal, pris)){
        nyMat.save(function (err, nyMat) {
            if (err) return console.error(err);
        });
    }
    else{
        res.send('Update failed')
    }
    res.redirect('/');
}

//tar bort ett objekt, targetar via id
function deleteObject(req,res){
    var matNamn = req.body.delete;
    food.deleteOne({ namn: matNamn }, function(err) {
        if (err) {
           res.send('error!');
        }
        else {
            res.redirect('/');
        }
    });
}
app.listen(3000);
