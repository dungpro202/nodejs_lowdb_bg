require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRoutes = require('./routes/user.route')
const authRoute = require('./routes/auth.route')
const productRoute = require('./routes/product.route')
const authMiddleware = require('./middlewares/auth.middleware')

const app = express()
const port = 3000;

app.set('view engine', 'pug')
app.set('views', './views')


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// app.use(cookieParser('asdadbhasdb02asd'));
app.use(cookieParser(process.env.SESSION_SECRET));

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

app.use('/users',authMiddleware.requireAuth,userRoutes);
app.use('/auth',authRoute);
app.use('/products',productRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}`))