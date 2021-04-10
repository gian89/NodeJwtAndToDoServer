const router = require('./configRouting');

/*
Questo modulo serve per criptare e decriptare le password
*/
const bcrypt = require('bcryptjs');

/*
require di moduli Custom
*/
const {verifyUser, jwt, newAccessToken} = require('../JWT_AUTH/jwt-auth');
const {expireTime, refreshExpireTime, secretKey} = require('../../config');
const {getUsers, addUsers, findUserByUsername} = require('../SERVER_JSON/server-json');

/*
Queste funzioni si occupano di gestire la registrazione e la login degli utenti.
Al momento della registrazione la password viene salvata in modo criptato.
Al momento delle login agli utenti viene assegnato un token che servirà a verificare la propria identita nelle successive chiamate.
*/

router.get('/getUsers', async (req, res) => {
    getUsers()
        .then(value => {
            return res.status(200).send(value);
        })
        .catch(err => {
            return res.status(500).send(JSON.stringify(err));
        });
});


router.post('/registerUser', (req, res) => {
    let user = {
        "username": req.body.username,
        "password": bcrypt.hashSync(req.body.password),
    };
    let body = JSON.stringify(user);
    findUserByUsername(user.username)
        .then((existingUser) => {
            if (existingUser.length !== 0) {
                let error = {
                    "status": 409,
                    "message": "Email already exists",
                };
                return res.status(409).send(error);
            }
            addUsers(body)
                .then((response) => {
                    return res.status(200).send(response);
                })
                .catch(err => {
                    return res.status(500).send(JSON.stringify(err));
                });
        })
        .catch((err) => {
            return res.status(500).send(JSON.stringify(err));
        });
});


router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    findUserByUsername(username)
        .then((user) => {
            if (user.length === 0) {
                return res.status(404).send({
                    "status": 404,
                    "message": "User does not exist"
                });
            }
            const result = bcrypt.compareSync(password, user[0].password);
            if (!result) return res.status(401).send({
                "status": 401,
                "message": "Incorrect password"
            });
            const accessToken = jwt.sign({id: user[0].id, username: user[0].username}, secretKey, {
                expiresIn: expireTime
            });
            const refreshToken = jwt.sign({id: user[0].id, username: user[0].username}, secretKey, {
                expiresIn: refreshExpireTime
            });
            res.status(200).send({
                "user": {
                    "username": user[0].username,
                    "id": user[0].id
                }, "access_token": accessToken, "expires_in": expireTime, "refresh_token": refreshToken
            });
        })
        .catch((err) => {
            return res.status(500).send(JSON.stringify(err));
        });
});

//Funzione per la verifica della validità dell'accessToken
router.get('/checkAccessToken', (req, res) => {
    // const accessToken = req.body.access_token;
    const authorization = req.headers.authorization
    if (!authorization) {
        let error = {
            "status": 401,
            "message": "Unauthorized"
        }
        res.status(401).send(error);
    }
    let accessToken = authorization.split(' ')[1];

    verifyUser(accessToken)
        .then(verifyAccess => {
            res.status(200).send({
                "id": verifyAccess.id,
                username: verifyAccess.username,
                "accessToken": "valid"
            });
        })
        .catch(reason => {
            console.log(reason);
            res.status(reason.status).send(reason);
        });

});

//Funzione per aggiornare l'accessToken partendo dal refreshToken
router.get('/refreshAccessToken', (req, res) => {
    // const refreshToken = req.body.refresh_token;
    const authorization = req.headers.authorization
    if (!authorization) {
        let error = {
            "status": 401,
            "message": "Unauthorized"
        }
        res.status(401).send(error);
    }
    let refreshToken = authorization.split(' ')[1];
    newAccessToken(refreshToken)
        .then(value => {
            res.status(200).send({"accessToken": value});
        })
        .catch(reason => {
            res.status(401).send(reason);
        })
});

module.exports = router;
