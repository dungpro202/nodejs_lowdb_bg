const db = require('../db');
const shortid = require('shortid');



module.exports.index = (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    })
}

module.exports.search = (req, res) => {
    let q = req.query.q;
    let matchedUsers = db.get('users').value().filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)

    res.render('users/index', {
        users: matchedUsers
    })
}

module.exports.create = (req, res) => {
    // console.log(req.cookies);
    res.render('users/create')
}

module.exports.get = (req, res) => {
    // let id = parseInt(req.params.id);
    let id = req.params.id;

    let user = db.get('users').find({ id: id }).value();
    res.render('users/view', {
        user: user
    })
}

module.exports.portCreate = (req, res) => {
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('\\').slice(1).join('/');
    
    console.log( req.body.avatar)

    console.log(res.locals)

    db.get('users').push(req.body).write();
    res.redirect('/users')
}