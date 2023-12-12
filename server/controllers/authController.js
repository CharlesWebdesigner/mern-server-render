const User = require('../models/usermodel');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const {expressjwt:JWT} = require('express-jwt');
const app=require('express').Router();

const signin = async (req, res) => {
  console.log(req.body)
    try {
        let user = await User.findOne({ "email": req.body.email });
        if (!user)
            return res.status(401).json({
                error: "User not found"
            });

        if (!user.authenticate(req.body.password)) {
            return res.status(401).json({
                error: "Email and password don't match."
            });
        }

        const token = jwt.sign({ _id: user._id }, config.jwtSecret);
        res.cookie("t", token, { expire: new Date() + 9999 });
        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        return res.status(401).json({
            error: "Could not sign in"
        });
    }
};

const signout = (req, res) => {
    res.clearCookie("t");
    return res.status(200).json({
        message: "Signed out"
    });
};

//   const requireSignin=(body)=>{
//     if(body.cookies.t){
//         app.use('/',JWT({
//             secret: config.jwtSecret,
//             algorithms: ['HS256'],
//             userProperty: 'auth',}))
//       }else{
//         throw new Error('please sign in')
//       }
//     }
const requireSignin = JWT({
    secret: config.jwtSecret,
    algorithms: ['HS256'],
    userProperty: 'auth',
});


const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!authorized) {
        return res.status(403).json({
            error: "User is not authorized"
        });
    }
    next();
};

module.exports = { signin, signout,requireSignin,hasAuthorization };
