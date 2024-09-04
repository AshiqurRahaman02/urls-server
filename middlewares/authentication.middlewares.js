const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const jwtSecretKey = process.env.jwt_secret_key;

const verifyToken = async (req, res, next) => {
	const token = req.header("Authorization")?.split(" ")[0];

	try {
		const decoded = jwt.verify(token, jwtSecretKey);
		const { userId } = decoded;

		const user = await UserModel.findById(userId);

		req.user = user;

		next();
	} catch (err) {
		res.status(401).json({ isError: true, message: "Invalid token", err });
	}
};

module.exports = verifyToken;
