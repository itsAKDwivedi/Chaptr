import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout/Layout';

const AddBookPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    imageURL: '',
    genre: 'Biography',
    user: '', // Will be populated with email from localStorage
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const genres = ['Biography', 'Fiction', 'Finance', 'History', 'Science', 'Self Help'];
  const navigate = useNavigate();
  const { bookId } = useParams(); // Retrieve `bookId` from the URL

  // Fetch book details if in edit mode
  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!bookId) return; // Skip if not editing (adding new book)

      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://chaptr-mg42.onrender.com/api/books/${bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(response.data); // Prefill form with fetched data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setMessage({ text: 'Failed to fetch book details.', type: 'error' });
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const applyTextFormat = (formatType) => {
    const textArea = document.getElementById('description');
    let start = textArea.selectionStart;
    let end = textArea.selectionEnd;
    let selectedText = textArea.value.substring(start, end);
  
    switch (formatType) {
      case 'bold':
        textArea.value = textArea.value.slice(0, start) + `**${selectedText}**` + textArea.value.slice(end);
        break;
      case 'italic':
        textArea.value = textArea.value.slice(0, start) + `*${selectedText}*` + textArea.value.slice(end);
        break;
      case 'underline':
        textArea.value = textArea.value.slice(0, start) + `__${selectedText}__` + textArea.value.slice(end);
        break;
      case 'strike':
        textArea.value = textArea.value.slice(0, start) + `~~${selectedText}~~` + textArea.value.slice(end);
        break;
      default:
        break;
    }
    textArea.focus();
    setFormData({ ...formData, description: textArea.value });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (!email) {
      setMessage({ text: 'User not logged in.', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      let response;

      if (bookId) {
        // If `bookId` exists, update the existing book
        response = await axios.put(
          `http://localhost:7500/api/books/${bookId}`,
          { ...formData, user: email }, // Ensure user email is included
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage({ text: 'Book updated successfully!', type: 'success' });
      } else {
        // Otherwise, create a new book
        response = await axios.post(
          'http://localhost:7500/api/books',
          { ...formData, user: email }, // Include user email for new books
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage({ text: 'Book added successfully!', type: 'success' });
      }

      console.log(response.data);
      setLoading(false);

      // Navigate back to the books list
      navigate('/my-notes');
    } catch (error) {
      console.error('Error submitting book:', error);
      setMessage({ text: 'Failed to submit book. Please try again.', type: 'error' });
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="add-book-page">
        <h1>{bookId ? 'Edit Book' : 'Add Book'}</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Book Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
          />

          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author's name"
          />

          <label htmlFor="imageURL">Image URL</label>
          <input
            type="text"
            id="imageURL"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            placeholder="Enter book image URL"
          />

          <label htmlFor="genre">Genre</label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter book description"
          />

        <div className="text-formatting">
            <button type="button" onClick={() => applyTextFormat('bold')}>🅱</button>
            <button type="button" onClick={() => applyTextFormat('italic')}>ℹ️</button>
            <button type="button" onClick={() => applyTextFormat('underline')}>🇺</button>
            <button type="button" onClick={() => applyTextFormat('strike')}>Strike</button>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? (bookId ? 'Updating...' : 'Adding...') : (bookId ? 'Update Book' : 'Add Book')}
          </button>
        </form>

        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddBookPage;
