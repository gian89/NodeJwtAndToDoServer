const router = require('./configRouting');

/*
require di moduli Custom
*/
const {addTask, getTasks, findTaskById, deleteTask,updateTask, getTasksByUsername} = require('../SERVER_JSON/server-json');

/*
Queste funzioni si occupano di gestire i Task
*/

router.get('/getTask', async (req, res) => {
    getTasks()
        .then(value => {
            return res.status(200).send(value);
        })
        .catch(err => {
            return res.status(500).send(JSON.stringify(err));
        });
});

router.get('/getTaskByUsername', async (req, res) => {
    let username = req.query.username;
    getTasksByUsername(username)
        .then(value => {
            return res.status(200).send(value);
        })
        .catch(err => {
            return res.status(500).send(JSON.stringify(err));
        });
});


router.post('/addTask', async (req, res) => {
    let task = {
        "date": req.body.date,
        "text":  req.body.text,
        "username":  req.body.username,
        "status": req.body.status
    };
    let body = JSON.stringify(task);
    addTask(body)
        .then((response) => {
            return res.status(200).send(response);
        })
        .catch(err => {
            return res.status(500).send(JSON.stringify(err));
        });
});

router.put('/updateTask/', async (req, res) => {
    let task = {
        "date": req.body.date,
        "text":  req.body.text,
        "username":  req.body.username,
        "status": req.body.status
    };
    let body = JSON.stringify(task);
    updateTask(body, req.body.id)
        .then((response) => {
            return res.status(200).send(response);
        })
        .catch(err => {
            return res.status(500).send(JSON.stringify(err));
        });
});


router.get('/findTaskById', async (req, res) => {
    let id = req.query.id;
        findTaskById(id)
            .then(value => {
                return res.status(200).send(value);
            })
            .catch(err => {
                return res.status(500).send(JSON.stringify(err));
            });
});

router.delete('/deleteTask', async (req, res) => {
    let id = req.body.id;
    deleteTask(id)
        .then(value => {
            return res.status(200).send(value);
        })
        .catch(err => {
            return res.status(500).send(JSON.stringify(err));
        });
});


module.exports = router;
