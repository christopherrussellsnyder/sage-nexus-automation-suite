
const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Terms of Service</h1>
        <div className="max-w-4xl mx-auto text-gray-700 space-y-8">
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            <p className="text-lg">
              Welcome to Sage.ai. These Terms of Service ("Terms") govern your use of our AI business automation platform 
              and services. By accessing or using Sage.ai, you agree to be bound by these Terms.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            
            <p className="mb-4">
              By creating an account, accessing, or using any part of Sage.ai's services, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, 
              you may not use our services.
            </p>
            
            <p>
              These Terms apply to all users, including but not limited to individuals, businesses, organizations, 
              and entities that access or use our services.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">2. Description of Services</h2>
            
            <p className="mb-4">
              Sage.ai provides an AI-powered business automation platform that includes:
            </p>
            
            <ul className="list-disc pl-6 space-y-1">
              <li>Intelligent copywriting and content generation</li>
              <li>Marketing automation and campaign management</li>
              <li>E-commerce optimization and website building</li>
              <li>Sales automation and lead management</li>
              <li>Business intelligence and analytics</li>
              <li>Competitor analysis and market research</li>
            </ul>
            
            <p className="mt-4">
              We reserve the right to modify, suspend, or discontinue any aspect of our services at any time, 
              with or without notice, though we will make reasonable efforts to notify users of significant changes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">3. User Accounts and Registration</h2>
            
            <h3 className="text-xl font-semibold mb-3">Account Creation</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>You must provide accurate, current, and complete information during registration</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials</li>
              <li>You must be at least 18 years old to create an account</li>
              <li>One person or entity may not maintain more than one free account</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Account Responsibility</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>You are responsible for all activities that occur under your account</li>
              <li>You must notify us immediately of any unauthorized access</li>
              <li>You agree to update your information to keep it accurate and current</li>
              <li>We reserve the right to suspend or terminate accounts that violate these Terms</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">4. Acceptable Use Policy</h2>
            
            <h3 className="text-xl font-semibold mb-3">Permitted Uses</h3>
            <p className="mb-4">You may use Sage.ai for legitimate business purposes in accordance with these Terms and applicable laws.</p>

            <h3 className="text-xl font-semibold mb-3">Prohibited Uses</h3>
            <p className="mb-2">You agree not to use our services to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Violate any applicable laws, regulations, or third-party rights</li>
              <li>Generate content that is illegal, harmful, threatening, or abusive</li>
              <li>Create spam, malware, or other malicious content</li>
              <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
              <li>Reverse engineer, decompile, or otherwise attempt to extract source code</li>
              <li>Use our services to compete directly with Sage.ai</li>
              <li>Scrape, harvest, or collect user information without consent</li>
              <li>Distribute viruses or other harmful computer code</li>
              <li>Engage in any activity that interferes with or disrupts our services</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">5. Content and Intellectual Property</h2>
            
            <h3 className="text-xl font-semibold mb-3">Your Content</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>You retain ownership of all content you upload or create using our services</li>
              <li>You grant us a license to use your content solely to provide our services</li>
              <li>You represent that you have the right to upload and use all content</li>
              <li>You are responsible for ensuring your content complies with applicable laws</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Our Intellectual Property</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Sage.ai owns all rights to our platform, algorithms, and proprietary technology</li>
              <li>Our trademarks, logos, and brand elements are protected intellectual property</li>
              <li>You may not use our intellectual property without express written permission</li>
              <li>All improvements and enhancements to our services remain our property</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">AI-Generated Content</h3>
            <p>
              Content generated by our AI belongs to you, but you acknowledge that similar content may be 
              generated for other users. You are responsible for reviewing and ensuring the accuracy and 
              appropriateness of all AI-generated content before use.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">6. Payment Terms</h2>
            
            <h3 className="text-xl font-semibold mb-3">Subscription Plans</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Subscription fees are charged in advance on a monthly or annual basis</li>
              <li>All fees are non-refundable except as expressly stated in these Terms</li>
              <li>You authorize us to charge your payment method for all applicable fees</li>
              <li>Failure to pay may result in suspension or termination of services</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Price Changes</h3>
            <p className="mb-4">
              We may change our pricing at any time. For existing subscribers, price changes will take effect 
              at the next renewal period after 30 days' notice.
            </p>

            <h3 className="text-xl font-semibold mb-3">Refunds</h3>
            <p>
              We offer a 30-day money-back guarantee for new subscribers. Refunds are provided at our discretion 
              for exceptional circumstances and are prorated based on unused service time.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">7. Privacy and Data Protection</h2>
            
            <p className="mb-4">
              Your privacy is important to us. Our collection, use, and protection of your personal information 
              is governed by our Privacy Policy, which is incorporated into these Terms by reference.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Data Security</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>We implement industry-standard security measures to protect your data</li>
              <li>You are responsible for maintaining the security of your account credentials</li>
              <li>We cannot guarantee absolute security and you use our services at your own risk</li>
              <li>We will notify you of any data breaches as required by applicable law</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">8. Service Availability and Support</h2>
            
            <h3 className="text-xl font-semibold mb-3">Service Level</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>We strive to maintain 99.9% uptime but do not guarantee uninterrupted service</li>
              <li>Scheduled maintenance will be announced in advance when possible</li>
              <li>We provide customer support through multiple channels during business hours</li>
              <li>Response times vary based on your subscription plan and issue complexity</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Technical Requirements</h3>
            <p>
              You are responsible for ensuring your systems meet our technical requirements and for 
              maintaining internet connectivity necessary to access our services.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">9. Termination</h2>
            
            <h3 className="text-xl font-semibold mb-3">Termination by You</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>You may cancel your subscription at any time through your account settings</li>
              <li>Cancellation takes effect at the end of your current billing period</li>
              <li>You remain responsible for all charges incurred up to the termination date</li>
              <li>You may export your data before termination</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Termination by Us</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>We may suspend or terminate your account for violation of these Terms</li>
              <li>We may terminate services with 30 days' notice for business reasons</li>
              <li>Immediate termination may occur for serious violations or legal requirements</li>
              <li>Upon termination, your right to use our services ceases immediately</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Effect of Termination</h3>
            <p>
              Upon termination, we will delete your data within 90 days unless legally required to retain it. 
              You should export any data you wish to keep before termination.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">10. Disclaimers and Limitation of Liability</h2>
            
            <h3 className="text-xl font-semibold mb-3">Disclaimers</h3>
            <p className="mb-4">
              OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. 
              WE DISCLAIM ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING BUT NOT LIMITED TO 
              WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>

            <h3 className="text-xl font-semibold mb-3">Limitation of Liability</h3>
            <p className="mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL SAGE.AI BE LIABLE FOR ANY INDIRECT, 
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, 
              WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>

            <p>
              OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE 
              12 MONTHS PRECEDING THE EVENT GIVING RISE TO LIABILITY.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">11. Indemnification</h2>
            
            <p>
              You agree to indemnify, defend, and hold harmless Sage.ai and our officers, directors, employees, 
              and agents from any claims, damages, losses, liabilities, costs, and expenses (including reasonable 
              attorneys' fees) arising from your use of our services, violation of these Terms, or infringement 
              of any third-party rights.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">12. Dispute Resolution</h2>
            
            <h3 className="text-xl font-semibold mb-3">Governing Law</h3>
            <p className="mb-4">
              These Terms are governed by the laws of [Your Jurisdiction] without regard to conflict of law principles.
            </p>

            <h3 className="text-xl font-semibold mb-3">Dispute Resolution Process</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Informal Resolution:</strong> We encourage you to contact us first to resolve any disputes informally</li>
              <li><strong>Mediation:</strong> If informal resolution fails, disputes will be resolved through binding mediation</li>
              <li><strong>Arbitration:</strong> Any remaining disputes will be resolved through individual arbitration</li>
              <li><strong>Class Action Waiver:</strong> You waive any right to participate in class action lawsuits</li>
            </ol>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">13. General Provisions</h2>
            
            <h3 className="text-xl font-semibold mb-3">Entire Agreement</h3>
            <p className="mb-4">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and Sage.ai 
              regarding your use of our services.
            </p>

            <h3 className="text-xl font-semibold mb-3">Severability</h3>
            <p className="mb-4">
              If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
            </p>

            <h3 className="text-xl font-semibold mb-3">Assignment</h3>
            <p className="mb-4">
              You may not assign these Terms without our written consent. We may assign these Terms at any time without notice.
            </p>

            <h3 className="text-xl font-semibold mb-3">Updates to Terms</h3>
            <p>
              We may update these Terms from time to time. We will notify you of material changes by email or 
              through our platform. Continued use of our services after changes constitutes acceptance of the new Terms.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">14. Contact Information</h2>
            
            <p className="mb-4">If you have questions about these Terms, please contact us:</p>
            
            <div className="space-y-2">
              <p><strong>Email:</strong> legal@sage.ai</p>
              <p><strong>Support:</strong> support@sage.ai</p>
              <p><strong>Address:</strong> Sage.ai Legal Department, [Your Business Address]</p>
            </div>
            
            <p className="mt-4 text-sm text-gray-600">
              These Terms are effective as of the date listed above and supersede all prior agreements.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Terms;
