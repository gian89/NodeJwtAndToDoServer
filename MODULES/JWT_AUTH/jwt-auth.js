const  jwt  =  require('jsonwebtoken');
const CustomError = require("../../Utilities/CustomError");
const {secretKey,expireTime} = require('../../config');


const verifyUser = (accessToken) => {
    return new Promise((resolve, reject) => {
        try{
            const payload = jwt.verify(accessToken, secretKey);
            // console.log('payload:', payload);
            resolve(payload);
        } catch(error) {
            if (error instanceof jwt.TokenExpiredError){
                reject(new CustomError(400, "expired token"));
            }else {
                reject(new CustomError(401, "Invalid  token"));
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
            reject(new CustomError(401, "Invalid  token"));


        }
    })

};

module.exports = {
    jwt,
    verifyUser,
    newAccessToken
};
