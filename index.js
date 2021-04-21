var express = require('express');
var mongoose=require('mongoose');
var cors=require('cors');
const route=require('./route/route');
var app=express();

mongoose.connect("mongodb://localhost:27017/origa",{'useNewUrlParser': true, 'useUnifiedTopology': true});
mongoose.connection.on('connected', () =>{ 
    console.log('Connected to MongoDB');
} );

mongoose.connection.on('error', (err) =>{
    console.log(err); 
});

app.use(cors());

app.use(express.json());

app.use('/api', route)

app.listen(3000, ()=>{
    console.log("Server listening to port 3000");
})