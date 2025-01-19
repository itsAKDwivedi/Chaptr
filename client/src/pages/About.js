import React, {useEffect} from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {

  useEffect(() => {
    // Intersection Observer for animation on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('start');
          } else {
            entry.target.classList.remove('start');
          }
        });
      },
      { threshold: 0.2 } // Trigger animation when 20% of the element is visible
    );

    // Select all elements with the class "animate-on-scroll"
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect(); // Cleanup observer on component unmount
  }, []);


  return (
    <Layout>
      <div className="about-page">
        <div className="about-hero-section">
          <div className="about-text">
            <h1 className="slideInLeft heading">Hey user !</h1>
            <div class="animated-text">
              <h2>We offer <span></span></h2>
            </div>
            <p className="fadeIn paragraph">
            Welcome to Chaptr, your ultimate companion for managing and organizing book notes effortlessly. Whether you're an avid reader, a student, or a professional, Chaptr makes it easy to capture, organize, and revisit key insights from your favorite books. With its sleek design and intuitive tools, our platform helps transform your reading experience into a structured knowledge base.
            </p>
            <p className="fadeIn paragraph">
            At Chaptr, we believe that every book has ideas worth remembering. Our platform empowers you to highlight, summarize, and categorize important concepts seamlessly. Stay in control of your reading journey, access your notes anytime, and make the most of your learning with Chaptr—your personal book notes manager.
            </p>
          </div>
          <div className="about-image">
            <img
              src="./images/mobile.png"
              alt="About Us"
              className="slideInRight"
            />
          </div>
        </div>

        <div className="mission-section">
          <h2 className="title animate-on-scroll">Our Mission</h2>
          <p className="paragraph centered-text fadeIn">
            Our mission is to deliver excellence by combining cutting-edge technology with unparalleled customer service. We strive to create a sustainable and impactful future for our community.
          </p>
        </div>

        <div className="team-section centered-text">
          <h2 className="title animate-on-scroll">Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img className='slideInLeft' src="./images/person.png" alt="Team Member" />
              <h3>Consequat tempor</h3>
              <p>CEO</p>
            </div>
            <div className="team-member">
              <img className='fadeIn' src="./images/person.png" alt="Team Member" />
              <h3>Velit irure</h3>
              <p>CTO</p>
            </div>
            <div className="team-member">
              <img className='slideInRight' src="./images/person.png" alt="Team Member" />
              <h3>Ea enim</h3>
              <p>COO</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default About;
