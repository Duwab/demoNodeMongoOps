const express = require('express');
const bodyParser = require('body-parser');
const connectToDefault = require('./databases/default');

console.log('start version v5');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

connectToDefault().then(() => {
  const Item = require('./models/Item');

  app.get('/', (req, res) => {
    Item.find()
        .then(items => res.render('index', { items }))
        .catch(err => res.status(404).json({ msg: 'No items found' }));
  });

  app.post('/item/add', (req, res) => {
    const newItem = new Item({
      name: req.body.name
    });

    newItem.save().then(item => res.redirect('/'));
  });
});

app.get('/test', (req, res) => {
  res.render('test', { message: "ok" })
});

const port = 3000;
app.listen(port, () => console.log('Server running...'));
