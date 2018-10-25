const jwt = require('jsonwebtoken'); 
var signInKey = require('../config/signInKey');

/*
* This function would be used as a middleware function.
* Verify the token passed in the header.
* If the token is not present or expiered, return http status 400.
* If the token is valid, move to the next function. 
*/
module.exports = {
    verifyToken: function(req, res, next) {
        let token = req.get('token');
        jwt.verify(token, signInKey.signInKey, function(err, tokenData) {
          	if(err) {
            	return res.status(400).json("Unauthorized request");
          	}
          	if(tokenData) {
            	decodedToken = tokenData;
            next();
         	}
        });
    }
};