import React from 'react';
import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-lg max-w-none"
        >
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using CV Gennies, you accept and agree to be bound by the terms and
              provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
            <ul className="list-disc pl-6">
              <li>
                Permission is granted to temporarily download one copy of the materials for personal,
                non-commercial transitory viewing only.
              </li>
              <li>
                This is the grant of a license, not a transfer of title, and under this license you may
                not:
                <ul className="list-disc pl-6 mt-2">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose</li>
                  <li>attempt to decompile or reverse engineer any software contained on CV Gennies</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Account Terms</h2>
            <ul className="list-disc pl-6">
              <li>You must be 13 years or older to use this Service.</li>
              <li>You must provide your legal full name, a valid email address, and any other information requested.</li>
              <li>Your login may only be used by one person - shared logins are not permitted.</li>
              <li>You are responsible for maintaining the security of your account and password.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Payment Terms</h2>
            <ul className="list-disc pl-6">
              <li>Free accounts are available with limited features.</li>
              <li>Paid accounts are billed in advance on a monthly or annual basis.</li>
              <li>All fees are exclusive of all taxes, levies, or duties.</li>
              <li>Refunds are processed according to our refund policy.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Disclaimer</h2>
            <p>
              The materials on CV Gennies are provided on an 'as is' basis. CV Gennies makes no
              warranties, expressed or implied, and hereby disclaims and negates all other warranties
              including, without limitation, implied warranties or conditions of merchantability,
              fitness for a particular purpose, or non-infringement of intellectual property or other
              violation of rights.
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

export default Terms;
