const router = require('./configRouting');
const CustomError = require("../../Utilities/CustomError");
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
    await routeCaller(getTasks, authorization, res, "")
});

router.get('/getTaskByUsername', async (req, res) => {
    let username = req.query.username;
    const authorization = req.headers.authorization
    await routeCaller(getTasksByUsername, authorization, res, "", username)

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
    await  routeCaller(addTask, authorization, res, "", body)
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
    await routeCaller(updateTask, authorization, res, "", body, req.body.id)
});


router.get('/getTaskById', async (req, res) => {
    let id = req.query.id;
    const authorization = req.headers.authorization
    await routeCaller(findTaskById, authorization, res, "", id)
});

router.delete('/deleteTask', async (req, res) => {
    let id = req.query.id;
    const authorization = req.headers.authorization
    let resValue = JSON.stringify({status: 200, message: "task deleted"})
    await routeCaller(deleteTask, authorization, res, resValue, id)
});


const routeCaller = async (f, authorization, res, resValue, ...params) => {
    try {
        if (!authorization) {
            throw new CustomError(401, "Unauthorized");
        }
        let accessToken = authorization.split(' ')[1];
        await verifyUser(accessToken);
        let value = await f(...params)
        if (resValue) {
            value = resValue;
        }
        return res.status(200).send(value);
    } catch (err) {
        console.log("error: ", JSON.stringify(err));
        if (err.status) {
            return res.status(err.status).send(JSON.stringify(err));
        }
        return res.status(500).send(JSON.stringify({status: 500, message: JSON.stringify(err)}));
    }
}



module.exports = router;
