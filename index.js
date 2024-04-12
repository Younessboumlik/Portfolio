let a = require('mysql')
let exp = require("express")
const bodyParser = require('body-parser');
// const  uploadProgress = require('express-upload-progress');
const fs = require('fs');
const { error } = require('console');
let email = undefined;
let first_name = undefined 
let last_name = undefined
let password = undefined
let id = undefined ;
let codeverif;
query_result = undefined
let dark_mode = false;
const defaultimage = fs.readFileSync('public/images/defualt.png');

db = a.createConnection({host :"sql11.freesqldatabase.com" ,  user: "sql11692837" , password:"ESZ2YTvzKy", port:"3306"})
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
db.query("USE sql11692837" , function(err){
    if (err) throw err;
})
const app = exp();
app.use(exp.json({ limit: "200mb" }));
app.use(exp.urlencoded({ extended: true, limit: "200mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(exp.static(__dirname + '/public'));
app.use(exp.static('public'));
app.set("view engine","ejs");
// parse application/json
app.use(bodyParser.json());
app.get('/' ,(req,res) => {
    
    db.query("SELECT count(DISTINCT user_id) as nbr_users FROM Users",function(err,result){
        db.query("SELECT count(DISTINCT user_id) as nbr_profs FROM ProfessorEnrollments",function(err,result2){
            db.query("SELECT count(DISTINCT course_id) as nbr_courses FROM Courses ",function(err,result3){
                    res.render("main",{checksignin:false,students:result[0].nbr_users,profs:result2[0].nbr_profs,courses:result3[0].nbr_courses})
            })
        })

    })
})
app.get('/login' ,(req,res) => {
    res.render("index",{checknotlogin:false});
})

app.post('/home/me' ,(req,res) => {
       
    if (req.body.submit === "verify"){
    
        if (req.body.codeinput == codeverif){
            db.query(`insert into Users (email,password,first_name,last_name,photo) values (?, ?, ?, ?,BINARY(?))`, [email,password,first_name,last_name,defaultimage],
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
        codeverif = Math.floor(Math.random()*1000000)
            console.log(codeverif);
        res.render('verificationemail',{firstname:first_name,lastname:last_name,email:email,checkcode:true,code:codeverif} )
         }
    
    }
    if (req.body.submit === "Log in"){
        email = req.body.email;
        db.query(`select * from Users where email = ? and password = ?`,[req.body.email,req.body.password],function(err,result){
        console.log(result);
        if (err) throw err;
        query_result = result
            if(query_result.length === 0){
                res.render("index",{checknotlogin:true})
            }
            else{
                first_name = result[0].first_name;
                last_name = result[0].last_name;
                db.query("select user_id from Users where email = ?;",[email],function(err,result){
                   id = result[0].user_id 
            }
                )
                res.sendFile("./Project/homeaftersignin.html",{root : __dirname})
            }
    })
    }
 })
app.get('/inscription', (req,res) => {
    if (email === undefined){
        db.query("SELECT count(DISTINCT user_id) as nbr_users FROM Users",function(err,result){
            db.query("SELECT count(DISTINCT user_id) as nbr_profs FROM ProfessorEnrollments",function(err,result2){
                db.query("SELECT count(DISTINCT course_id) as nbr_courses FROM Courses ",function(err,result3){
                        res.render("main",{checksignin:true,students:result[0].nbr_users,profs:result2[0].nbr_profs,courses:result3[0].nbr_courses})
                })
            })
    
        })
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
    db.query("select status from Users where user_id = ?",[id],function(err,result){
        console.log(result)
        if (result[0].status == "student"){
           db.query(`select * from Users,StudentEnrollments,Groupes,Courses,Services where Users.user_id  = StudentEnrollments.user_id and 
           Users.user_id = ? and StudentEnrollments.group_id = Groupes.group_id and Groupes.course_id = Courses.course_id and
           Courses.service_id = Services.service_id `,[id], function(err, result) {
             if (err) throw err;
           res.render("profile",{res:result});
       }
       )
        }
       else if (result[0].status == "professor"){
        db.query(`select * from Users,ProfessorEnrollments,Groupes,Courses,Services where Users.user_id  = StudentEnrollments.user_id and 
        Users.user_id = ? and ProfessorEnrollments.group_id = Groupes.group_id and Groupes.course_id = Courses.course_id and
        Courses.service_id = Services.service_id `,[id], function(err, result) {
          if (err) throw err;
        res.render("profile",{res:result});
    }
    )
           
       }
       })
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
    console.log("hmm")

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
                      db.query("DELETE FROM ProfessorWaitingLists WHERE enroliment_id = ?",[result[0].waitinglist_id])
                    }
                })
                res.sendFile("./Project/endinscription.html",{root : __dirname})
            })
           })
        }
    })
} 
if(req.body.submit === "save inscription prof"){
    var service = req.body.service ;
    var course = req.body.course;
    var nbrmois = req.body.nbrmois;
    const datetime = new Date();
    time_enroll = datetime.toISOString().slice(0, 10)
    
    db.query("Update Users set status = ? where user_id = ?",["professor",id])
    db.query("select group_id from Groupes where course_id = ?  AND group_id NOT in (SELECT DISTINCT group_id FROM ProfessorEnrollments);",[course],function(err,result){
        
        if(result.length === 0){
            db.query("INSERT INTO ProfessorEnrollments(num_months,enrollment_date,user_id) VALUES (?,?,?) ",[nbrmois,time_enroll,id])
            db.query("SELECT max(enrollment_id) as max_enrollment_id FROM ProfessorEnrollments" ,function(err,result){
            db.query("INSERT INTO ProfessorWaitingLists(enrollment_id,wait_date) VALUES(?,?)",[result[0].max_enrollment_id,time_enroll])                
        }
            )
        }
        else{
            let groupe_result = result[0].group_id;
            db.query("INSERT INTO ProfessorEnrollments(num_months,enrollment_date,user_id,group_id) VALUES (?,?,?,?) ",[nbrmois,time_enroll,id,groupe_result])
            res.sendFile("./Project/endinscription.html",{root : __dirname})

        }
    }
        )
}
}
)
app.post('/photourl',(req,res) =>{

    const dataUrl = req.body.photo;
        console.log(dataUrl)
        const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(base64Data, 'base64');
        db.query("Update Users set photo = ? where user_id = ?",[imageBuffer,id],function(err,result){
                console.log(result)
              

            })
})

app.post("/verificationemail",(req,res) =>{
    db.query(`select * from Users where email = ?;`,[email], function(err, result) {
        if (err) throw err;
        query_result = result

        if (query_result.length === 0){
            email = req.body.email;
            password = req.body.password
            first_name = req.body.first_name
            last_name = req.body.last_name
            codeverif = Math.floor(Math.random()*1000000)
            console.log(codeverif);
    res.render('verificationemail',{firstname:req.body.first_name,lastname:req.body.last_name,email:req.body.email,checkcode:false,code:codeverif} )
        }
        else {
            res.render("createaccount",{checkcreataccount:true})
        }
})
})
app.post("/chnangepassword", (req,res) =>{
    db.query("select password from Users where user_id = ?",[id],function(err,result){
        if (err) throw err;
        if (req.body.currentpassword == result[0].password && req.body.newpassword == req.body.confirmpassword){
          
        }
        else{
            db.query("select photo from Users where user_id = ?",[id],function(err,result){
                console.log(result);
                res.render("changepassword",{photo:result[0].photo,passerror:true})
            })    
        }
    })
})
app.get("/verificationcodeforchangeemail",(req,res)=>{
    codeverif = Math.floor(Math.random()*1000000)
    console.log(codeverif)
    res.render("verificationforchangepassword",{firstname:first_name,email:email,lastname:last_name,code:codeverif,checkcode:false})
})
app.post("/changewithsucces",(req,res)=>{
    if(codeverif == req.body.codeinput){
        db.query("select photo from Users where user_id = ?",[id],function(err,result){
            console.log(result);
            res.render("changepassword",{photo:result[0].photo,passerror:false})
        })
      
    }
    else{
        codeverif = Math.floor(Math.random()*1000000)
            console.log(codeverif);
        res.render('verificationforchangepassword',{firstname:first_name,lastname:last_name,email:email,checkcode:true,code:codeverif} )
         }
});




// app.use(uploadProgress)

const port = process.env.PORT || 3000;
app.listen(port);

