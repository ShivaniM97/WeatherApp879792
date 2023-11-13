const {response}=require('express');
const https = require('node:https');
const express =require('express');
const bodyParser=require('body-parser');

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{

    res.sendFile(__dirname+'/index.html')
    
})

app.post('/',(req,res)=>{

   
    const city= req.body.city
    const apiKey="820da0bae1bc5ce6b5eac10ff10ccc8a"
    const url='https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey+'&units=metric'
    https.get(url,(response)=>{
        //console.log(response.statusCode);
        response.on('data',(data)=>{
            const weatherData=JSON.parse(data);
            //console.log(weatherData);
            const temp=weatherData.main.temp;
            const description=weatherData.weather[0].description;
            //console.log(temp); 
            res.write("<h1 style='color:DodgerBlue;'>The temperature in "+city+" is : "+temp+" degree celcius</h1>")
            res.write("<h3>The weather description : "+description+"</h3>")


        })

    })
    
})


 
app.listen(3000,()=>console.log("our server is running at port 3000"))