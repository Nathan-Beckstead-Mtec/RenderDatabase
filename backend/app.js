const express = require('express')
const cors = require('cors')
const passport = require("passport")
const cookieParser = require("cookie-parser")
const session = require("express-session")



const app = express()
const db = require('./db')
//----------------- END OF IMPORTS-------------------------


// "nodemon -r dotenv/config app.js" loaded into memory due to -r (require)
const port = process.env.PORT || 4000
const reactClientURL = 'http://localhost:3000' // react client




// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
	cors({
		origin: reactClientURL, // <-- location of the react app were connecting to
		credentials: true,
	})
)
app.use(
	session({
		secret: "secretcode-pghahahahHAlolTHISisSUPERsecureENTROPY",
		resave: false,
		saveUninitialized: true,
	})
)
app.use(cookieParser("secretcode-pgOHlookANOTHERroundOFentropyWOWthisCASINGisWEIRD"))
app.use(passport.initialize())
app.use(passport.session())
require("./auth/passportConfig")(passport)

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

app.post("/login", passport.authenticate("local", {failureMessage: "Access Denied", failureRedirect:"/"}), (req,res) => {
	res.send("Access Granted");
})


app.get('/', (req, res) => {
	res.send('hello')
})

app.get("/getUsers", db.getUsers);

app.listen(port, () => {
	console.log(`server is up on port ${port}`)
})