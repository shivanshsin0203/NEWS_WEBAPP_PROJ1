import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app=express();
const port=3000;
var country="us";
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port,function(req,res){
    console.log("Server Started");
});
app.get("/",function(req,res){
   res.render("index.ejs");
});
app.post("/",async(req,res)=>{
   const plc=req.body.placeName;
   if(plc==="Delhi"||plc==="delhi")
   {
    country="in";
   }
   if(plc==="Washington"||plc==="washington")
   {
    country="us";
   }
   if(plc==="london"||plc==="London")
   {
    country="gb";
   }
   if(plc==="Berlin"||plc==="berlin")
   {
    country="gr";
   }
   if(plc==="Paris"||plc==="paris")
   {
    country="fr";
   }
   console.log(plc);
   const URLWEA="http://api.openweathermap.org/data/2.5/weather?q="+plc+"&APPID=89068980f4e1d0e16001bd9ce1e5b28c";
   const URLNEW="https://newsapi.org/v2/top-headlines?country="+country+"&apiKey=0ac4171a64b641dc9f5687991e7716fe";
   console.log(URLWEA);
   try{
    const response = await axios.get(URLWEA);
    const result = response.data;
    const newsres=await axios.get(URLNEW);
    const newresu = newsres.data;
    console.log(result.weather[0].icon);
    const icon=""+result.weather[0].icon;
    const imgu="https://openweathermap.org/img/wn/"+icon+"@2x.png";
    res.render("index.ejs",{imgurl:imgu,
    name:result.name,
    currtemp:result.main.temp,
    pressure:result.main.pressure,
    maxtemp:result.main.temp_max,
    mintemp:result.main.temp_min,
    speed:result.wind.speed,
    rest:newresu.articles,
    code:country
    });
    console.log(result);
  }
  catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
   
  //  try{
  //  const newsres=await axios.get(URLNEW);
  //  const newresu = newsres.data;
  // //  console.log(newresu);
  //  res.render("index.ejs",{title:newresu.articles[0].title})
  //  console.log(newresu.articles[0].title);
  // }
  // catch (error) {
  //   console.error("Failed to make request:", error.message);
  //   res.render("index.ejs", {
  //     error: error.message,
  //   });
  // }
});
