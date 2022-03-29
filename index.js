const Joi = require('joi');
const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();

app.use(express.json());

const rooms = [
    { id:1, name:'LHR'},
    { id:2, name:'Karachi'},
    { id:3, name:'Quta'},
    { id:4, name:'Pashwar'},
];
app.get('/', (req,res) =>{
    res.send('Qucik Room Finder.....');
});

app.get('/api/rooms', (req,res) =>{
    res.send(rooms);
});


app.post('/api/rooms', (req, res) => {
    const { error } = ValidateRoom(req.body); //result.error
    if(error) {
        //400 bad req
        res.status(400).send(error.details[0].message);
        return; 
    }
    
    const room = {
        id: rooms.length+1,
        name: req.body.name
    };
    rooms.push(room);
    res.send(room);
});

//Put Request here
app.put('/api/rooms/:id', (req,res) =>{
    //error
    const room = rooms.find(c => c.id === parseInt(req.params.id));
    if (!room) res.status(404).send('The room with the given ID was not found.');
   //Validate
   const { error } = ValidateRoom(req.body); //result.error
    if(error) {
        //400 bad req
        res.status(400).send(error.details[0].message);
        return; 
    }

    ///update room
    room.name = req.body.name;
    res.send(room);
});

app.delete('/api/rooms/:id', (req,res)=>{
    const room = rooms.find(c => c.id === parseInt(req.params.id));
    if (!room) res.status(404).send('The room with the given ID was not found.');

    const index = rooms.indexOf(room);
    rooms.splice(index, 1);

    res.send(room);
});





function ValidateRoom(room){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(room, schema);
}




app.get('/api/rooms/:id', (req,res) =>{
    const room = rooms.find(c => c.id === parseInt(req.params.id));
    if (!room) res.status(404).send('The room with the given ID was not found.');
    res.send(room);
});
app.listen(3000, () => console.log('Listening on port 3000..'));