const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Maskdata = require("maskdata")

const User = require("../models/user")

// separate sensitive connect data
require("dotenv").config()
tokenSecret = process.env.TOKEN_SECRET

exports.signup = (req, res, next) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const user = new User({
				email: Maskdata.maskEmail2(req.body.email),
				password: hash,
			})
			user.save()
				.then(() => res.status(201).json({message: "Utilisateur créé !"}))
				.catch((error) => res.status(400).json({error}))
		})
		.catch((error) => res.status(500).json({error}))
}

exports.login = (req, res, next) => {
	User.findOne({email: Maskdata.maskEmail2(req.body.email)})
		.then((user) => {
			if (!user) {
				return res.status(401).json({error: "Utilisateur non trouvé !"})
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({error: "Mot de passe incorrect !"})
					}
					res.status(200).json({
						userId: user._id,
						token: jwt.sign({userId: user._id}, tokenSecret, {expiresIn: "24h"}),
					})
				})
				.catch((error) => res.status(500).json({error}))
		})
		.catch((error) => res.status(500).json({error}))
}
