import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import AddBookPage from './pages/AddBookPage';
import BookNotesPage from './pages/BookNotesPage';
import MyNotes from './pages/MyNotes';

function App() {
  return (
    <>
      <Routes>
        <Route path='/dashboard' element={<HomePage/>}/>
        <Route path='/books' element={<HomePage/>}/>
        <Route path='/' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/policy' element={<Policy/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/add' element={<AddBookPage/>}/>
        <Route path="/edit-book/:bookId" element={<AddBookPage />} />
        <Route path='/my-notes' element={<MyNotes/>}/>
        <Route path="/mybook/:bookId" element={<BookNotesPage />} />
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
