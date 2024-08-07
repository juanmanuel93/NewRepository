import pg from "pg";
import https2 from "https";
import dotenv from "dotenv";

dotenv.config();

let pool = new pg.Pool({
    host: "localhost",
    port: 5432,
    database: "NCPilot",
    user: "postgres",
    password: process.env.PASSWORD
});

let result = "No data";
let getData = async () => {
    result = await pool.query('select first_name, last_name, primary_email from "NCPilotDB".subscribers where last_name = \'Simpson\';');
    console.log(result.rows);
};

getData();

let options = {};
  
  https2.createServer(options, (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(JSON.stringify(result.rows));
  }).listen(8080);

// var data = https.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end(JSON.stringify(result.rows));
// }).listen(8080);
    
