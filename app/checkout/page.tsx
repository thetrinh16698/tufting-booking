'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const service = searchParams.get('service') || 'Tufting Service';
  const time = searchParams.get('time') || new Date().toISOString();
  
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Simulate checkout processing
    setTimeout(() => {
      alert('Booking created successfully! (This is a mock checkout)');
      setIsProcessing(false);
      // In a real implementation, you would redirect to a success page
      window.location.href = '/account/my-bookings';
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="border rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Booking Summary</h2>
        <div className="space-y-2">
          <p><strong>Service:</strong> {service}</p>
          <p><strong>Time:</strong> {new Date(time).toLocaleString()}</p>
          <p><strong>Price:</strong> $75.00</p>
        </div>
      </div>

      <div className="border rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
        <p className="text-gray-600 mb-4">
          This is a mock checkout page. In a real implementation, you would integrate with Stripe or another payment provider.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Card Number</label>
            <input 
              type="text" 
              placeholder="1234 5678 9012 3456"
              className="w-full p-3 border rounded-lg"
              disabled
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Expiry Date</label>
              <input 
                type="text" 
                placeholder="MM/YY"
                className="w-full p-3 border rounded-lg"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">CVC</label>
              <input 
                type="text" 
                placeholder="123"
                className="w-full p-3 border rounded-lg"
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={isProcessing}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'Processing...' : 'Complete Booking'}
      </button>
    </div>
  );
}
