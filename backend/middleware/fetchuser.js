const jwt = require('jsonwebtoken');
const JWT_SECRET = "Saket@nice";

const fetchuser = (req, res, next)=>{
    // GEt the user from the token and add id to req object

    const token = req.header('auth-token');
    if(!token){
        res.status(404).send({Error : "Please authenticate using a valid token"});
    }
    try {
        
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(404).send({Error : "Please authenticate using a valid token", message:error.message});

    }
    
}


module.exports = fetchuser;
