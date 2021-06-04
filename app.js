const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const path = require("path")
const cookieSession = require("cookie-session")
const helmet = require("helmet")

const app = express()

// connection to MongoDB data base
mongoose
	.connect("mongodb+srv://seb:QiGYhNmORBWCseoT@clustercoursp6.j7rt1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"))

// secure cookie http-only
app.use(cookieSession({
		secret: "RGjMaP1K9QR4qBDOSecretKeyofCookie",
		cookie: {
			// maxAge : 86400000, //24h
			secure: true,
			httpOnly: true,
			domain: "http://localhost:3000",
		},
	})
)

app.use(helmet())

// access control
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization")
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
	next()
})

//extract JSON object from request
app.use(bodyParser.json())

const saucesRoutes = require("./routes/sauce")
const userRoutes = require("./routes/user")

app.use("/images", express.static(path.join(__dirname, "images")))
app.use("/api/auth", userRoutes)
app.use("/api/sauces", saucesRoutes)

module.exports = app
