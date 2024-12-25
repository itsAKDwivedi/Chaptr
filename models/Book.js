import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String, // Make sure imageURL is a string
      required: true,
    },
    genre: {
      type: String, // Genre as a string (or define as an enum if needed)
      required: true,
    },
    user: {
        type: String, // Genre as a string (or define as an enum if needed)
        required: true,
    }
  });  

const Book = mongoose.model('Book', bookSchema);

export default Book;
