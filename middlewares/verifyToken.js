const jwt = require("jsonwebtoken");

//Middleware fuction to check and verify jwt token.
function verifyToken(req, res, next){
    //get the jwt token from headers authorization.
const token = req.headers.authorization?.split(" ")[1];
if(!token){
    return res.status(401).json({
        error: true,
        message: "unauthorized - NO token provided",
        status: 401,
    });
}
jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) {
       return res.status(401).json({
        error: true,
        message: "unauthorized - Invalid token",
        status: 401,
    });
    }
    /*token is valid , attach to  'decoded' payload to request object,it will have something like : 
    email: 'admin@medicalport.com' , iat: 1709583185, exp: 1709586785 */
    req.decodedtoken = decoded;
    next();
});
}
module.exports = verifyToken;