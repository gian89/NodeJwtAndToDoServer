const  jwt  =  require('jsonwebtoken');
const {secretKey,expireTime} = require('../../config');


const verifyUser = (accessToken) => {
    return new Promise((resolve, reject) => {
        try{
            const payload = jwt.verify(accessToken, secretKey);
            // console.log('payload:', payload);
            resolve(payload);
        } catch(error) {
            if (error instanceof jwt.TokenExpiredError){
                let expiredTokenResponse = {
                    "status": 400,
                    "message": "expired token"
                };
                console.log("jwt expired");
                reject(expiredTokenResponse);
            }else {
                let notValidTokenResponse = {
                    "status": 401,
                    "message": "Invalid  token"
                };
                reject(notValidTokenResponse);
            }

        }
    })

};

const newAccessToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        try{
            const payload = jwt.verify(refreshToken, secretKey);
            // console.log('payload:', payload);
            const  accessToken  =  jwt.sign({ id: payload.id, username: payload.username}, secretKey, {
                expiresIn:  expireTime
            });
            resolve(accessToken);
        } catch(error) {
            let notValidTokenResponse = {
                "status": 401,
                "message": "Invalid  token"
            };
            reject(notValidTokenResponse);
        }
    })

};

module.exports = {
    jwt,
    verifyUser,
    newAccessToken
};
