import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'rhl_retail_cookies_accepted';

interface CookieNoticeProps {
  onClose?: () => void;
}

export const CookieNotice: React.FC<CookieNoticeProps> = ({ onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const alreadyAccepted = localStorage.getItem(STORAGE_KEY);
    if (!alreadyAccepted) {
      // Show after a short delay for better UX
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
    onClose?.();
  };

  const handleDecline = () => {
    // Don't store anything for decline - will show again next time
    setVisible(false);
    onClose?.();
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Cookie className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-base">Cookie Policy</h3>
            </div>
            <button
              onClick={handleDecline}
              className="w-6 h-6 bg-white/20 hover:bg-white/35 rounded-full flex items-center justify-center transition-colors"
              aria-label="Close cookie notice"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          <p className="text-sm text-gray-700 leading-relaxed">
            We use cookies to enhance your browsing experience, provide personalized content, 
            and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
          </p>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <h4 className="text-xs font-semibold text-orange-800 mb-2">What we use cookies for:</h4>
            <ul className="text-xs text-orange-700 space-y-1">
              <li>• Essential site functionality</li>
              <li>• Shopping cart and checkout</li>
              <li>• User preferences and settings</li>
              <li>• Analytics and site improvement</li>
            </ul>
          </div>

          <p className="text-xs text-gray-600">
            You can manage your cookie preferences in your browser settings. 
            <a href="/privacy-policy" className="text-orange-600 hover:text-orange-700 underline ml-1">
              View our Privacy Policy
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 pt-0 flex gap-2">
          <Button
            onClick={handleAccept}
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white text-sm font-semibold py-2"
          >
            Accept All
          </Button>
          <Button
            onClick={handleDecline}
            variant="outline"
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-semibold py-2"
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
};