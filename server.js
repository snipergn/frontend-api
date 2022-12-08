const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors())
const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => { 
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json('succes');
        } else {
            res.status(400).json('error logging in');
        }
})

app.post('/register', (req, res) => {
    const {email, name, password, phone} = req.body;
    database.users.push({
        id: '123',
        name: name,
        email: email,
        password: password,
        phone: phone,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])

})

app.get('/profile/:id', (req,res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json("not found");
    }
})


app.listen(3001, ()=> {
    console.log("app is running on port 3001")
})



/*

/ ->> res = this is working
/signin  --> POST Success/fail
/register --> POST = user
/profile/:userID --> GET = user

*/