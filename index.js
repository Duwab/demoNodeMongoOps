const express = require('express');
const bodyParser = require('body-parser');
const connectToDefault = require('./databases/default');
const connectToReplica = require('./databases/replica');

console.log('start version v6');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

const models = {
  ItemDefault: { find() { return Promise.reject("Not set yet") }},
  ItemReplica: { find() { return Promise.reject("Not set yet") }}
};

connectToDefault().then(connection => {
  models.ItemDefault = require('./models/Item')(connection);
});

connectToReplica().then(connection => {
  models.ItemReplica = require('./models/Item')(connection);
});

app.get('/', (req, res) => {
  models.ItemDefault.find()
      .then(items => res.render('index', { items }))
      .catch(err => res.status(404).json({ msg: (err && err.message) || err || 'No items found' }));
});

app.get('/replica', (req, res) => {
  models.ItemReplica.find()
      .then(items => res.render('index', { items }))
      .catch(err => res.status(404).json({ msg: (err && err.message) || err || 'No items found' }));
});

app.post('/item/add', (req, res) => {
  const newItem = new models.ItemDefault({
    name: req.body.name
  });

  newItem.save().then(item => res.redirect('/'));
});

app.get('/test', (req, res) => {
  res.render('test', { message: "ok" })
});

const port = 3000;
app.listen(port, () => console.log('Server running...'));
