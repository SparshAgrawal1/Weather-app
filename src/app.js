const request = require("request")
const forecast = require("./utils/forecast")
const geocode = require("./utils/geocode")
const express = require('express')
const path = require("path")
const x1 = process.argv[2]
const hbs = require('hbs')


const app = express()


const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{

    res.render('index',{
        name: "By- Sparsh Agrawal",
        title: "Weather",
        require: "Use this to fetch weather details."
    }
    )

})

app.get('/about',(req,res)=>{

    res.render('about',{
        name: "This app is created by Sparsh Agrawal",
        title: "About this page"
    }
    )

})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "error"
        })
    }
    geocode(req.query.address,(error,response)=>{
        if(error){
            res.send({error}
                
            )
        }
        else{
            forecast(response.latitude,response.longitude,(error,response)=>{
                if(error){
                    res.send({error})
                }
                else{
                    res.send({response})
                }
            })
        }
    })
})

app.get('/*',(req,res)=>{

    res.render('404',{
        name: "Sparsh Agrawal",
        title: "404 Not Found"
    }
    )

})

app.get('/about/*',(req,res)=>{

    res.render('404',{
        name: "Sparsh Agrawal",
        title: "404 Not Found"
    }
    )

})

// if(!x1){
//     console.log("Enter the correct geo locations")
// }
// else{
//     geocode(x1,(error,response)=>{
//         if(error){
//             console.log(error)
//         }
//         else{
//             const w1 = response.latitude
//             const w2 = response.longitude
//             forecast(w1, w2, (error,response)=>{
//                 if(error){
//                     console.log(error)
//                 }
//                 else{
//                     console.log(response)
//                 }
//             })
//             // console.log(w1)
//         }
        
//     })

// }




app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})