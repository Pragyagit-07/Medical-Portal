var jwt = require("jsonwebtoken");

function signToken(payload){
    //h stand for hour , m stand for minute and date for expire  is UTC timezone.
    const token = jwt.sign(payload, process.env.secret, {
        expiresIn: "2h",
    });
    
    return token;
}

module.exports = signToken;