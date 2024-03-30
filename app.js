let a = require('mysql')
let exp = require("express")
const bodyParser = require('body-parser');
let email = undefined;
let user = undefined;
let id = undefined ;
query_result = undefined
// function Query(){
db = a.createConnection({host :"sql11.freesqldatabase.com" ,  user: "sql11692837" , password:"ESZ2YTvzKy", port:"3306"})
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
db.query("USE sql11692837" , function(err){
    if (err) throw err;
})
const app = exp();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(exp.static(__dirname + '/public'));
app.use(exp.static('public'));
app.set("view engine","ejs");
// parse application/json
app.use(bodyParser.json());
app.get('/' ,(req,res) => {
    res.sendFile("./Project/main.html",{root : __dirname})
})
app.get('/login' ,(req,res) => {
    res.render("index",{checknotlogin:false});
})

app.post('/home/me' ,(req,res) => {console.log(req.body.email)
    email = req.body.email;    
    if (req.body.submit === "creatacc"){
    db.query(`select * from Users where email = ?;`,[email], function(err, result) {
        if (err) throw err;
        query_result = result
        if (query_result.length === 0){
            db.query(`insert into Users (email,password,first_name,last_name) values (?, ?, ?, ?)`, [req.body.email, req.body.password, req.body.first_name, req.body.last_name],
            function(err){
                res.sendFile("./Project/homeaftersignin.html",{root : __dirname})
            })
            
         }
       else{
           res.render("createaccount",{checkcreataccount:true})
         }})
    
    }
    if (req.body.submit === "Log in"){
        db.query(`select * from Users where email = ? and password = ?`,[req.body.email,req.body.password],function(err,result){
        console.log(result);
        if (err) throw err;
        query_result = result
            if(query_result.length === 0){
                res.render("index",{checknotlogin:true})
            }
            else{
                res.sendFile("./Project/homeaftersignin.html",{root : __dirname})
            }
    })
    }
 })
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

app.get('/inscription/prof' ,(req,res) => {
    res.sendFile("./Project/profinscription.html",{root : __dirname})

})
app.get('/createaccount' ,(req,res) => {
    res.render("createaccount",{checkcreataccount:false})
})
app.get('/profile' ,(req,res) => {
    db.query(`select concat(first_name,' ',last_name) as full_name from Users where email = ?`,[email], function(err, result) {
        if (err) throw err;
    res.render("profile",{mail:email,full_name:result[0].full_name});
}
)
})
app.get('/services' ,(req,res) => {
    res.sendFile("./Project/services.html",{root : __dirname})
})
app.get('/courses' ,(req,res) => {
    res.sendFile("./Project/courses.html",{root : __dirname})
})
app.post('/getelemnts',(req,res) =>{
    var id_service = req.body.id_service;
    console.log(id_service)
    db.query("select course_id,label from Courses where service_id = ?",[id_service],function(err,result){
        console.log(result)
        res.json({ result });
    })

})
app.listen(9232,() => (console.log("http://127.0.0.1:9232/")))