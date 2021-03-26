const secretKey = "secretkey23456";

const expireTime = 24  *  60  *  60;
// const expireTime = 10;
const refreshExpireTime = 24 * 60 * 60 * 24;
// const refreshExpireTime = 500;

const  port  =  process.env.PORT  ||  3001;

const at = '5w3o7g0jl8vg3ypda7or8aq87x5cgi7p';


module.exports = {
    secretKey,
    expireTime,
    refreshExpireTime,
    port,
    at,
};
