const express = require('express');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 8000;
const {Client} = require('pg');
//const config = require('./config.json')[process.env.NODE_ENV||"dev"]
// const morgan = require('morgan')
// const bodyParser = require('body-parser')
// app.use(morgan('tiny'))
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/pets', function(req, res) {
    fs.readFile('pets.json', 'utf8', function(error, data){
        if(error){
            console.error(new Error('Whoops, something bad happened'))
        } 
        else{
            res.setHeader('Content-Type', 'text/plain');
            res.write(data)
            res.end()
        }
    })
})
app.get('/pets/:index', function(req, res){
fs.readFile('pets.json', 'utf8', function(error, data){
    let petData = JSON.parse(data)
    let petIndex = parseInt(req.params['index'])
    if(error){
        console.error(new Error('Whoops, something bad happened'))
    } 
    else if (typeof petIndex !== 'number' || petData[petIndex] === undefined) {
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/plain');
            res.end('Not found!');
            console.log(petData[petIndex])
    }
    else {
        res.write(JSON.stringify(petData[petIndex]))}
        res.end();
        console.log('test')
})
})
app.post('/pets', (req,res) =>{
        res.setHeader('Content-Type', 'text/plain')
        res.write('you posted:\n')
        res.end(JSON.stringify(req.query))
        console.log(req.query);
            fs.readFile('pets.JSON', 'utf8', function(error, data){
                let pets = JSON.parse(data)
                let newPet = req.query
                pets.push(newPet)
                let jsonString = JSON.stringify(pets)
            fs.writeFile('pets.json', jsonString, error => {
                if(error) {
                    console.log('Error writing file', error)
                } else {
                    console.log(`Successfully added ${newPet.name}!`)
                }
            })
        })

})
app.patch('/pets/:index', function(req,res){
    let petChanges = {}
    for (const [key, value] of Object.entries(req.query)) {
        petChanges[key] = value
      }
      console.log(petChanges)
    fs.readFile('pets.JSON', 'utf8', function(error, data){
        let petData = JSON.parse(data)
        let petIndex = parseInt(req.params['index'])
        for (let [key,value] of Object.entries(petChanges)){
            petData[petIndex][key] = value
            console.log(petData[petIndex])
        }
        let jsonString = JSON.stringify(petData)
    fs.writeFile('pets.JSON', jsonString, error => {
        if(error) {
            console.log('Error writing file', error)
        } else {
            console.log(`Successfully updated ${petData[petIndex].name}!`)
        }
    })
})
})
app.delete('/pets/:index', function(req, res){
    fs.readFile('pets.JSON', 'utf8', function(error, data){
        
        let petData = JSON.parse(data)
        let petIndex = parseInt(req.params['index'])
        let deletedName = petData[petIndex].name
        petData.splice(petIndex,1);
        let jsonString = JSON.stringify(petData)
    fs.writeFile('pets.JSON', jsonString, error => {
        if(error) {
            console.log('Error writing file', error)
        } else {
            console.log(`Successfully deleted ${deletedName}!`)
        }
    })
}) 
})
app.listen(port, function() {
console.log('Server is running', port);
});