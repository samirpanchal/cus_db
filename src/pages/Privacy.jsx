import React from 'react';
import { Helmet } from 'react-helmet-async';

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Anchorstone Global</title>
        <meta name="description" content="Privacy Policy for Anchorstone Global LLP." />
      </Helmet>
      
      <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">Privacy Policy</h1>
            <div className="space-y-6 text-slate-600">
              <p className="text-sm text-slate-500">Last Updated: {new Date().toLocaleDateString()}</p>
              
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">1. Introduction</h2>
                <p>
                  Welcome to Anchorstone Global LLP. We respect your privacy and are committed to protecting your personal data. 
                  This privacy policy will inform you as to how we look after your personal data when you visit our website 
                  (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">2. Data We Collect</h2>
                <p>
                  We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                  <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                  <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, and other technology on the devices you use to access this website.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">3. How We Use Your Data</h2>
                <p>
                  We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                  <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                  <li>Where we need to comply with a legal obligation.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">4. Google API Services</h2>
                <p>
                  Our website may use Google API Services. Anchorstone Global LLP's use and transfer to any other app of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">5. Contact Us</h2>
                <p>
                  If you have any questions about this privacy policy or our privacy practices, please contact us at:
                  <br /><br />
                  <strong>Anchorstone Global LLP</strong><br />
                  SHED NO. 19, HITENDRANAGAR DIAMAND PARK FEEDER NO.9<br />
                  Ahmedabad, Gujarat, India 382340<br />
                  LLPIN: ACU-7275
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
