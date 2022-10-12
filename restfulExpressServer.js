const express = require('express');
const res = require('express/lib/response');
const app = express();
const port = process.env.PORT || 8000;
const {Pool} = require('pg');
const connectionString = 'postgres://postgres:postgrespw@localhost:55000/pets'

const pool = new Pool({
    connectionString: connectionString,
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
pool.connect();
//HTTP GET
app.get('/pets', (req,res) => {
    pool.query('SELECT * FROM pets;')
    .then(result => {
        res.send(result.rows)
    })
});
//HTTP GET AT INDEX
app.get('/pets/:index', (req, res) =>{
    let petId = parseInt(req.params['index'])
 pool.query(`SELECT * FROM pets WHERE ID=${petId};`)
    .then(result => {
        res.send(result.rows)
    })
})
//HTTP POST
app.post('/pets', (req,res) =>{
let newPet = req.query
        pool.query(`INSERT INTO pets (kind, age, petname) VALUES (
            '${newPet.kind}',
            '${newPet.age}',
            '${newPet.petname}');`
            )
        .then(pool.query(`SELECT * FROM pets WHERE petname = '${newPet.petname}';`)
        .then(result => {
            res.send(result.rows)
            console.log(`Added ${newPet.name} to list of pets`)
        }))
        
})

// app.patch('/pets/:index', function(req,res){
//     let petChanges = {}
//     for (const [key, value] of Object.entries(req.query)) {
//         petChanges[key] = value
//       }
//       console.log(petChanges)
//     fs.readFile('pets.JSON', 'utf8', function(error, data){
//         let petData = JSON.parse(data)
//         let petIndex = parseInt(req.params['index'])

//         let jsonString = JSON.stringify(petData)
//     fs.writeFile('pets.JSON', jsonString, error => {
//         if(error) {
//             console.log('Error writing file', error)
//         } else {
//             console.log(`Successfully updated ${petData[petIndex].name}!`)
//         }
//     })
// })
// })
// app.delete('/pets/:index', function(req, res){
//     fs.readFile('pets.JSON', 'utf8', function(error, data){
        
//         let petData = JSON.parse(data)
//         let petIndex = parseInt(req.params['index'])
//         let deletedName = petData[petIndex].name
//         petData.splice(petIndex,1);
//         let jsonString = JSON.stringify(petData)
//     fs.writeFile('pets.JSON', jsonString, error => {
//         if(error) {
//             console.log('Error writing file', error)
//         } else {
//             console.log(`Successfully deleted ${deletedName}!`)
//         }
//     })
// }) 
// })
app.listen(port, function() {
console.log('Server is running', port);
});