const express = require('express');
const router = express.Router();
const fs = require('fs'); //your way of talking to our database

//index
router.get('/', (req, res) =>{
    // res.send('DINOS!');    
    //read the file that stores all my dinos and save in a variable to use later
    let dinos = fs.readFileSync('./dinos.json');
    //paring json into a js mutable data structure
    let dinoData = JSON.parse(dinos);
    //name filter
    let nameFilter = req.query.nameFilter
    if(nameFilter) {
        dinoData = dinoData.filter(dino => {
            return dino.name.toLowerCase() === nameFilter.toLowerCase();
        });
    }
    res.render('dinos/index', { dinos: dinoData });
});

//new - dinos/new

router.get('/new', (req, res) =>{
    console.log('NEW DINOS, WHO DIS?')
    res.render('dinos/new');
});

//create -- POST to /dinos

router.post('/', (req, res) => {
    //res.send('Postin a Dino');
    console.log(req.body);
    //add dinos to dinos.json

    //turn dinos.json into a mutable array
    let dinos = fs.readFileSync('./dinos.json');
    dinosJS = JSON.parse(dinos);
    //add a new dino from req.body to the array
    dinosJS.push(req.body);

    //turn dino array into json
    let dinoJSON = JSON.stringify(dinosJS);

    //write to dinos.json
    fs.writeFileSync('./dinos.json', dinoJSON);

    //redirect back to dinos page
    res.redirect('/dinos');
});

//show --> not working but still filtering based on what's going on above

router.get('/dinos/:idx', (req, res) => {
    // get dinosaurs
    let dinosaurs = fs.readFileSync('./dinos.json');
    let dinoData = JSON.parse(dinosaurs);

    //get array index from url parameter
    let dinoIndex = parseInt(req.params.idx);

    //render page with data of the specified animal
    res.render('dinos/show', {dino: dinoData[dinoIndex]});
})

module.exports = router;