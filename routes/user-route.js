const router = require('express').Router();
const User = require('../models/user');
const bycrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
router.post('/login', (req, res) => {
    User.findOne({email:req.body.email})
        .exec()
        .then((result) => {
           if(result == null) {
               return res.json({success: false, message: "User not found"})
           }else {
               bycrpyt.compare(req.body.password, result.password, (err, ret) => {
                   if(err) {
                    return res.json({success: false, message: "encryption issue"})
                   }else if(ret){
                    const payload = {
                        userId: result._id,
                        email: result.email,
                    };
                   const token =  jwt.sign(payload, 'aminKey');
                   return res.json({success: true, message: "Login successfully", token:token})
                   }else {
                    return res.json({success: false, message: "password do not matched"})
                   }
               })
           }
        }).catch(err => {
            res.json({success: false, message: 'mongo error'});
        })
})

router.post('/signup', (req, res) => {
    bycrpyt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
         return  res.json({success: false, message: "Password enc issue"})
        }else {
            const user = new User({
                displayName: req.body.displayName,
                email: req.body.email,
                password: hash
            });
            user.save()
                .then((result) => {
                    res.json({success: true, messaage: "User Created"})
                }).catch(err => {
                     if(err.code === 11000) {
                         return res.json({success: false, messaage: "Email id alredy exsits"})
                     }
                     return res.json({success: false, messaage: "Internal server error"})
                })
        }
    })

    
})

router.get('/', checkAuth, (req, res) => {
    const userId = req.userData.userId
    User.findById(userId)
        .exec()
        .then((user) => {
            res.json({succes: true, data:user})
        }).catch(err => {
            res.json({succes: false, message: "Auth Failed"})
        })
})

router.patch('/', (req, res) => {

})

module.exports = router;