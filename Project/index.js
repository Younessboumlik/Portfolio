const mysql1 = require('mysql2')

const db = mysql1.createConnection({
    host:'sql11.freesqldatabase.com',
    user : 'sql11688952',
    password : 'BTDEuLF25K',
    database : 'sql11688952',
    port:'3306'
})

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');
});
let sql = 'SELECT * FROM Users';


result = db.query(sql);


console.log(result);
