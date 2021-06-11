const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const agencyController=require('./controllers/agencyController');
const fs=require('fs')
const app = express();
const port = 3000;
/*MIDDLEWARE*/
app.use(fileUpload());
app.use(express.static('public'));
/* MIDDLEWARE*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method',{
  methods:['POST','GET']
}));
//control uplaods for photo
const uploadDir = 'public/uploads';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
//Connect DB
mongoose.connect('mongodb://localhost/AgencyApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
//Template Engine
app.set('view engine', 'ejs');
/*ROUTES*/
app.get('/',agencyController.getIndex);
app.get('/portfolioAdd',agencyController.getPortfolio);
app.post('/portfolioAdd',agencyController.postPortfolio);
app.get('/portfolioAdd/:id', agencyController.getUpdatePortfolio);
app.put('/updatePortfolio/:id',agencyController.updatePortfolio);
app.delete('/updatePortfolio/:id',agencyController.deletePortfolio);
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
