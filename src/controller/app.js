import Query from "../model/Query.js";
import { hash, compare } from "bcrypt";

const SALT = 10;

// page de vue de l'application
// la page home
async function home(req, res){

    const query = "SELECT label, content, date_added, author FROM story";
    const [datas] = await Query.find(query);
  
    res.status(200).render("layout", {template: "home", datas});
}

// la page de connexion
// GET
async function signinView(req, res){  
    res.status(200).render("layout", {template: "signin"});
}

async function signupView(req, res){  
    res.status(200).render("layout", {template: "signup"});
}

// POST

async function signin(req, res){
    const query = "SELECT alias, email, password FROM user WHERE email = ?";
    const [user]  = await Query.findByValue(query, req.body.email);
    console.log(user)
    if(!user.length){
        console.log("user 404")
        res.redirect("/signup");
    }
    if(user.length){
        const same = await compare(req.body.password, user[0].password );
        if(!same) throw Error("bad password")
        
        if(same) {
            req.session.user = { isLogged: true, alias: user[0].alias};
            res.redirect("/");
        }
        
    }
}

async function signup(req, res){user[0].
    console.log(req.body)
    const query = "SELECT alias, email, password FROM user WHERE alias = ?";
    const [user]  = await Query.findByValue(query, req.body.alias);
    if(!user.length){
        const hashPWD = await hash(req.body.password, SALT);
        const user = {
            alias: req.body.alias,
            email: req.body.email,
            password: hashPWD,
        }
        const query = "INSERT INTO user (alias, email, password, creation_date) VALUES (?,?,?, NOW())";
        const [result] = await Query.write(query, user);

        const query2 = "INSERT INTO user_role (user_id, role_id) VALUES (?, ?)";
        const data = {
            user_id: result.insertId,
            role_id: 2,
        }
        await Query.write(query2, data);

        res.redirect("/signin");

    } else {
        console.log("utilisateur existant changer d'alias")
    }

}

export { home, signin, signinView, signup, signupView };