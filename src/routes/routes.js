let root = __dirname + "../../../public/html-demo/home";
const authRoutes = require('./auth');
const bookRoutes = require('./book');
const indexRoutes = require('./index');
const transactRoutes = require('./transaction')
const initRoutes = app => {
    app.use('/auth', authRoutes);
    app.use('/books', bookRoutes);
    app.use('', indexRoutes);
    app.use("/transactions", transactRoutes)
    app.all("*", (req, res) => {
        return res.status(404).send('Sorry, requested route not found')
    })

}

module.exports = initRoutes