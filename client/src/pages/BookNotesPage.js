import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout.js';

const BookDetailPage = () => {
  const { bookId } = useParams(); // Get book ID from URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await fetch(`https://chaptr-mg42.onrender.com/api/books/${bookId}`);
        const data = await res.json();
        setBook(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch book details:', error);
        setError('Failed to fetch book details. Please try again.');
        setLoading(false);
      }
    };
    fetchBookDetails();
  }, [bookId]);

  // Function to transform description
  const formatDescription = (description) => {
    if (!description) return null;

    // Replace symbols with styled elements
    const formatted = description
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold (**text**)
      .replace(/__(.*?)__/g, '<em>$1</em>') // Italics (__text__)
      .replace(/\n/g, '<br/>'); // Newline to <br/>
      
    return { __html: formatted }; // Return as dangerouslySetInnerHTML-compatible object
  };

  return (
    <Layout>
      {loading && <p className="paragraph">Loading book details...</p>}
      {error && <p className="paragraph">{error}</p>}
      {book && (
        <div className="book-detail">
          <h1 className="heading">{book.title}</h1>
          <h2 className="title">{book.author}</h2>
          {book.imageURL && <img src={book.imageURL} alt={book.title} className="book-thumbnail book-img fadeIn" />}
          
          <div className="book-description">
            <h2 className='title'>And here it goes on...</h2>
            <p className='paragraph slideInRight' dangerouslySetInnerHTML={formatDescription(book.description)} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default BookDetailPage;
