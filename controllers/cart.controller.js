const db = require("../db");


module.exports.viewCart = (req, res) => {
    let sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
        res.redirect('/products')
        return;
    }

    // let productId =
    //     db.get('sessions')
    //         .find({ id: sessionId })
    //         .get('cart')
    //         .value();

    let cont=   Object.keys(db.get('sessions')
    .find({ id: sessionId })
    .value().cart).length;

    let arrCart=    Object.entries(db.get('sessions')
    .find({ id: sessionId })
    .value().cart);

    let  products= db.get('products').find({ id: productId }).value();

    console.log(arrCart);


    res.render('cart/index', {
        // products: db.get('products').find({ id: productId }).value(),
        cart: arrCart,
    })

}

module.exports.addToCart = (req, res, next) => {
    let productId = req.params.productId;
    let sessionId = req.signedCookies.sessionId;

    if (!sessionId) {
        res.redirect('/products')
        return;
    }

    let count =
        db.get('sessions')
            .find({ id: sessionId })
            .get('cart.' + productId, 0)
            .value();


    db.get('sessions')
        .find({ id: sessionId })
        .set('cart.' + productId, (count + 1))
        .write();

    res.redirect('/products')

    next();
}