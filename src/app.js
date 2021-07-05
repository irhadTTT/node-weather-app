const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require('./utilis/geocode');
const forecast = require('./utilis/forecast');

const app = express();
const port = process.env.PORT || 44333;
//define paths
const publicDirectoryPath = path.join(__dirname, "../public");
const views = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");
//setup hendlebars engine i view lokacije
app.set("view engine","hbs");
app.set("views", views);
hbs.registerPartials(partialsPath);
//set up static directory to serve
app.use(express.static(publicDirectoryPath));//middlwere funckija u Expressu koja povezuje staticne filove

app.get("", (req, res)=>{
    res.render("index", {
        title: "Weather app",
        name: "Irhad Kunovac"
    });// za rendanje dinamckih handlebar templates
});
app.get("/help", (req, res)=>{
    res.render("help", {
        errMessage: "This is an error message",
        title: "Help page",
        name: "Irhad Kunovac"
    })
});
app.get("/help/*", (req, res) =>{
    res.render("404", {
        title: "404 Help",
        name: "Irhad Kunovac",
        errorTxt: "Help article not found"
    })
});
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About page",
        name: "Ihrad Kunovac"
    });
});
// app.get("*", (req, res) =>{
//     res.render("404", {
//         title: "404",
//         name: "Irhad Kunovac",
//         errorTxt: "Page is not found"
//     });
// });
app.get("/weather", (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide the address"
        })
    }
    geoCode(req.query.address, (error, { latitude, longitude, location }={}) =>{
        if(error){
            return res.send({
                error
            });
        }
        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                res.send({
                    error
                });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        });
    });
    // res.send({
    //     address: req.query.address
    // })
});
app.get("/products", (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide search tearm"
        })
    }
    console.log(req.query);
    res.send({
        products: []
    });
});
app.listen(port, ()=>{
    console.log("Server is up on port" + port);
});