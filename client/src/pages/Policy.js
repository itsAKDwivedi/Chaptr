import React, {useEffect} from 'react';
import Layout from './../components/Layout/Layout';

const Policy = () => {
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
        <div className="about-image policy-img">
            <img
              src="./images/policy.png"
              alt="Privacy Policy"
              className="slideInRight"
            />
          </div>
          <div className="about-text">
            <h1 className="slideInLeft heading">Privacy Policy</h1>
            <p className="fadeIn paragraph">
            At Chaptr, your privacy is our priority. We are committed to safeguarding your personal information and ensuring a secure experience while using our book notes management platform. When you create an account or interact with our services, we may collect certain information, such as your name, email address, and the content you upload (e.g., book notes and annotations). This information is used solely to provide and enhance your experience with Chaptr. We do not sell, share, or rent your personal data to third parties, except as required to operate our services (e.g., trusted third-party service providers) or comply with legal obligations.
            </p>
            <p className="fadeIn paragraph">
            We take robust measures to protect your data, including encryption and secure storage. You remain the sole owner of the content you upload, and you have full control over your data, including the ability to edit or delete it at any time. Chaptr employs cookies and similar technologies to improve functionality and personalize your experience, but you can manage these preferences through your browser settings. By using Chaptr, you agree to this policy and the responsible handling of your data. If you have any questions or concerns about your privacy, please contact us at support@chaptr.com.
            </p>
          </div>
        </div>

        <div className="mission-section">
          <h2 className="title animate-on-scroll">Thanks for trust</h2>
          <p className="paragraph centered-text fadeIn">
            Thank you for trusting Chaptr to manage your book notes and ideas. We are dedicated to providing a secure and reliable platform for your creative journey.
          </p>
        </div>

        
      </div>
    </Layout>
  )
}

export default Policy
