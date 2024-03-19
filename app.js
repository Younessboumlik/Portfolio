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
app.use(exp.static(__dirname + '/public'));
app.set("view engine","ejs");
// parse application/json
app.use(bodyParser.json());
app.get('/' ,(req,res) => {
    res.sendFile("./Project/main.html",{root : __dirname})
})
app.get('/login' ,(req,res) => {
    res.sendFile("./Project/index.html",{root : __dirname})
})

app.post('/home/me' ,(req,res) => {console.log(req.body.email)
    email = req.body.email;
    res.sendFile("./Project/homeaftersignin.html",{root : __dirname})})
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
app.get('/createaccount' ,(req,res) => {
    res.sendFile("./Project/createaccount.html",{root : __dirname})

})
app.get('/profile' ,(req,res) => {
    res.render("profile",{mail:email})

})

app.listen(2277,() => (console.log("https://localhost:2228")))