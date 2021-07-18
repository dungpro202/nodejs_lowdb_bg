const express = require('express');
const app = express()
const port = 3000;
const bodyParser = require('body-parser')
const shortid = require('shortid');

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults
db.defaults({ users: [] })
    .write();


app.get('/', (req, res) =>
    res.render('index', {
        name: 'AAA'
    })
);
app.get('/users',
    (req, res) =>
        res.render('users/index', {
            users: db.get('users').value()
        })
);


app.get('/users/search', (req, res) => {
    let q = req.query.q;
    let matchedUsers = db.get('users').value().filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)

    res.render('users/index', {
        users: matchedUsers
    })
});

app.get('/users/create', (req, res) => {
    res.render('users/create')
});

//route parameters
app.get('/users/:userId', (req, res) => {
    // let id = parseInt(req.params.id);
    let id = req.params.userId;

    let user = db.get('users').find({ id: id }).value();
    res.render('users/view', {
        user:user
    })

});

app.post('/users/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users')
});


app.listen(port, () => console.log(`Example app listening on port ${port}`))