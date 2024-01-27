const express = require('express')
const books = express.Router()
const Book = require('../models/Book')

books.get('/seed', (req, res) => {
    Book.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
    },
    {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
    },
    {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
    },
    {
        "title": "Wâˆ€RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
    }])
        .then(res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(res.status(400).json({
            message: 'Seed unsuccessful'
        }))
})

books.get('/', (req, res) => {
    Book.find()
        .then((books) => {
            res.status(200).json(books)
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occured trying to retrieve all books data' })
        })
})

books.get('/:id', (req, res) => {
    Book.findById(req.params.id)
        .then((book) => {
            res.status(200).json(book);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred while fetching book data' });
        });
});

books.put('/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((book) => {
            res.status(200).json(book)
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred trying to update book' });
        });
});

books.delete('/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id)
        .then((book) => {
            res.status(200).json({ message: "Book successfully deleted" })
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occured trying to delete book' })
        })
})

books.post('/', (req, res) => {
    Book.create(req.body)
        .then((book) => {
            res.status(200).json({ message: 'Book successfully created' })
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occured trying to create a book' })
        })
})

module.exports = books;