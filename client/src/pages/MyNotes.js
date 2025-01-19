import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const MyNotes = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      const email = localStorage.getItem('email'); // Get user email from localStorage

      if (!email) {
        setError('User not logged in');
        setLoading(false);
        return;
      }

      const res = await fetch(`https://chaptr-mg42.onrender.com/api/books/user/${email}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch books');
      }

      const data = await res.json();
      console.log('Fetched Books:', data); // Log the fetched books
      setBooks(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch books:', error);
      setError('Failed to fetch books. Please try again.');
      setLoading(false);
    }
  };

  // Handler for deleting a book
  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (!confirmDelete) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:7500/api/books/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to delete book');
      }

      // After deleting, fetch the updated list of books
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
      setError('Failed to delete book. Please try again.');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Layout>
      {loading && <p className="paragraph">Loading books...</p>}
      {error && <p className="paragraph">{error}</p>}

      {/* Book grid */}
      <h1 className='title ms-4 mt-4'>My Notes</h1>
      <div className="book-grid">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="book-card">
              <h2>{book.title}</h2>
              <h4>{book.author}</h4>
              {book.imageURL && (
                <img
                  src={book.imageURL}
                  alt={`${book.title} cover`}
                  className="book-thumbnail"
                />
              )}

              {/* Edit and Delete buttons */}
              <div className="notes-button-group">
                <button
                  onClick={() => navigate(`/edit-book/${book._id}`)} // Navigate to the edit page
                  className="crud-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book._id)} // Call delete handler
                  className="crud-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="paragraph">No books available</p>
        )}
      </div>
    </Layout>
  );
};

export default MyNotes;
