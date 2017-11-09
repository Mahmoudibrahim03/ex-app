const express = require('express');
const hbs = require('hbs')
const fs = require("fs")
let app = express()
app.set('view engine', "hbs")
app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `time - ${now}:  mehtod - ${req.method} url - ${req.url}`

    fs.readFile('server.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            var obj = JSON.parse(data); 
            console.log(typeof(obj));
            obj.data.push(log);
            console.log(obj);
            fs.writeFileSync("server.json", `${JSON.stringify(obj)}`)
        }})



    next();
})







                hbs.registerPartials(__dirname + '/views/partials')
                hbs.registerHelper("currentYeat", () => {
                    return new Date().getFullYear();
                })
                // home page
                app.get('/', (req, res) => {
                    res.render('home.hbs', {
                        pageTitle: "home Page",
                        welcomeMessege: "Hello and welcome express",
                    })
                })
                // about page
                app.get('/about', (req, res) => {
                    res.render('about.hbs', {
                        pageTitle: "About Page",
                    });
                })

                app.listen(3000, () => {
                    console.log(`server will fire in http://localhost:3000`)
                });