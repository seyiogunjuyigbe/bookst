const { success, error } = require('../middlewares/response');
const Book = require('../models/book')
const User = require('../models/user')
const Transaction = require('../models/transaction')
const { SECRET_KEY } = require('../config/config')
const axios = require('axios').default
axios.defaults.headers.common['Authorization'] = `Bearer ${SECRET_KEY}`;

module.exports = {
    async createBook(req, res) {
        const { title, description, category, price } = req.body;
        try {
            let existingBook = await Book.findOne({ title: title.toUpperCase(), type: 'vendor', vendor: req.user._id });
            if (existingBook) return error(res, 409, 'Book title already exists');
            else {
                let book = await Book.create({ title, description, category, price, type: 'vendor', vendor: req.user._id });
                if (req.file) book.artCover = req.file.path;
                await book.save();
                let user = await User.findById(req.user.id);
                user.books.push(bookId);
                await user.save()
                return success(res, 200, book)
            }
        } catch (err) {
            return error(res, 500, err.message)
        }
    }, async updateBook(req, res) {
        const { title, description, category, price } = req.body;
        try {
            let book = await Book.findById(req.params.bookId);
            if (String(book.vendor) !== String(req.user.id)) return error(res, 403, 'Unauthorized access');
            else {
                book.set({ title, description, category, price });
                if (req.file) book.artCover = req.file.path;
                await book.save()
                return success(res, 200, book)
            }
        } catch (err) {
            return error(res, 500, err.message)
        }
    }, async deleteBook(req, res) {
        try {
            let book = await Book.findById(req.params.bookId);
            if (String(book.vendor) !== String(req.user.id)) return error(res, 403, 'Unauthorized access');
            else {
                let user = await User.findById(req.user.id);
                user.books.pull(bookId);
                await user.save()
                await book.remove();

                return success(res, 200, "Book deleted")
            }
        } catch (err) {
            return error(res, 500, err.message)
        }
    }, async fetchAllbooks(req, res) {
        let obj = {};
        if (req.query.category) obj = { category: req.query.category }
        try {
            let books = await Book.find(obj).sort({ price: 'asc' });
            return success(res, 200, books)
        } catch (err) {
            return error(res, 500, err.message)

        }
    }, async fetchThisBook(req, res) {
        try {
            let book = await Book.findById(req.params.bookId)
            return res.status(200).render('product', { book, user: req.user })
        } catch (err) {
            return error(res, 500, err.message)
        }
    },
    async purchaseBook(req, res) {
        try {
            let book = await Book.findById(req.params.bookId)
            let transaction = await Transaction.create({
                book, customer: req.user.id
            });
            await transaction.save()
            let response = await axios.post("https://api.flutterwave.com/v3/payments", {
                tx_ref: transaction.token,
                amount: book.price,
                payment_options: 'card',
                redirect_url: `${req.headers.host}/transaction/${transaction.id}/complete`,
                customer: {
                    'email': req.user.email,
                    'phonenumber': req.user.phone,
                    'name': `${req.user.firstName} ${req.user.lastName}`
                },
                meta: {
                    transactionId: transaction.id
                },
                customizations: {
                    title: `Purchase ${book.title}`,
                    description: book.description,
                    logo: book.artCover
                }
            })
            return res.status(200).redirect(response.data.data.link)
        } catch (err) {
            return error(res, 500, err.message)
        }
    },
    async fetchAll() {
        try {
            let books = await Book.find({}).sort({ price: 'asc' });
            return books
        } catch (err) {
            return err.message

        }
    }
}