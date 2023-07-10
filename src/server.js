import express from "express"
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars"
import __dirname from "./utils.js"


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname+"/public"));

app.engine('handlebars', handlebars.engine())
app.set("views", __dirname+"/views");
app.set("view engine", "handlebars");

app.get("/", (req, res)=>{
    res.render("cookies")
})

app.post("/cookie", (req, res)=>{
    const data = req.body;
    res.cookie(data.name, data.email, {maxAge: 10000}).send({status: "succes"});
})

app.get("/cookie", (req, res)=>{
    console.log(req.cookies)
    res.end();
})

app.listen(8082, ()=>{
    console.log("escuchando en el puerto 8082");
})