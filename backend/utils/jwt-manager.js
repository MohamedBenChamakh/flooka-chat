const jwt = require("jsonwebtoken");

exports.extractFromToken= (authHeader,attr)=>{
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    return decodedToken[attr];
}