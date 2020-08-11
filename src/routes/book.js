const router = require("express").Router();
const { checkAuth } = require('../middlewares/auth')
const { check } = require('express-validator');
const parser = require('../middlewares/multer');
const validate = require('../middlewares/validate');
const bookCtrl = require('../controllers/book');

router.post('/', checkAuth, parser.single('artCover'), [
    check('title').not().isEmpty().withMessage('Required field'),
    check('price').not().isEmpty().withMessage('Required field')
], validate, bookCtrl.createBook);
router.put('/:bookId', checkAuth, parser.single('artCover'), [
    check('title').not().isEmpty().withMessage('Required field'),
    check('price').not().isEmpty().withMessage('Required field')
], validate, bookCtrl.updateBook);
router.get('/', bookCtrl.fetchAllbooks);
router.get('/:bookId', bookCtrl.fetchThisBook);
router.delete('/:bookId', checkAuth, bookCtrl.deleteBook);
router.get('/:bookId/purchase', checkAuth, bookCtrl.purchaseBook)

module.exports = router;