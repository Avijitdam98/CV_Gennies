import React from 'react';
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-lg max-w-none"
        >
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p>
              At CV Gennies, we take your privacy seriously. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our website and use our
              services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Name and contact information</li>
              <li>Resume and career information</li>
              <li>Account credentials</li>
              <li>Payment information</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Usage Information</h3>
            <ul className="list-disc pl-6">
              <li>Browser and device information</li>
              <li>IP address and location data</li>
              <li>Website activity</li>
              <li>Cookie data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your
              personal information. However, please note that no method of transmission over the internet
              or electronic storage is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              privacy@cvgennies.com
            </p>
          </section>

          <section>
            <p className="text-sm text-gray-600">Last Updated: December 30, 2024</p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
