const db = require('../db');

module.exports.index = (req, res) => {

    let page =parseInt(req.query.page) || 1; //n
    let perpage = 8;
    let start =(page-1)*perpage;
    let end= page*perpage;
    let sl= Math.ceil(db.get('products').value().length/perpage)

    res.render('products/index', {
        products: db.get('products').value().slice(start, end),
        sl:sl,
        page
    })
}
