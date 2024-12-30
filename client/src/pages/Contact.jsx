import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        'service_h9twkwv', // Replace with your Email.js service ID
        'template_inn1k6e', // Replace with your Email.js template ID
        formData,
        'CYGqw-jeKJp9xKm76' // Replace with your Email.js user ID
      )
      .then(
        () => {
          setStatusMessage('Message sent successfully!');
          setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
        },
        () => {
          setStatusMessage('Failed to send the message. Please try again.');
        }
      );
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow-md rounded-lg p-8"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>

            {statusMessage && (
              <p className="mt-4 text-center text-sm text-gray-600">{statusMessage}</p>
            )}

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Email Us</h3>
                <p className="mt-2 text-gray-600">
                  avijitdam003@gmail.com
                  <br />
                  For business inquiries: business@cvgennies.com
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Visit Us</h3>
                <p className="mt-2 text-gray-600">
                  Kolkata, India 700001
                </p>
                <p className="mt-2 text-gray-600">Phone: +91 9593189913</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
