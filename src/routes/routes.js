
const initRoutes = app => {

    app.all("*", (req, res) => {
        return res.status(404).send('Sorry, requested route not found')
    })

}

module.exports = initRoutes