let form = document.getElementById("form1")
const latitude = document.getElementById("latitude")
const longitude = document.getElementById("longitude")
const errorF = document.getElementById("error")
const locationF = document.getElementById("location")
const forecastF = document.getElementById("forecast")
const temperature = document.getElementById("temperature")

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    console.log(document.getElementById("address").value)
    weatherFun()
    form.reset ()
})



let weatherFun = async ()=>{
    try{
        const address = document.getElementById("address").value
        const res= await fetch(`http://localhost:3000/weather?address=${address} `)
        const data = await res.json()
         console.log (data)
         if(data.error){
            errorF.innerText = data.error
            locationF.innerText = ""
            forecastF.innerText =""
         }else{
            setTimeout(()=>{
                locationF.innerText = "LOCATION : "+ data.location
            },500)
            setTimeout(()=>{
               forecastF.innerText = `FORECAST : ${data.forecast}`
            },1000)
              setTimeout(()=>{
               temperature.innerText = `TEMPERATURE : ${data.temperature}` 
            },1500)
            setTimeout(()=>{
              latitude.innerText = `LATITUDE : ${data.latitude}` 
            },2000)
            setTimeout(()=>{
               longitude.innerText = `LONGITUDE : ${data.longitude}`  
            },2500)
            errorF.innerText = ""
         }

    }
    catch(error){
       errorF.innerText = error
    }
}