import Book from '../models/Book.js';

// Fetch all books
export const getBooks = async (req, res) => {
    try {
      const books = await Book.find();
      if (!books || books.length === 0) {
        return res.status(404).json({ message: 'No books found' });
      }
      res.json(books); // Sends books data as JSON to the client
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching books', error });
    }
  };

// Add a new book
export const createBook = async (req, res) => {
    const { title, author, description, imageURL, genre, user } = req.body; // Destructure imageURL and genre
    try {
      // Create a new book instance
      const newBook = new Book({
        title,
        author,
        description,
        imageURL, 
        genre,     // Include genre in the book data
        user,
      });
  
      // Save the new book to the database
      console.log(newBook);
      await newBook.save();
  
      // Send success response
      res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
      // Send error response if something goes wrong
      res.status(500).json({ message: 'Failed to add book', error });
    }
  };


export const getBookById = async (req, res) => {
    const { bookId } = req.params;

    try {
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching book', error });
    }
  };

  export const getBooksByUserEmail = async (req, res) => {
    const { email } = req.params;
    try {
      const books = await Book.find({ user: email }); // Assuming 'user' field in Book model stores the email
      if (!books || books.length === 0) {
        
        return res.status(404).json({ message: 'No books found for this user' });
      }
      res.json(books); // Send books data as JSON
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching books', error });
    }
  };

  export const deleteBook = async (req, res) => {
    const bookId = req.params.id;
  
    try {
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      await book.deleteOne(); // Remove the book from the database
  
      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error('Error deleting book:', error);
      res.status(500).json({ message: 'Failed to delete book' });
    }
  };


export const updateBook = async (req, res) => {
  try {
    const { title, author, description, imageURL, genre } = req.body;

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Update the fields
    book.title = title;
    book.author = author;
    book.description = description;
    book.imageURL = imageURL;
    book.genre = genre;

    const updatedBook = await book.save();
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Failed to update book' });
  }
};
