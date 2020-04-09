const express = require('express');
const router = express.Router();
const config = require('../config');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');
const { check, validationResult } = require('express-validator');

router.post("/register", [
    check('name').not().isEmpty().withMessage('Name required'),
    check('username').isEmail().withMessage('Email required'),
    check('password').not().isEmpty().withMessage('Invalid Password')
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).send(errors);
        }
        else{
            const {name, username, password} = req.body;
            const user = await User.findOne({ username: username });
            if (user) {
                res.status(403).send({msg: "User Exists", success: false });
            }
            else{            
                const newUser = new User({name: name, username: username, password: password});
                await newUser.save().then(user => {
                    res.status(200).send({msg: "User Registered", data:{name,username}, success: true});
                })
                .catch(error => {
                    res.status(400).send({msg: "An error occured!", success:false});
                });
            }
        }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('login',{ session: false }, (error, user) => {
        if (error || !user) {
          res.status(400).json({ error });
        } else{
            const payload = {
                id: user._id,
                username: user.username
            };
            req.login(payload, {session: false}, (error) => {
            if (error) {
                res.status(400).send({ error });
            }
            else{
                const token = jwt.sign(payload, config.JWT_SECRET, {expiresIn: config.JWT_EXPIRATION_MS });
                res.status(200).send({ token });
            }
        });
        }
      },
    )(req, res, next);
  });

router.get('/currentUser', passport.authenticate('jwt', {session: false}), 
    (req, res, next) => {
        if(req.user){
            res.json({
                msg: "Current User",
                data : {id: req.user.id, username: req.user.username},
                statusCode: 200,
                success: true
            });    
        }
    }
);

module.exports = router;