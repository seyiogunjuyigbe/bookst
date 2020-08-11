const router = require("express").Router();
let { fetchAll } = require('../controllers/book')
router.get('/', async (req, res) => {
    try {
        let books = await fetchAll();
        return res.status(200).render("index", { books, user: req.user })
    } catch (err) {
        return res.status(200).render("index", { books: null, user: req.user, err: err.message })
    }

})
module.exports = router;