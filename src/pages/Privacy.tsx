
const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
        <div className="max-w-4xl mx-auto text-gray-700 space-y-8">
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            <p className="text-lg">
              At Sage.ai, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI business automation platform.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Name, email address, phone number</li>
              <li>Company information and job title</li>
              <li>Payment and billing information</li>
              <li>Account credentials and preferences</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Business Information</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Business data uploaded to our platform</li>
              <li>Marketing campaigns and content</li>
              <li>Analytics and performance metrics</li>
              <li>Customer interaction data</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Technical Information</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>IP address, device information, browser type</li>
              <li>Usage patterns and platform interactions</li>
              <li>Log files and system performance data</li>
              <li>Cookies and tracking technologies</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
            
            <h3 className="text-xl font-semibold mb-3">Service Provision</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Provide and maintain our AI automation services</li>
              <li>Generate personalized business recommendations</li>
              <li>Process payments and manage your account</li>
              <li>Provide customer support and technical assistance</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Improvement and Analytics</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Analyze usage patterns to improve our services</li>
              <li>Develop new features and capabilities</li>
              <li>Conduct research and development</li>
              <li>Ensure platform security and prevent fraud</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Communication</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Send service updates and important notifications</li>
              <li>Provide marketing communications (with consent)</li>
              <li>Respond to inquiries and support requests</li>
              <li>Share product updates and educational content</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">3. Information Sharing and Disclosure</h2>
            
            <p className="mb-4">We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
            
            <h3 className="text-xl font-semibold mb-3">Service Providers</h3>
            <p className="mb-4">We may share information with trusted third-party service providers who assist us in operating our platform, processing payments, or providing customer support, under strict confidentiality agreements.</p>

            <h3 className="text-xl font-semibold mb-3">Legal Requirements</h3>
            <p className="mb-4">We may disclose information when required by law, court order, or government request, or to protect our rights, property, or safety.</p>

            <h3 className="text-xl font-semibold mb-3">Business Transfers</h3>
            <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction, with continued protection under this privacy policy.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
            
            <p className="mb-4">We implement industry-standard security measures to protect your information:</p>
            
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Encryption:</strong> All data is encrypted in transit and at rest using 256-bit SSL encryption</li>
              <li><strong>Access Controls:</strong> Strict access controls and authentication procedures</li>
              <li><strong>Regular Audits:</strong> Regular security audits and penetration testing</li>
              <li><strong>Compliance:</strong> SOC 2 Type II compliance and adherence to industry standards</li>
              <li><strong>Monitoring:</strong> 24/7 security monitoring and threat detection</li>
              <li><strong>Backup:</strong> Regular data backups and disaster recovery procedures</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">5. Your Rights and Choices</h2>
            
            <h3 className="text-xl font-semibold mb-3">Access and Control</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Access, update, or delete your personal information</li>
              <li>Export your data in standard formats</li>
              <li>Opt-out of marketing communications</li>
              <li>Request data portability</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">GDPR Rights (EU Residents)</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Right to rectification and erasure</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Right to withdraw consent</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">CCPA Rights (California Residents)</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Right to know what personal information is collected</li>
              <li>Right to delete personal information</li>
              <li>Right to opt-out of sale of personal information</li>
              <li>Right to non-discrimination for exercising rights</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">6. Cookies and Tracking</h2>
            
            <p className="mb-4">We use cookies and similar technologies to enhance your experience:</p>
            
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Essential Cookies:</strong> Required for basic platform functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how you use our platform</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Marketing Cookies:</strong> Deliver relevant advertisements (with consent)</li>
            </ul>
            
            <p className="mt-4">You can manage cookie preferences through your browser settings or our cookie consent manager.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
            
            <p className="mb-4">We retain your information for as long as necessary to provide our services and fulfill legal obligations:</p>
            
            <ul className="list-disc pl-6 space-y-1">
              <li>Account information: Until account deletion or as required by law</li>
              <li>Business data: As long as your account remains active</li>
              <li>Analytics data: Aggregated data may be retained for up to 7 years</li>
              <li>Financial records: As required by applicable laws and regulations</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">8. International Data Transfers</h2>
            
            <p className="mb-4">
              Sage.ai operates globally and may transfer your information to countries other than your residence. 
              We ensure appropriate safeguards are in place, including Standard Contractual Clauses and adequacy decisions, 
              to protect your information during international transfers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
            
            <p>
              Our services are not intended for individuals under 16 years of age. We do not knowingly collect 
              personal information from children under 16. If we become aware of such collection, 
              we will take steps to delete the information promptly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">10. Changes to This Policy</h2>
            
            <p className="mb-4">
              We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. 
              We will notify you of material changes by email or through our platform, and the updated policy will be 
              effective immediately upon posting.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
            
            <p className="mb-4">If you have questions about this Privacy Policy or our data practices, please contact us:</p>
            
            <div className="space-y-2">
              <p><strong>Email:</strong> privacy@sage.ai</p>
              <p><strong>Data Protection Officer:</strong> dpo@sage.ai</p>
              <p><strong>Address:</strong> Sage.ai Privacy Team, [Your Business Address]</p>
            </div>
            
            <p className="mt-4 text-sm text-gray-600">
              For EU residents: You also have the right to lodge a complaint with your local supervisory authority.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Privacy;
