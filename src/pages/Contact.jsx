import { useState } from 'react';
import { MapPin, Mail, Phone, Clock, Send } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });
    
    try {
      const response = await fetch('https://us-central1-anchorstone-2e9bb.cloudfunctions.net/createLead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully! We will contact you soon.' });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to send message.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({ type: 'error', message: 'Network error. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Contact Us | Anchorstone Global LLP</title>
        <meta name="description" content="Contact Anchorstone Global LLP for inquiries regarding plastic and metal scrap supply globally." />
        <link rel="canonical" href="https://anchorstoneglobal.co.in/contact" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Anchorstone Global LLP",
            "image": "https://anchorstoneglobal.co.in/logo.png",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "SHED NO. 19, HITENDRANAGAR DIAMAND PARK FEEDER NO.9",
              "addressLocality": "Ahmedabad",
              "addressRegion": "Gujarat",
              "postalCode": "382340",
              "addressCountry": "IN"
            },
            "url": "https://anchorstoneglobal.co.in/contact"
          })}
        </script>
      </Helmet>
      <section className="section" style={{ backgroundColor: 'var(--bg-dark)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Get In Touch</h1>
          <p style={{ fontSize: '1.2rem', color: '#ccc' }}>
            We'd love to hear from you. Request a quote or ask us anything.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
            
            {/* Contact Details */}
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--bg-dark)' }}>Contact Information</h2>
              <p style={{ color: 'var(--gray)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                Reach out to Anchorstone Global LLP for inquiries regarding bulk orders, material specifications, or global shipping options.
              </p>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                <MapPin className="text-green" size={28} />
                <div>
                  <h4 style={{ marginBottom: '0.25rem' }}>Head Office</h4>
                  <p style={{ color: 'var(--gray)' }}>SHED NO. 19, HITENDRANAGAR DIAMAND PARK FEEDER NO.9<br/>Ahmedabad, Gujarat, India 382340</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <h4 style={{ marginBottom: '0.25rem' }}>Registration</h4>
                  <p style={{ color: 'var(--gray)' }}>LLPIN: ACU-7275</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--bg-dark)' }}>Send a Message</h3>
                
                {status.type === 'success' && (
                  <div style={{ padding: '1rem', backgroundColor: '#e8f5e9', color: '#2e7d32', marginBottom: '1rem', borderRadius: '4px' }}>
                    {status.message}
                  </div>
                )}
                {status.type === 'error' && (
                  <div style={{ padding: '1rem', backgroundColor: '#ffebee', color: '#c62828', marginBottom: '1rem', borderRadius: '4px' }}>
                    {status.message}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required disabled={isSubmitting} />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" required disabled={isSubmitting} />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" value={formData.subject} onChange={handleChange} placeholder="Inquiry about Plastic Regrinds" disabled={isSubmitting} />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" value={formData.message} onChange={handleChange} placeholder="Please provide details about your requirements..." required disabled={isSubmitting}></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1 }} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : <><span style={{ marginRight: '8px' }}>Send Message</span> <Send size={18} /></>}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
