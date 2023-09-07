import Query from "../../model/Query.js";
import formidable from "formidable";

function home(req, res){
    res.status(200).render("admin/layout", {subTemplate: null});
}

async function story(req, res){
    try {
        const query = "SELECT label, content, date_added, author FROM story";
        const [datas] = await Query.find(query);
        
        res.status(200).render("admin/layout", {subTemplate: "partials/story", datas});
    } catch (error) {
        throw Error(error);
    }
    
}

function addStory(req, res){
    try {
        const form = formidable({
            uploadDir: "public/img/story",
            keepExtensions: true,
            allowEmptyFiles: false,
            multiples: true,
        });
    
        form.parse(req, async (err, fields, files) => {
            // fields mets dans un array distinct la valeur de chaque input..
            const story = {};
            for (const key in fields) {
                // 2 inputs sur le add story donc 2 itérations
                // 1ère itération:
                // story.label = fields.label[0] ("la valeur de l'input label")
                // 2ème itération:
                // story.content = fields.content[0] (la valeur de l'input content)
                story[key] = fields[key][0]; 
            }
            console.log("new story object --> ", story);
            const query1 = "INSERT INTO story (label, content, date_added, author) VALUES ( ?, ?, NOW(), 'admin')";
            const [result1] = await Query.write(query1, story);
            // on se sert de la réponse de l'insertion qui contient l'id créé pour l'insertion de l'image dans la table image qui a besoin d'une clé étrangère, la clé primaire de la story

            const img = {
                url: Object.keys(files).length ? files.url_img[0].newFilename : "no-picture.jpg",
                story_id: result1.insertId,
            }

            const query2 = "INSERT INTO image (url, story_id) VALUES (?, ?)";
            await Query.write(query2, img);
            res.redirect("/admin/story");
            

        });
    } catch (error) {
        throw Error(error);        
    }
    

}



export {home, story, addStory};