let a = require('mysql')
let exp = require("express")
const bodyParser = require('body-parser');
let email = undefined;
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
                db.query("select user_id from Users where email = ?;",[email],function(err,result){
                    console.log(result)
                   id = result[0].user_id 
                   console.log(id)
                   res.sendFile("./Project/homeaftersignin.html",{root : __dirname})
                })
               
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
app.get('/createaccount' ,(req,res) => {
    res.render("createaccount",{checkcreataccount:false})

})
app.get('/profile' ,(req,res) => {
    res.render("profile",{mail:email})

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
app.post("/endinscription",(req,res) =>{
  if(req.body.submit === "save inscription student"){
    var service = req.body.service ;
    var course = req.body.course;
    var nbrmois = req.body.nbrmois;

    db.query("select * from Groupes where course_id = ? and num_students < 20;",[course],function(err,result){
        let grps_result = result
        if (grps_result.length >0){
          db.query("Update Groupes set num_students = ? where group_id = ?",[result[0].num_students+1,result[0].group_id],function(err){
            if (err) {throw err};
            db.query("insert into StudentEnrollments (num_months,user_id,group_id) values (?,?,?)",[nbrmois,id,grps_result[0].group_id])
            db.query("Update Users set status = ? where user_id = ?",["student",id])
            res.sendFile("./Project/endinscription.html",{root : __dirname})
          })
        }
        else {
           db.query("insert into Groupes (num_students,course_id) values (?,?)",[1,course],function(err,result){
            db.query("select * from Groupes where course_id = ? and num_students < 20;",[course],function(err,result){
                let grps_result = result;
                db.query("insert into StudentEnrollments (num_months,user_id,group_id) values (?,?,?)",[nbrmois,id,grps_result[0].group_id])
                db.query("Update Users set status = ? where user_id = ?",["student",id])
                db.query("select enroliment_id,waitinglist_id from ProfessorWaitingLists where course_id = ? orderby wait_date ",[course]
                ,function(err,result){
                    if (err) {throw err};
                    if (result.length >0){
                      db.query("UPDATE ProfessorEnrollments set group_id = ? where enroliment_id = ?",[grps_result[0].group_id,result[0].enroliment_id])
                      db.query("al")
                    }
                })
                res.sendFile("./Project/endinscription.html",{root : __dirname})
            })
           })
        }
    })
}})
app.listen(2226,() => (console.log("https://localhost:2228")))



