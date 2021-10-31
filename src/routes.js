'use strict';
const express = require('express')
var router = express.Router();
var BooksController = require('./controllers/BooksController');
var AuthenticationController = require('./controllers/AuthenticationController');
var ensureAuthentication = require('./middleware/EnsureAuthentication');

const booksController = new BooksController();
const authenticationController = new AuthenticationController();

router.get('/oauth', (request, response, next) => {

    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.OAUTH_CLIENT_ID}`)
})

router.get('/auth', (request, response, next) => {
    const { code } = request.query
    return response.json(code);
})

router.get('/authenticate', authenticationController.handle)

router.post('/books', ensureAuthentication, booksController.index)
router.post("/books/povcharacters", ensureAuthentication, booksController.povcharacters);
router.post('/books/cover', ensureAuthentication, booksController.cover)
router.post('/books/characterdetails', ensureAuthentication, booksController.characterdetails)
router.post('/books/booksfromcharacter', ensureAuthentication, booksController.booksFromCharacter)


module.exports = router
