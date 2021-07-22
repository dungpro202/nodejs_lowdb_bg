const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRoutes = require('./routes/user.route')

const app = express()
const port = 3000;

app.set('view engine', 'pug')
app.set('views', './views')


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use(express.static('public'));
//Routes
app.get('/', (req, res) =>
    res.render('index', {
        name: 'AAA'
    })
);

// app.get('/styles/custom.css', (req, res) =>{
//     res.send('abc')
// })

app.use('/users',userRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}`))