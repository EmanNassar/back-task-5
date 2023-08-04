const express = require("express")

const app =express()

const port = process.env.PORT || 3000

const path = require("path")
const publicDirect = path.join(__dirname,"../public")
app.use(express.static(publicDirect)) 

/////////////////////////////////////////////////////////

app.set("view engine", "hbs")

const viewsDirect = path.join(__dirname,"../temp1/views")
app.set("views",viewsDirect)

app.get('/',(req,res)=>{
    res.render('index',{
        title:"Home",
        desc:"'Welcome Back'"
    })
})
app.get('/Wether',(req,res)=>{
    res.render('Wether',{
        title:"Weather",

    })
})

////////////////////////////////////////////////////
const geocode = require("./tools/geocode")
const forecast = require("./tools/forecast")

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"you must provide address"
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({error})
        }
        forecast(data.latitude,data.longitude ,(error,forecastData)=>{
            if(error){
                return  res.send({error})
            }
            res.send({
                location:req.query.address,
                forecast:forecastData.condition,
                temperature:forecastData.temp,
                latitude:data.latitude,
                longitude:data.longitude
            })
        })
    })

})

//////////////////////////////////////////////////////

app.get("*",(req,res)=>{
    res.send("page not found")
})

const hbs = require("hbs")
const partialsDirectorty = path.join(__dirname,"../temp1/partials")
hbs.registerPartials(partialsDirectorty)

app.listen(port,()=>{
    console.log(`on port ${port}`)
})