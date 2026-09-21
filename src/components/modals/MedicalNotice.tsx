import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'rhl_retail_medical_notice_accepted';

interface MedicalNoticeProps {
  onClose?: () => void;
}

export const MedicalNotice: React.FC<MedicalNoticeProps> = ({ onClose }) => {
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Show every new browser session (sessionStorage clears on tab close)
    const alreadySeen = sessionStorage.getItem(STORAGE_KEY);
    if (!alreadySeen) {
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    if (checked) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      setVisible(false);
      onClose?.();
    }
  };

  const handleExit = () => {
    setVisible(false);
    onClose?.();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/65 z-[99999] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-6 fade-in duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-6 rounded-t-2xl relative">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/15 rounded-xl flex items-center justify-center text-2xl">
              🌿
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight">
                Medical Responsibility<br />
                & Health Awareness Notice
              </h2>
            </div>
          </div>
          <button
            onClick={handleExit}
            className="absolute top-3 right-3 w-8 h-8 bg-white/20 hover:bg-white/35 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close notice"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-7 text-center space-y-4">
          <p className="text-base text-gray-700">
            At <strong>Ray's Healthy Living</strong>, we respect the medical profession.
          </p>
          
          <p className="text-sm text-gray-600 leading-relaxed">
            Medical doctors are trained to diagnose, interpret lab results, understand
            pathology, and manage disease safely and effectively.
          </p>

          <div className="flex flex-wrap gap-2 justify-center my-4">
            <span className="bg-gray-100 border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              We do not diagnose
            </span>
            <span className="bg-gray-100 border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              We do not treat
            </span>
            <span className="bg-gray-100 border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              We do not cure disease
            </span>
          </div>

          <p className="text-sm text-gray-700">
            All information and products provided are for <strong>educational</strong> and{' '}
            <strong>wellness support purposes only.</strong>
          </p>

          <p className="text-sm text-gray-700 leading-relaxed">
            If you are experiencing pain, discomfort, persistent symptoms, or uncertainty
            about your health,{' '}
            <strong>consult a licensed healthcare provider</strong> before using any
            supplement.
          </p>

          <p className="text-base font-semibold text-gray-800">
            Your doctor is your primary health authority.
          </p>

          <label className="flex items-start gap-3 cursor-pointer text-left text-sm text-gray-700 select-none mt-6">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-5 h-5 border-2 border-green-500 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
              checked ? 'bg-green-500' : 'bg-white'
            }`}>
              {checked && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span>I have read and understand this notice.</span>
          </label>
        </div>

        {/* Footer */}
        <div className="p-7 pt-4 flex flex-col gap-3">
          <Button
            onClick={handleClose}
            disabled={!checked}
            className={`w-full py-3 text-base font-bold transition-all ${
              checked 
                ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue to Products
          </Button>
          
          <button
            onClick={handleExit}
            className="text-green-600 hover:text-green-700 text-sm underline transition-colors"
          >
            Exit / Return to Store
          </button>
        </div>
      </div>
    </div>
  );
};