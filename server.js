const express = require('express');
const layouts = require('express-ejs-layouts');
const path = require('path');


const app = express();

//app setup
app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static(path.join(__dirname, '/static')));
app.use(express.urlencoded({ extended: false })); //body parsing middelware

//global routes
app.get('/', (req, res) =>{
    // res.send('HOME!');
    res.render('home');
})

//controllers/routes
app.use('/dinos', require('./routes/dinos'));
app.use('/creatures', require('./routes/creatures'));

app.listen(8000, () => console.log("hey listen!"))