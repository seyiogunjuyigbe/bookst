const authRoutes = require('./auth');
const bookRoutes = require('./book');
const initRoutes = app => {
    app.use('/auth', authRoutes);
    app.use('/books', bookRoutes)
    app.all("*", (req, res) => {
        return res.status(404).send('Sorry, requested route not found')
    })

}

module.exports = initRoutes