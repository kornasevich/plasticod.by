const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const products = require('./routes/api/products');
const groups = require('./routes/api/groups');
const news = require('./routes/api/news');
const user = require('./routes/api/user');
const mail = require('./service/postMail');
const mailer = require('./service/nodemailer');
const general = require('./routes/api/general');
const about = require('./routes/api/about');
const exampleUsing = require('./routes/api/example-using');
const addressHipping = require('./routes/api/address-shipping');
const buyRetail = require('./routes/api/buy-retail');
const contacts = require('./routes/api/contacts');

const app = express();

app.use(bodyParser.json({limit: '40mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '40mb', extended: true}));
app.use(cors());

/*app.use(express.static(path.join(__dirname, "client/public")))*/

app.use('/api/products', products);
app.use('/api/groups', groups);
app.use('/api/news', news);
app.use('/api/user', user);
app.use('/api/general', general);
app.use('/api/about', about);
app.use('/api/example-using', exampleUsing);
app.use('/api/address-shipping', addressHipping);
app.use('/api/buy-retail', buyRetail);
app.use('/api/contacts', contacts);

app.use('/service/post-mail', mail);

const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log(`server start on port ${port}`));