let a = require('mysql')
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
});
