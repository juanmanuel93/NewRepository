import pg from "pg";
import http from "http";

const pool = new pg.Pool({
    host: "localhost",
    port: 5432,
    database: "NCPilot",
    user: "postgres",
    password: "NC1234"
});

var result = "No data";
const getData = async () => {
try {
    result = await pool.query('select first_name, last_name, primary_email from "NCPilotDB".subscribers where last_name = \'Simpson\';');
    console.log(result.rows);
    return result;
}
catch(error){
    return error;
}
};

getData();

var data = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(JSON.stringify(result.rows));
}).listen(8080);
    
