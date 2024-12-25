import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div class="footer">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
          <li class="nav-item"><Link to="/" class="nav-link px-2">Home</Link></li>
          <li class="nav-item"><Link to="/about" class="nav-link px-2">About</Link></li>
          <li class="nav-item"><Link to="/contact" class="nav-link px-2">Contact</Link></li>
          <li class="nav-item"><Link to="/policy" class="nav-link px-2">Privacy Policy</Link></li>
        </ul>
        <p class="text-center">All Rights Reserved &copy; Chaptr</p>
    </div>
  )
}

export default Footer
