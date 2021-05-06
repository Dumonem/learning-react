import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * Description
 * @type {Schema}
 * @property {object} methods
 */
const UserSchema = new Schema({
	username: String,
	hashedPassword: String,
});
/**
 * @memberOf User#
 */
UserSchema.methods.setPassword = async function (password) {
	this.hashedPassword = await bcrypt.hash(password, 10);
};
/**
 *  @memberOf User#
 */
UserSchema.methods.checkPassword = async function (password) {
	return await bcrypt.compare(password, this.hashedPassword);
};

/**
 *  @memberOf User#
 */
UserSchema.methods.serialize = function () {
	const data = this.toJSON();
	delete data.hashedPassword;
	return data;
};

/**
 * @memberOf User#
 */
UserSchema.methods.generateToken = function () {
	return jwt.sign(
		{
			_id: this.id,
			username: this.username,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '7d',
		}
	);
};

/**
 *
 * @param username
 * @memberOf User
 * @return {*}
 */
UserSchema.statics.findByUsername = function (username) {
	return this.findOne({ username });
};

/** @class */
const User = mongoose.model('User', UserSchema);
export default User;
