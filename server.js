// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express=require('express');
const app=express();
// Start up an instance of app
const bodyParser=require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port=8000;
const Server=app.listen(port,calling);

function calling(){
   console.log('server runing');
   console.log(`runing in local host:${port}`); 
}
//callback all of data in the server with get functon
app.get('/app',(req,res)=>{
   res.send(projectData); 
})
//send data to server localhost8000/send
app.post('/send',senddata);

function senddata(req,res){
console.log(req.body);
projectData['temp'] = req.body.temp;
projectData['data'] = req.body.data;
projectData['content'] = req.body.content;
res.send(projectData);
}