const jwt =  require('jsonwebtoken');

module.exports  = (req, res, next) => {
   try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, 'aminKey');
    req.userData = decoded;
    next();
   }catch(error){
       return res.json({succes: false, message: "Auth Failed"})
   }
}

