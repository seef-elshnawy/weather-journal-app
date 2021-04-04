/* Global Variables */

/*const { error } = require("node:console");*/

// Create a new date instance dynamically with JS
let d = new Date();

//let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let newdata=d.toLocaleString('en-Us',{month:'long', day:'numeric', year:'numeric'});

let url='http://api.openweathermap.org/data/2.5/forecast?zip=';
let api='&appid=5497cf10f2e2b5e9e7477e4a977fc2b5';

//call a button and add a event to the button
document.getElementById('generate').addEventListener('click',sendfile);

function sendfile(){

    
const zipcode=document.getElementById('zip').value;
const feel=document.getElementById('feelings').value;
weatherapi(url,zipcode, api)
.then(function(data){
        console.log(data);

        postdata('/send', { data: d , temp:data.list[0].main.temp, content:feel})
    }).then(
    showdata()
    )
   
}
const weatherapi=async (url, zip, apikey)=>{
   const response=await fetch(url+zip+apikey)
  try{
    const data=await response.json() ;
    return data; 
  }catch(error){
     console.log('error',error); 
  } 
}

const postdata=async(url='',data = {})=>{
  console.log(data);
  const responsedata = await fetch(url, {
    method: 'POST', 
     credentials: 'same-origin',
     headers: {
         'Content-Type': 'application/json',
     },
    // Body data type must match "Content-Type" header        
     body: JSON.stringify(data),
});
  try{
     const Createdata= await responsedata.json();
     console.log(Createdata);
     return Createdata;
     
  }catch(error){
  console.log('error',error);
  }  
}


const showdata=async () =>{
  const req=await fetch('/app');
   try{
    const eachdata=await req.json();
   if (eachdata.data !== undefined && eachdata.temp !== undefined && eachdata.content !== undefined){
    document.getElementById('date').innerHTML=`data: ${eachdata.data}`;  
    document.getElementById('temp').innerHTML=`temp:${eachdata.temp}`; 
    document.getElementById('content').innerHTML=`I feel:${eachdata.content}`;   
    } 
   }catch(error){
    console.log('error',error);   
   } 
}