import { useState } from 'react';
import { Send, FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Quote = () => {
  const [formData, setFormData] = useState({ name: '', company: '', email: '', materials: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.materials) return;
    
    setStatus('submitting');
    try {
      let response;
      let success = false;
      for (let i = 0; i < 2; i++) {
        try {
          response = await fetch('/api/createQuotation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
          if (response.ok) {
            success = true;
            break;
          }
          await new Promise(r => setTimeout(r, 3000)); // wait 3 seconds before retry
        } catch (e) {
          if (i === 1) throw e;
          await new Promise(r => setTimeout(r, 3000));
        }
      }
      
      if (!success) throw new Error('Network response was not ok');
      setStatus('success');
      setFormData({ name: '', company: '', email: '', materials: '', message: '' });
    } catch (error) {
      console.error('Error submitting quote request:', error);
      setStatus('error');
    }
  };

  return (
    <div>
      <Helmet>
        <title>Request a Quote | Anchorstone Global LLP</title>
        <meta name="description" content="Request a formal quote for bulk scrap materials including plastics, metals, and paper from Anchorstone Global LLP." />
        <link rel="canonical" href="https://anchorstoneglobal.co.in/quote" />
      </Helmet>
      <section className="section" style={{ backgroundColor: 'var(--bg-dark)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Request a Formal Quote</h1>
          <p style={{ fontSize: '1.2rem', color: '#ccc', maxWidth: '600px', margin: '0 auto' }}>
            Looking for a specific scrap material or bulk supply? Let us know your requirements and our sales team will generate a formal quotation.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <form className="contact-form" onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <FileText className="text-green" size={32} />
              <h2 style={{ color: 'var(--bg-dark)', margin: 0 }}>Quotation Details</h2>
            </div>
            
            {status === 'success' && (
              <div style={{ padding: '1rem', backgroundColor: '#e8f5e9', color: '#2e7d32', marginBottom: '2rem', borderRadius: '4px' }}>
                Thank you! Your quotation request has been sent to our ERP system. A sales representative will contact you with pricing shortly.
              </div>
            )}
            {status === 'error' && (
              <div style={{ padding: '1rem', backgroundColor: '#ffebee', color: '#c62828', marginBottom: '2rem', borderRadius: '4px' }}>
                Oops! Something went wrong communicating with the server. Please try again later.
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required disabled={status === 'submitting'} />
              </div>
              
              <div className="form-group">
                <label htmlFor="company">Company Name</label>
                <input type="text" id="company" value={formData.company} onChange={handleChange} placeholder="Acme Corp" disabled={status === 'submitting'} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="john@acmecorp.com" required disabled={status === 'submitting'} />
            </div>
            
            <div className="form-group">
              <label htmlFor="materials">Materials Requested (incl. quantities) *</label>
              <input type="text" id="materials" value={formData.materials} onChange={handleChange} placeholder="e.g., 50 Tons of PET Hot Washed Flakes" required disabled={status === 'submitting'} />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Additional Requirements / Shipping Port</label>
              <textarea id="message" value={formData.message} onChange={handleChange} placeholder="CIF to Port of Rotterdam, require specific purity levels..." rows="4" disabled={status === 'submitting'}></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', opacity: status === 'submitting' ? 0.7 : 1, marginTop: '1rem' }} disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Processing Request...' : <><span style={{ marginRight: '8px' }}>Submit Request</span> <Send size={18} /></>}
            </button>
          </form>

        </div>
      </section>
    </div>
  );
};

export default Quote;
