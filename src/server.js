const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.static('public'));

app.set('views', path.join(__dirname, '..', 'views'));

app.engine('html', require('hbs').__express);
app.set('view engine', 'html');

app.get(/favicon.ico/, (req, res) => res.status(204));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/:dir/:viewname?', function (req, res) {
  let viewname = req.params.viewname ? req.params.viewname.replace('.html', '') : 'index';
  const dir = req.params.dir;
  res.render(`${dir}/${viewname}`);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
