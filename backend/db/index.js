const Pool = require("pg").Pool;


let dbURL = {
    connectionString: process.env.DATABASE_URL 
	?? 'postgres://postgres:postgres@localhost:5432/users'
    //  ^protocall
    //             ^username
    //                      ^password
    //                                              ^name of database
}

const pool = new Pool(dbURL);
//use a pool so you can reuse the client and therefore resources


pool.connect();
exports.getUsers = (req, res) => {
	console.log("getting users");
	
    pool.query('SELECT * from users limit 3', (err, results) => {
        if (err) throw err;
        for (let row of results.rows) {
            console.log(JSON.stringify(row));
        }
        res.status(200).json(results.rows);
    })
}
exports.getUserByNames = (req, res) => {
	console.log("getting user by name");
    pool.query('SELECT * from users limit 3 where username = $1', [req.name ?? ""], (err, results) => {
        if (err) throw err;
        for (let row of results.rows) {
            console.log(JSON.stringify(row));
        }
        res.status(200).json(results.rows);
    })
}
exports.authUserByName = async(username) => {
	//{username, id, password} null if not found
	console.log("authing user by name");
	const results = await pool.query('SELECT * FROM users WHERE username = $1 LIMIT 1', [username ?? ""])
	return results.rows[0];
}

/*
client.query("select * from customer where first_name = $1", [first_name], (err,result) => {
	if (err){
		console.error(err);
		return
	}
	console.log(result.rows);
	// console.log(typeof result);
	// console.log(result);
	CB(result.rows);
}


pool.query("select * from users", (err, results) => {
	if (err){
		console.error(err);
	}
	console.group("results:")
		console.log(results);
	console.groupEnd("results:")
})

*/



// module.exports = {thing:func}
// exports.thing = function()