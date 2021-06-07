const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const path = require("path")
const cookieSession = require("cookie-session")
const helmet = require("helmet")

const app = express()

// separate sensitive connect data
require("dotenv").config()
;(host = process.env.HOST), (profilName = process.env.USER), (mongoConnect = process.env.MONGO_CONNECTION), (cookieName = process.env.NAME_COOKIE), (secretCookie = process.env.SECRET_COOKIE)

// connection to MongoDB data base
mongoose
	.connect(`${mongoConnect}`, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log(`Connexion à MongoDB réussie avec le profil : ${profilName}!`))
	.catch(() => console.log("Connexion à MongoDB échouée !"))

// secure cookie http-only
app.use(
	cookieSession({
		name: cookieName,
		secret: secretCookie,
		maxAge: 86400000, //24h
		secure: true,
		httpOnly: true,
		domain: host,
	})
)

// secure app by various HTTP headers (like disable cache)
app.use(helmet())

// allow different access control
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
