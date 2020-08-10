const Book = require('../models/book');
const faker = require('faker');
const User = require('../models/user')
module.exports = async () => {
    try {
        let existing = await Book.findOne({ type: 'default' })
        if (existing) console.log("Books already seeded")
        else {
            let user = await User.findOne({ role: "admin" })
            for (var i = 0; i <= 20; i++) {
                Book.create({
                    title: faker.company.catchPhrase(),
                    type: 'default',
                    price: faker.commerce.price(),
                    description: `${faker.company.catchPhraseDescriptor()} ${faker.random.words(15)}`,
                    artCover: faker.image.imageUrl(500, 500, "", true, true),
                    vendor: user.id
                })
                    .then(async book => {
                        user.books.push(book);
                    })

            }
            user.save()
            console.log("Books seeded successfully")
        }
    } catch (err) {
        console.log(err)
    }

}