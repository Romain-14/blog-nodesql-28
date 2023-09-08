import express from "express";
import session from "express-session";
import "dotenv/config";

import router from "./router/index.routes.js";


const PORT = process.env.PORT || process.env.LOCAL_PORT;
const app = express();

app.set("views", "./src/views").set("view engine", "ejs");
app.use(express.static("public"))
    .use(express.urlencoded({extended: true})) // formulaire x-www-form-url-encoded
    .use(express.json()) // données JSON (envoyés via postman par exemple)
    .use(session({
        secret: process.env.SK,
        resave : false,
        saveUninitialized : false,
    }))
    .use((req,res,next) => {
        if(!req.session.user){
            req.session.user = { isLogged: false, alias: null}
        }
        res.locals.user = req.session.user;
        next();
    })
    .use(router);

app.listen(PORT, () => console.log("running on http://localhost:" + PORT + "/admin"));