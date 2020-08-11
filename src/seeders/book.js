const Book = require('../models/book');
const faker = require('faker');
const urls = require('./books.json').books
module.exports = async () => {
    try {
        let existing = await Book.findOne({ type: 'default' })
        if (existing) console.log("Books already seeded")
        else {
            for (var i = 0; i <= 20; i++) {
                Book.create({
                    title: faker.company.catchPhrase(),
                    type: 'default',
                    price: faker.commerce.price(),
                    description: `${faker.company.catchPhraseDescriptor()} ${faker.random.words(15)}`,
                    artCover: urls[i],
                    vendor: "Oluwaseyi Ogunjuyigbe"
                })
            }
            console.log("Books seeded successfully")
        }
    } catch (err) {
        console.log(err)
    }

}