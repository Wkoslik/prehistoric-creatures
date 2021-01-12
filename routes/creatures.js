const express = require('express');
const router = express.Router();
const fs = require('fs');

//index
router.get('/', (req, res) => {
    // console.log('creatures');
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures);
    // console.log(creatureData);

    // res.send('CREATURES');
    res.render('creatures/index', {creatures: creatureData});
})

// new -- New creature
router.get('/new', (req,res) =>{
    res.render('creatures/new');
});

//create -- POST to /creatures

router.post('/', (req, res) =>{
    // console.log(req.body);

    let creatures = fs.readFileSync('./prehistoric_creatures.json');
    let creaturesJS = JSON.parse(creatures);

    // console.log(creaturesJS);

    creaturesJS.push(req.body);
    
    let creatureJSON = JSON.stringify(creaturesJS);

    fs.writeFileSync('./prehistoric_creatures.json', creatureJSON);

    res.redirect('/creatures');
});



module.exports = router;