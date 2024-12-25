import React from 'react';
import Layout from './../components/Layout/Layout';
import { MdEmail } from "react-icons/md";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import { IoPhonePortraitOutline, IoLocation } from "react-icons/io5";

const Contact = () => {
  return (
    <Layout>
      <div className="container contact-page py-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="./images/contact.png"
              alt="Contact us"
              className=""
            />
          </div>
          {/* Contact Information */}
          <div className="col-md-6">
            <h1 className="heading mb-5">Contact Us</h1>
            <ul className="list-unstyled">
              <li className="d-flex align-items-center mb-3">
                <IoPhonePortraitOutline className="contact-icon" size={24} />
                <span>+91-746xxx5413</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <MdEmail className="contact-icon" size={24} />
                <span>help@chaptr.com</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <FaInstagram className="contact-icon" size={24} />
                <span>Lorem Ipsum</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <FaWhatsapp className="contact-icon" size={24} />
                <span>+91-746xxx5413</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <FaFacebook className="contact-icon" size={24} />
                <span>Lorem Ipsum</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <IoLocation className="contact-icon" size={24} />
                <span>A-122, Lorem Ipsum Road, Noida</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
