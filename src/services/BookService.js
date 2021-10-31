'use strict';
const mongoose = require('mongoose');

const Book = new mongoose.Schema({
    url: String,
    name: String,
    isbn: String,
    publisher: String,
    country: String,
    authors: [String],
    cover: {
        url: String,
        image: String,
    },
    pov_characters: [{
        url: String,
        name: String,
        gender: String,
        culture: String,
        born: String,
        died: String,
        aliases: [String],
        titles: [String]
    }],

});


module.exports = class BookService {
    async getIndex() {
        try {
            await mongoose.connect(process.env.DATABASE_URL);

            const bookModel = mongoose.model('Book', Book)
            const books = await bookModel.find();
            console.log(books);
            let result = []
            books.forEach(book => {
                result.push({
                    book: book.name,
                    url: book.url,
                    isbn: book.isbn,
                    authors: book.authors,
                    povCharacters: book.pov_characters
                })
            });

            return result
        } catch (err) {
            return null;
        }
    }

    async getBookFromISBN(isbn) {
        try {
            await mongoose.connect(process.env.DATABASE_URL);
            const bookModel = mongoose.model('Book', Book)
            const book = await bookModel.findOne({ isbn: isbn });
            return book
        } catch (err) {
            return null;
        }
    }

    async getPovcharacters() {
        try {
            await mongoose.connect(process.env.DATABASE_URL);

            const bookModel = mongoose.model('Book', Book)
            const books = await bookModel.find();
            let result = []
            books.forEach(book => {
                result.push({
                    book: book.name,
                    povCharacters: book.pov_characters
                })
            });
            return result
        } catch (err) {
            return null;
        }
    }

    async getBooksFromCharacter(name) {
        try {
            await mongoose.connect(process.env.DATABASE_URL);

            const bookModel = mongoose.model('Book', Book)
            const books = await bookModel.find({
                pov_characters: { $elemMatch: { name: name } }
            })
            let result = []
            books.forEach(book => {
                result.push(book.name)
            });
            return result
        } catch (err) {
            return null;
        }
    }

    async getCharacterdetails(name) {
        try {
            await mongoose.connect(process.env.DATABASE_URL);

            const bookModel = mongoose.model('Book', Book)

            const books = await bookModel.find({
                pov_characters: { $elemMatch: { name: name } }
            })

            let result = null

            for (const book of books) {
                if (result) {
                    break;
                }
                for (const pov of book.pov_characters) {
                    if (result) {
                        break;
                    }

                    if (pov.name == name) {
                        result = {
                            name: pov.name,
                            gender: pov.gender,
                            aliases: pov.aliases,
                            titles: pov.titles,
                        }
                    }
                }
            }
            return result
        } catch (err) {
            return null;
        }
    }

}

