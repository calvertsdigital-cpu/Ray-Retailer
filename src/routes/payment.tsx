import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://ray-wholsell.onrender.com';

export const Route = createFileRoute("/payment")({
  head: () => ({
    meta: [
      { title: "Payment | Ray's Healthy Living" },
      { name: "description", content: "Complete your payment securely" },
    ],
  }),
  component: PaymentPage,
});

function PaymentPage() {
  const navigate = useNavigate();
  const searchParams = useSearch({ from: "/payment" });
  const orderId = (searchParams as any)?.orderId;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  const token = localStorage.getItem('userToken');

  useEffect(() => {
    if (!token) {
      navigate({ to: "/auth/login" });
      return;
    }

    if (!orderId) {
      navigate({ to: "/account?tab=payments" });
      return;
    }

    fetchOrderDetails();
  }, [orderId, token, navigate]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/orders/retailer-order/${orderId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();

      if (!response.ok || !data.order) {
        toast.error("Order not found");
        navigate({ to: "/account?tab=payments" });
        return;
      }

      // Only allow payment if order is confirmed
      if (data.order.status !== 'confirmed') {
        toast.error("This order cannot be paid yet. Awaiting admin confirmation.");
        navigate({ to: "/account?tab=payments" });
        return;
      }

      setOrder(data.order);
    } catch (error) {
      console.error("Error fetching order:", error);
      toast.error("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (field: string, value: string) => {
    // Format card number (add spaces every 4 digits)
    if (field === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (value.length > 19) value = value.slice(0, 19);
    }

    // Format expiry
    if (field === 'expiryMonth' && value.length > 2) {
      value = value.slice(0, 2);
    }
    if (field === 'expiryYear' && value.length > 4) {
      value = value.slice(0, 4);
    }

    // CVV only numbers
    if (field === 'cvv' && value.length > 4) {
      value = value.slice(0, 4);
    }

    setFormData({ ...formData, [field]: value });
  };

  const validateCardForm = () => {
    if (!formData.cardName.trim()) {
      toast.error("Please enter cardholder name");
      return false;
    }
    if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      toast.error("Please enter a valid 16-digit card number");
      return false;
    }
    if (!formData.expiryMonth || !formData.expiryYear) {
      toast.error("Please enter expiry date");
      return false;
    }
    if (formData.cvv.length !== 3 && formData.cvv.length !== 4) {
      toast.error("Please enter a valid CVV");
      return false;
    }
    return true;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCardForm()) return;

    setProcessing(true);

    try {
      // In production, you would use Stripe.js to tokenize the card
      // For now, we'll send the payment request to backend
      // Backend should use Stripe to process the payment securely

      const response = await fetch(
        `${BACKEND_URL}/api/orders/process-retailer-payment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            orderId: order._id,
            amount: order.pricing.finalTotal,
            currency: 'usd',
            paymentMethod: paymentMethod,
            cardDetails: {
              name: formData.cardName,
              last4: formData.cardNumber.slice(-4),
              expiry: `${formData.expiryMonth}/${formData.expiryYear}`,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Payment failed');
      }

      // Payment successful
      toast.success('Payment processed successfully!');
      
      // Clear form
      setFormData({
        cardName: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
      });

      // Redirect to success page or orders page
      setTimeout(() => {
        navigate({ to: `/account?tab=orders&orderId=${orderId}&status=paid` });
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error instanceof Error ? error.message : 'Payment processing failed');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container-rhl section-y max-w-lg">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">
            Unable to load order details. Please go back and try again.
          </p>
          <Button onClick={() => navigate({ to: "/account?tab=payments" })}>
            Back to Payments
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-rhl section-y">
      <h1 className="heading-1 mb-8">Payment</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Payment Form */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📋</span> Order Summary
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-600">Order ID:</span>
                <span className="font-monospace font-semibold text-gray-900 ml-2">
                  {order.orderId}
                </span>
              </p>
              <p>
                <span className="text-gray-600">Items:</span>
                <span className="font-semibold text-gray-900 ml-2">{order.items.length}</span>
              </p>
              <p className="border-t border-blue-200 pt-2 mt-2">
                <span className="text-gray-600">Total Amount:</span>
                <span className="text-xl font-bold text-green-600 ml-2">
                  ${order.pricing.finalTotal.toFixed(2)}
                </span>
              </p>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-base font-bold text-gray-900 mb-4">Payment Method</h3>
            <div className="space-y-3">
              <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => setPaymentMethod('card')}
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mr-3"
                />
                <span className="font-medium text-gray-900">💳 Credit/Debit Card</span>
              </label>
            </div>
          </div>

          {/* Card Payment Form */}
          {paymentMethod === 'card' && (
            <form onSubmit={handlePayment} className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Lock className="h-5 w-5 text-green-600" />
                Card Details
              </h3>

              <div className="grid gap-4">
                <div>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    type="text"
                    placeholder="John Doe"
                    value={formData.cardName}
                    onChange={(e) => handleFormChange('cardName', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => handleFormChange('cardNumber', e.target.value.replace(/\D/g, ''))}
                    maxLength={19}
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="expiryMonth">Month</Label>
                    <Input
                      id="expiryMonth"
                      type="text"
                      placeholder="MM"
                      value={formData.expiryMonth}
                      onChange={(e) => handleFormChange('expiryMonth', e.target.value.replace(/\D/g, ''))}
                      maxLength={2}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiryYear">Year</Label>
                    <Input
                      id="expiryYear"
                      type="text"
                      placeholder="YYYY"
                      value={formData.expiryYear}
                      onChange={(e) => handleFormChange('expiryYear', e.target.value.replace(/\D/g, ''))}
                      maxLength={4}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      type="text"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => handleFormChange('cvv', e.target.value.replace(/\D/g, ''))}
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg"
                disabled={processing}
              >
                {processing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Pay ${order.pricing.finalTotal.toFixed(2)}
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                🔒 Your payment is processed securely with Stripe. Your card details are never stored on our servers.
              </p>
            </form>
          )}
        </div>

        {/* Payment Summary Sidebar */}
        <aside className="h-fit rounded-lg border border-gray-200 bg-gray-50 p-6 lg:sticky lg:top-28">
          <h3 className="font-semibold text-gray-900 mb-4">Payment Details</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between pb-3 border-b border-gray-200">
              <span className="text-gray-600">Subtotal:</span>
              <span>${order.pricing.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-gray-200">
              <span className="text-gray-600">Shipping:</span>
              <span>${order.pricing.shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-gray-200">
              <span className="text-gray-600">Tax:</span>
              <span>${order.pricing.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-3 text-base font-bold">
              <span>Total:</span>
              <span className="text-green-600">
                ${order.pricing.finalTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
            <p className="text-xs text-gray-600 mb-2">
              <CheckCircle className="inline h-4 w-4 text-green-600 mr-1" />
              Order confirmed by admin
            </p>
            <p className="text-xs text-gray-600">
              <Lock className="inline h-4 w-4 text-blue-600 mr-1" />
              Secure payment processing
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
