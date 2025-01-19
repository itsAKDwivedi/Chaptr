import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genre, setGenre] = useState('All');
  const navigate = useNavigate(); // Initialize useNavigate

  const genres = ['All', 'Biography', 'Fiction', 'Finance', 'History', 'Science', 'Self Help'];

  const fetchBooks = async () => {
    try {
      const res = await fetch('https://chaptr-mg42.onrender.com/api/books');
      const data = await res.json();
      setBooks(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch books:', error);
      setError('Failed to fetch books. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks =
    genre === 'All' ? books : books.filter((book) => book.genre && book.genre === genre);

  return (
    <Layout>

      {loading && <p>Loading books...</p>}
      {error && <p>{error}</p>}

      {/* Genre filter */}
      <div className="genre-filter">
        {genres.map((g) => (
          <div
            key={g}
            className={`genre-box ${genre === g ? 'selected' : ''}`}
            onClick={() => setGenre(g)}
          >
            {g}
          </div>
        ))}
      </div>

      {/* Book grid */}
      <div className="book-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book._id}
              className="book-card"
              onClick={() => navigate(`/mybook/${book._id}`)} // Navigate to book details page
            >
              <h2>{book.title}</h2>
              <h4>{book.author}</h4>
              {book.imageURL && (
                <img src={book.imageURL} alt={`${book.title} cover`} className="book-thumbnail" />
              )}
            </div>
          ))
        ) : (
          <p className='paragraph'>No books available for the selected genre</p>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
