var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const newuserSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    { timestamps: true },
  );
   

const User = mongoose.model('NewUser', newuserSchema);

router.get('/Profile',  async function(req, res, next) {
    console.log(req.headers.authorization)
    const token = req.headers.authorization;
    try {
        //get THISISSECRET with env
        const options = { expiresIn: '2d', issuer: 'https://scotch.io' };
        const result = jwt.verify(token, "THISISSECRET", options);
        console.log(result," this is result");
        let user = await User.find({email: result.email});
        res.json(user);
    } catch (error) {
        res.json({message:"Invalid jwt token"});
    }
});

router.post("/login", async function(req, res) {
    let user = await User.findOne({email:req.body.email, password:req.body.password });
    if(user){
        const payload = { email: req.body.email };
        const options = { expiresIn: '2d', issuer: 'https://scotch.io' };
        const secret = "THISISSECRET";
        const token = jwt.sign(payload, secret, options);
        res.json({token});
    }
    else{
        res.json({message:"Invalid credentials"});
    }
  });

router.post("/Profile", async function(req, res) {
    console.log(req.params, req.body)
    console.log(req.body,"in post request");
    const userData = await User.create(req.body);
    res.json(userData);
  });

module.exports = router;