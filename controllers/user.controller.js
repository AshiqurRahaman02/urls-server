
const UserModel =require("../models/User");
const bcrypt =require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const jwtSecretKey = process.env.jwt_secret_key;

 const getUser = async (req, res) => {
	const userId = req.params.id;

	try {
		const user = await UserModel.findById(userId);

		if (!user) {
			return res
				.status(404)
				.json({ isError: true, message: "User not found" });
		}

		res.status(200).json({ isError: false, user });
	} catch (error) {
		res.status(500).json({ isError: true, message: error });
	}
};

 const userRegister = async (req, res) => {
	const { email, password, name } = req.body;
	try {
		let user = await UserModel.findOne({ email });
		let firstName = name.split(" ")[0].toLowerCase();
		let tag = `@${firstName}${Math.floor(1000 + Math.random() * 9000)}`;
		if (user) {
			return res.status(201).json({
				isError: true,
				message: "Email already used in this website.",
			});
		}
		bcrypt.hash(password, 5, async (err, hash) => {
			if (err) throw err;
			const user = new UserModel({ email, password: hash, name, tag });
			await user.save();
			res.status(201).json({
				isError: false,
				message: "Welcome to our website",
				token: jwt.sign({ userId: user?._id }, jwtSecretKey),
				user,
			});
		});
	} catch (error) {
		res.status(404).json({ isError: true, message: error.message });
	}
};

 const userLogin = async (req, res) => {
	const { email, password } = req.body;
	try {
		let user = await UserModel.findOne({ email });
		if (!user) {
			return res
				.status(404)
				.json({ isError: true, message: "User not found" });
		}
		bcrypt.compare(password, user.password, (err, result) => {
			if (result) {
				res.status(200).json({
					isError: false,
					message: "Welcome Back to our website",
					token: jwt.sign({ userId: user?._id }, jwtSecretKey),
					user,
				});
			} else {
				res.status(401).json({
					isError: true,
					message: "Invalid password",
				});
			}
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({ isError: true, message: error.message });
	}
};

module.exports = {getUser, userRegister,userLogin}