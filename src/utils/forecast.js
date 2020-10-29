const request = require("request")



const forecast = (x1,x2,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=c7c45d476532a30c618795cb5bea4602&query='+ x1 + ',' + x2 
    request({url:url,json:true},(error,response)=>{
        if(error){
            return callback("You are not connected to the Internet",undefined)
        }
        else if(response.body.error)
        {
            return callback("Enter hte valid geo locations",undefined)
        }
        const a1="Temperature is currently " + response.body.current.temperature + "° Celcius and humidity is " + response.body.current.humidity + "%";
        const a2= response.body.location.name +" "+ response.body.location.region +" "+ response.body.location.country 
        return  callback(undefined,{
                x1: a1,
                x2: a2
            })
            // forecast: "Temperature is currently " + response.body.current.temperature+ "° Celcius and humidity is " + response.body.current.humidity + "%",
            // location: response.body.location.name + response.body.location.region + response.body.location.country 
        
    })

}

module.exports = forecast