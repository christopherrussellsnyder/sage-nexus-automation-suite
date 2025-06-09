
import { Brain } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">Sage.ai</span>
            </div>
            <p className="text-gray-600">
              AI-powered copywriting that analyzes top-performing content across all industries.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="/features" className="hover:text-gray-900">Features</a></li>
              <li><a href="/pricing" className="hover:text-gray-900">Pricing</a></li>
              <li><a href="/dashboard" className="hover:text-gray-900">Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="/about" className="hover:text-gray-900">About</a></li>
              <li><a href="/contact" className="hover:text-gray-900">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="/privacy" className="hover:text-gray-900">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-gray-900">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>&copy; 2024 Sage.ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
