const fetch = require('node-fetch');

const getUsers = () => {
    let url = `http://localhost:3000/users`;
    return apiServerJsonCaller(url);
};

const addUsers = (body) => {
    let url = `http://localhost:3000/users`;
    return apiServerJsonCaller(url, 'POST', body);
};

const findUserByUsername = (username) => {
    let url = `http://localhost:3000/users?username=${username}`;
    return apiServerJsonCaller(url);
};

const addTask = (body) => {
    let url = `http://localhost:3000/tasks`;
    return apiServerJsonCaller(url, 'POST', body);
};

const updateTask = (body, id) => {
    let url = `http://localhost:3000/tasks/${id}`;
    return apiServerJsonCaller(url, 'PUT', body);
};


const getTasks = () => {
    let url = `http://localhost:3000/tasks`;
    return apiServerJsonCaller(url);
};

const getTasksByUsername = (username) => {
    let url = `http://localhost:3000/tasks?username=${username}`;
    return apiServerJsonCaller(url);
};

const findTaskById = (id) => {
    let url = `http://localhost:3000/tasks?id=${id}`;
    return apiServerJsonCaller(url);
};

const deleteTask = (id) => {
    let url = `http://localhost:3000/tasks/${id}`;
    return apiServerJsonCaller(url, 'DELETE');
};


const apiServerJsonCaller = (url, method = 'GET', body = "") => {
    return new Promise(async (resolve, reject) => {
        let response;
        try {
            if(body){
                response = await fetch(url,
                    {
                        method: method,
                        body: body,
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
            }else{
                console.log('sono in else')
                response = await fetch(url,
                    {
                        method: method,
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
            }
            let responseJson = await response.json();
            resolve(responseJson);
        } catch (e) {
            reject(e);
        }
    });
};


module.exports = {
    getUsers,
    addUsers,
    findUserByUsername,
    addTask,
    getTasks,
    findTaskById,
    deleteTask,
    updateTask,
    getTasksByUsername

};
