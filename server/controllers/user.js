const userModel = require('../models/user')
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/dev');
exports.auth = (req,res)=>{
   const {email,password} = req.body;
   if(!email || !password){
    return res.status(422).send({Errors:[
        {title:'Fields Missing',detail:'Provide email and passwords...!'}
    ]})
   }
   userModel.findOne({email},(err,user)=>{
        if(err){
            return res.status(401).send(normalizeErrors(err.errors))
        }
        if(!user){
            return res.status(422).send({Errors:[
                {title:'Invalid User',detail:'User Does not exists...!'}
            ]})
        }
        if(user.isSamePassword(password)){
            //console.log("All Pass ,generate JWT");
            const token = jwt.sign({
                userId:user.id,
                username: user.username
            },secretKey,{expiresIn:'1h'})
            res.json(token);
        }else{
            return res.status(422).send({Errors:[
                {title:'Wrong Data',detail:'Email or password does not exists...!'}
            ]})    
        }
   })
   //return res.json({email,password})
}

exports.register = (req,res)=>{
//console.log("Inside Hendler",req);    
const {username,email,password,confirmPassword} = req.body;
if(!email || !password){
    return res.status(422).send({Errors:[
        {title:'Fields Missing',detail:'Provide email and password...!'}
    ]})
}
if(password!== confirmPassword){
    return res.status(422).send({Errors:[
        {title:'Invalid Password',  detail:'Password and Confirm Password should be same...!'}
    ]})
}
userModel.findOne({email},(err,existingUser)=>{
    if(err){
        return res.status(401).send(normalizeErrors(err.errors))
    }
    if(existingUser){
        return res.status(422).send({Errors:[
            {title:'Invalid Email',  detail:'Email already present...!'}
        ]})
    }
    const user = new userModel({
        username,
        email,
        password
    })
    user.save((err)=>{
        if(err){
            return res.status(422).send(normalizeErrors(err.errors));
        }
        return res.json({'registered':true})
    })
})
}
exports.authMiddleware = function(req,res,next){
        const token = req.headers.authorization;
        if(token){
           const user = parseToken(token);
            userModel.findById(user.userId,function(err,user){
                if(err){
                    return res.status(401).send(normalizeErrors(err.errors))
                }
                if(user){
                    res.locals.user = user;
                    next();
                }else{
                    return notAuthorized(res);
                }
            }) 
        }else{
            return notAuthorized(res);
        }
        //console.log(headers)
}
const parseToken = function(token){
    return jwt.verify(token.split(" ")[1], secretKey);
}
const notAuthorized = function(res){
    return res.status(401).send({Errors:[
        {title:'Unauthorized',detail:'Please login to access this feature...!'}
     ]})
}