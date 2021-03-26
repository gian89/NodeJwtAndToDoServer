const router = require('./configRouting');
const {verifyUser} = require("../JWT_AUTH/jwt-auth");

/*
require di moduli Custom
*/
const {
    addTask,
    getTasks,
    findTaskById,
    deleteTask,
    updateTask,
    getTasksByUsername
} = require('../SERVER_JSON/server-json');

/*
Queste funzioni si occupano di gestire i Task
*/

router.get('/getTask', async (req, res) => {
    const authorization = req.headers.authorization
    routeCaller(getTasks, authorization)
        .then(value => {
            return res.status(200).send(value);
        })
        .catch(err => {
            if (err.status === 400) {
                return res.status(400).send(JSON.stringify(err));
            }
            return res.status(500).send(JSON.stringify(err));
        });
});

router.get('/getTaskByUsername', async (req, res) => {
    let username = req.query.username;
    const authorization = req.headers.authorization
    routeCaller(getTasksByUsername, authorization, username)
        .then(value => {
            return res.status(200).send(value);
        })
        .catch(err => {
            if (err.status === 400) {
                return res.status(400).send(JSON.stringify(err));
            }
            return res.status(500).send(JSON.stringify(err));
        });
});


router.post('/addTask', async (req, res) => {
    let task = {
        "date": req.body.date,
        "text": req.body.text,
        "username": req.body.username,
        "status": req.body.status
    };
    let body = JSON.stringify(task);
    const authorization = req.headers.authorization
    routeCaller(addTask, authorization, body)
        .then(value => {
            return res.status(200).send(value);
        })
        .catch(err => {
            if (err.status === 400) {
                return res.status(400).send(JSON.stringify(err));
            }
            return res.status(500).send(JSON.stringify(err));
        });
});

router.put('/updateTask/', async (req, res) => {
    let task = {
        "date": req.body.date,
        "text": req.body.text,
        "username": req.body.username,
        "status": req.body.status
    };
    let body = JSON.stringify(task);
    const authorization = req.headers.authorization
    routeCaller(updateTask, authorization, body, req.body.id)
        .then(value => {
            return res.status(200).send(value);
        })
        .catch(err => {
            if (err.status === 400) {
                return res.status(400).send(JSON.stringify(err));
            }
            return res.status(500).send(JSON.stringify(err));
        });
});


router.get('/findTaskById', async (req, res) => {
    let id = req.query.id;
    const authorization = req.headers.authorization
    routeCaller(findTaskById, authorization, id)
        .then(value => {
            return res.status(200).send(value);
        })
        .catch(err => {
            if (err.status === 400) {
                return res.status(400).send(JSON.stringify(err));
            }
            return res.status(500).send(JSON.stringify(err));
        });
});

router.delete('/deleteTask', async (req, res) => {
    let id = req.body.id;
    const authorization = req.headers.authorization
    routeCaller(deleteTask, authorization, id)
        .then(value => {
            return res.status(200).send(value);
        })
        .catch(err => {
            if (err.status === 400) {
                return res.status(400).send(JSON.stringify(err));
            }
            return res.status(500).send(JSON.stringify(err));
        });
});

const routeCaller = (f, authorization, ...params) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!authorization) {
                throw ({
                    "status": 401,
                    "message": "Unauthorized"
                })
            }
            let accessToken = authorization.split(' ')[1];
            await verifyUser(accessToken);
            let value = await f(...params)
            resolve(value);
        } catch (err) {
            console.log("error: ", JSON.stringify(err));
            reject(err);
        }
    })
}


module.exports = router;
