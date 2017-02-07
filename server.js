const express = require("express");
const fs = require("fs");
const hbs = require("hbs");
const app = express();
const PORT = process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`

    console.log(log);
    fs.appendFile("server.log", log + `\n`, (err) => {
        if (err) {
            console.log("Unable to append to server.log.")
        }
    });
    next();
})

// app.use((req, res, next) => {
//     res.render("maintenance.hbs");
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("allcaps", (text) => {
    return text.toUpperCase();
});

app.get("/", (req, res) => {
    res.render("home.hbs", {
        pageTitle: "Home Page",
        welcomeMessage: "Welcome to my website"
    });
});

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        pageTitle: "About Page"
    });
})

app.get("/bad", (req, res) => {
    res.send({
        message: "Unable to handle request!"
    });
})

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});