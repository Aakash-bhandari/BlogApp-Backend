import User from '../model/user.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import token from '../model/token.js'
import jwt from "jsonwebtoken";

dotenv.config();
const SignupUser = async (req, res) => {
    try {
        let euser = await User.findOne({ username: req.body.username })
        let email = await User.findOne({ email: req.body.email })
        if (euser) {
            return res.status(400).json({ msg: "Username Not available!!" })
        }
        if (email) {
            return res.status(400).json({ msg: "Email id Already Registered!" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const nuser = { username: req.body.username, email: req.body.email, password: hashedPassword }
        const newuser = new User(nuser);
        await newuser.save();
        return res.status(200).json({ msg: 'Signup Succesfull' })
    } catch (error) {
        return res.status(500).json({ msg: ' Error while Signup ' })
    }

}


export const Loginuser = async (req, res) => {
    let euser = await User.findOne({ username: req.body.username })
    if (!euser) {
        return res.status(400).json({ msg: "Invalid Credentials" })
    }
    try {
        let match = await bcrypt.compare(req.body.password, euser.password);
        if (match) {
            const accestoken = jwt.sign(euser.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
            const refreshtoken = jwt.sign(euser.toJSON(), process.env.REFRESH_SECRET_KEY);
            const newToken = new token({ token: refreshtoken })
            await newToken.save();
            res.status(200).json({ accestoken: accestoken, refreshtoken: refreshtoken, email: euser.email, username: euser.username, msg: "Successfully.." })
        } else {
            return res.status(400).json({ msg: "Incorrect Password!" })
        }
    } catch (error) {
        return res.status(500).json({ msg: "Error while Login" })
    }

}
export const Login_through_Google = async (req, res) => {
    try {
        let euser = await User.findOne({ email: req.body.email })
        if (!euser) {
            const nuser = { username: req.body.username, email: req.body.email }
            const newuser = new User(nuser);
            await newuser.save();

        }
        euser = await User.findOne({ email: req.body.email });
        const accestoken = jwt.sign(euser.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
        const refreshtoken = jwt.sign(euser.toJSON(), process.env.REFRESH_SECRET_KEY);
        const newToken = new token({ token: refreshtoken })
        await newToken.save();
        return res.status(200).json({ accestoken: accestoken, refreshtoken: refreshtoken, email: euser.email, username: euser.username, msg: "Successfully.." })

    } catch (error) {
        return res.status(500).json({ msg: 'Some Error Occured.. ' })
    }
}
export const logoutUser = async (request, response) => {
    const tokenn = request.body.token;
    await token.deleteOne({ token: tokenn });
    response.status(204).json({ msg: 'logout successfull' });

}
export default SignupUser;