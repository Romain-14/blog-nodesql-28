import Query from "../model/Query.js";

// page de vue de l'application
// la page home
async function home(req, res){

    const query = "SELECT label, content, date_added, author FROM story";
    const [datas] = await Query.find(query);
  
    res.status(200).render("layout", {template: "home", datas});
}

// la page de connexion
async function signin(req, res){  
    res.status(200).render("layout", {template: "signin"});
}

export { home, signin };