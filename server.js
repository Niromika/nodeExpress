const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const morgan = require('morgan');

app.use(morgan('combined'));

const creds = {
    username: 'name@hotmail.com',
    password: '12345678'
};

let users = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.post('/register', (req, res) => {
    let user = {
        name: req.body.name,
        email: req.body.email1,
        password: req.body.password1,
        gender: req.body.gender
    }

    console.log('req.body : ',req.body, req.body.gender);

    if(!(user.email.indexOf('@') > -1 &&
        user.email.length > 5 &&
        user.email.length <= 65 &&
        user.email === req.body.email2)) {
        res.send('email is invalid');
    }

    if(!(user.name.length >= 2)) {
            res.send('name is invalid');
    }

    if(!(user.password.length >= 6 &&
        user.password.length <= 16 &&
        user.password === req.body.password2)) {
            res.send('password is invalid');
        }

    if(user.gender === undefined) {
        res.send('gender is required!')
    }
    
    users.push(user);
    res.send(user);
});

app.post('/', (req, res) => {
    console.log('login res - ', req.body, users);


    if(isUserExist(req.body)) {
        res.send('you successfully loged in!');
    } else {
        res.send('User not exist please <a href="/register.html">register</a>');
    }
});

function isUserExist(checkUser){
    return users.some(user => user.email === checkUser.email && user.password === checkUser.password);
}


app.listen(port, () => console.log(`Example app listening on port ${port}!`));