// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const Confession = require('./models/confession.js');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'html')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://soilhasnoblanket:soilhaslife@celestialrevelation.kexjh7o.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.post('/submit', (req, res) => {
    const { confession, nickname } = req.body;
  
    if (!confession) {
      return res.status(400).json({ error: 'Confession text is required' });
    }
});

app.get('/deleteconfession', (req, res) => {
  res.redirect('/views/delete.ejs');
});

app.get('/admin', (req, res) => {
 Confession.find()
        .then(confessions => {
            res.render('admin', { confessions: confessions });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while fetching confessions' });
        });
});

app.post('/delete/:id', (req, res) => {
const confessionId = req.params.id;
  Confession.findByIdAndDelete(confessionId)
    .then(() => {
      res.redirect('/admin');
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while deleting the confession' });
    });
});

module.exports = app; // Export the Express app
