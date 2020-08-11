const Book = require('../models/book');
const faker = require('faker');
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
                    artCover: faker.image.imageUrl(500, 500, "fashion", true, true),
                    vendor: "Oluwaseyi Ogunjuyigbe"
                })
            }
            console.log("Books seeded successfully")
        }
    } catch (err) {
        console.log(err)
    }

}