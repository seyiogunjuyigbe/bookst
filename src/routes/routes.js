let root = __dirname + "../../../public/html-demo/home";
const authRoutes = require('./auth');
const bookRoutes = require('./book');
const initRoutes = app => {
    app.use('/auth', authRoutes);
    app.use('/books', bookRoutes);
    app.get("/", (req, res) => {
        return res.status(200).sendFile("index.html", { root })
    })
    app.all("*", (req, res) => {
        return res.status(404).send('Sorry, requested route not found')
    })

}

module.exports = initRoutes