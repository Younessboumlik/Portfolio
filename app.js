// let a = require('mysql')
let exp = require("express")
let email = undefined
function Query(){
b = a.createConnection({host :'sql11.freesqldatabase.com' ,  user: "sql11688952" , password:"BTDEuLF25K" ,port :"3306"})
b.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
b.query("use sql11688952;", function(err) {
    if (err) throw err;
});
b.query("select * from Users;", function(err, result) {
    if (err) throw err;
    console.log("Result:", result);
})};
// const fun = (req,res) => {console.log(req.body.email)
//     res.sendFile("./views/contact.html",{root : __dirname})}
const app = exp();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.get('/' ,(req,res) => {
    res.sendFile("./views/home.html",{root : __dirname})
})
app.get('/login' ,(req,res) => {
    res.sendFile("./Project/index.html",{root : __dirname})
})

app.post('/home/me' ,(req,res) => {console.log(req.body.email)
    email = req.body.email;
    res.sendFile("./views/home.html",{root : __dirname})})
app.get('/inscription', (req,res) => {
    if (email === undefined){
      res.sendFile('./views/gologin.html',{root : __dirname})
    }
    else {
        res.sendFile("./Project/inscription1.html",{root : __dirname})
    }
})
app.get('/inscription/etudiant' ,(req,res) => {
    res.sendFile("./Project/etudianrinscri.html",{root : __dirname})
})
app.listen(1119,() => (console.log("https://localhost:5009/")))