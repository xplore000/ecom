
const express=require("express");
const mysql=require("mysql")
const body_parser=require("body-parser")
const app=express();

app.use(body_parser.urlencoded({extended:false}))
app.use(body_parser.json())

app.use(express.static('public'))

app.set('view engine','ejs')

const connection=mysql.createConnection({
    host : 'localhost',
    database : 'ecom',
    user : 'root',
    password :''
})

connection.connect((error) => {
	console.log('MySQL Database is connected Successfully');
});
app.get("/", (req, resp) => {

	const query = 'SELECT * FROM items';
	//Execute Query
	connection.query(query, (error, result) => {
        console.log(result)
		resp.render('home', {products : result });

	});
});


app.listen(3000,()=> {
    console.log("Server started")
})
