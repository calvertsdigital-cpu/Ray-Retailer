import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { products } from "@/data/catalog";
import { useCart } from "@/lib/cart";
import { MapPin, X, Plus, Loader2 } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://ray-wholsell.onrender.com';
const MARKUP_PERCENTAGE = 0.20; // 20% markup for retail

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Ray's Healthy Living" },
      {
        name: "description",
        content: "Complete your Ray's Healthy Living order. Professional checkout experience.",
      },
      { property: "og:title", content: "Checkout | Ray's Healthy Living" },
      { property: "og:description", content: "Secure checkout for your natural wellness order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

interface Address {
  _id?: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

interface OrderItem {
  product: (typeof products)[number];
  qty: number;
  wholesalePrice: number;
  retailPrice: number;
}

function CheckoutPage() {
  const navigate = useNavigate();
  const { lines, hydrated, clear } = useCart();

  // State Management
  const [user, setUser] = useState<any>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Address>({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    phone: "",
  });

  // Load user and addresses
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const userData = localStorage.getItem("user");

    if (!token) {
      navigate({ to: "/auth/login" });
      return;
    }

    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }

    // Load saved addresses (from localStorage for now, will be backend later)
    const savedAddrs = localStorage.getItem("savedAddresses");
    if (savedAddrs) {
      try {
        setSavedAddresses(JSON.parse(savedAddrs));
      } catch (error) {
        console.error("Failed to load addresses:", error);
      }
    }
  }, [navigate]);

  // Process cart items
  const items: OrderItem[] = lines
    .map((line) => {
      const product = products.find((p) => p.slug === line.slug);
      if (!product) return null;

      // Assume backend sends sellPrice as wholesale price
      const wholesalePrice = product.sellPrice || product.price || 0;
      const retailPrice = wholesalePrice * (1 + MARKUP_PERCENTAGE);

      return {
        product,
        qty: line.qty,
        wholesalePrice,
        retailPrice,
      };
    })
    .filter((x): x is OrderItem => x !== null);

  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);

  // Calculate totals
  const subtotal = items.reduce((sum, i) => sum + i.retailPrice * i.qty, 0);
  const markupAmount = items.reduce((sum, i) => sum + (i.retailPrice - i.wholesalePrice) * i.qty, 0);
  const total = subtotal;

  if (hydrated && items.length === 0) {
    return (
      <div className="container-rhl section-y max-w-lg text-center">
        <h1 className="heading-1">Checkout</h1>
        <p className="mt-3 text-muted-foreground">Your cart is empty.</p>
        <Button asChild className="mt-6">
          <Link to="/shop">Shop products</Link>
        </Button>
      </div>
    );
  }

  const handleAddressChange = (field: keyof Address, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSaveAddress = () => {
    if (!formData.firstName || !formData.street || !formData.city || !formData.state || !formData.zip) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newAddress: Address = { ...formData };
    const allAddresses = [...savedAddresses, newAddress];
    setSavedAddresses(allAddresses);
    localStorage.setItem("savedAddresses", JSON.stringify(allAddresses));
    setSelectedAddress(newAddress);
    setShowAddressForm(false);
    setFormData({
      firstName: "",
      lastName: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "United States",
      phone: "",
    });
    toast.success("Address saved successfully");
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAddress) {
      toast.error("Please select or add a delivery address");
      return;
    }

    setSubmitting(true);

    try {
      // Prepare order data
      const orderData = {
        userId: user?._id,
        email: user?.email,
        phone: selectedAddress.phone || user?.phone,
        shippingAddress: selectedAddress,
        items: items.map((item) => ({
          productId: item.product.slug,
          productName: item.product.name,
          quantity: item.qty,
          wholesalePrice: item.wholesalePrice,
          retailPrice: item.retailPrice,
          lineTotal: item.retailPrice * item.qty,
        })),
        pricing: {
          subtotal: parseFloat(subtotal.toFixed(2)),
          markupAmount: parseFloat(markupAmount.toFixed(2)),
          markupPercentage: MARKUP_PERCENTAGE * 100,
          total: parseFloat(total.toFixed(2)),
          shippingCost: 0, // Will be added by admin
          finalTotal: parseFloat(total.toFixed(2)),
        },
        status: "pending", // Waiting for admin confirmation
      };

      // Send to backend
      const response = await fetch(`${BACKEND_URL}/api/orders/create-retailer-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create order");
      }

      const orderId = data.orderId || data._id;

      // Store order ID locally
      localStorage.setItem("lastOrderId", orderId);

      // Clear cart
      clear();

      // Show success message
      toast.success(`Order submitted! Order ID: ${orderId}`);

      // Redirect to order confirmation page
      setTimeout(() => {
        navigate({ to: `/account?tab=orders&orderId=${orderId}` });
      }, 1500);
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to submit order");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-rhl section-y">
      <h1 className="heading-1 mb-8">Checkout</h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
        {/* Main Form */}
        <form onSubmit={handleSubmitOrder} className="space-y-6">
          {/* Contact Information */}
          <fieldset className="rounded-xl border border-border bg-card p-6">
            <legend className="px-1 text-base font-semibold">Contact Information</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5 sm:col-span-2">
                <Label htmlFor="co-email">Email Address</Label>
                <Input
                  id="co-email"
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="co-phone">Phone</Label>
                <Input id="co-phone" type="tel" defaultValue={user?.phone || ""} required />
              </div>
            </div>
          </fieldset>

          {/* Delivery Address */}
          <fieldset className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <legend className="px-1 text-base font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Delivery Address
              </legend>
            </div>

            {/* Saved Addresses */}
            {savedAddresses.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Saved Addresses</p>
                <div className="space-y-2">
                  {savedAddresses.map((addr, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedAddress(addr)}
                      className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                        selectedAddress === addr
                          ? "border-green-600 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <p className="font-semibold text-gray-900">
                        {addr.firstName} {addr.lastName}
                      </p>
                      <p className="text-sm text-gray-600">{addr.street}</p>
                      <p className="text-sm text-gray-600">
                        {addr.city}, {addr.state} {addr.zip}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Address Form */}
            {!showAddressForm ? (
              <button
                type="button"
                onClick={() => setShowAddressForm(true)}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 font-medium flex items-center justify-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Add New Address
              </button>
            ) : (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input
                      id="first-name"
                      value={formData.firstName}
                      onChange={(e) => handleAddressChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input
                      id="last-name"
                      value={formData.lastName}
                      onChange={(e) => handleAddressChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    value={formData.street}
                    onChange={(e) => handleAddressChange("street", e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleAddressChange("city", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleAddressChange("state", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      value={formData.zip}
                      onChange={(e) => handleAddressChange("zip", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleAddressChange("phone", e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="button" onClick={handleSaveAddress} variant="default" className="flex-1">
                    Save Address
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setShowAddressForm(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </fieldset>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg"
            disabled={submitting || !selectedAddress}
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Order...
              </>
            ) : (
              "Submit Order Request"
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            ✓ No payment taken here. Our team confirms availability and adds shipping cost before final charge.
          </p>
        </form>

        {/* Order Summary */}
        <aside className="h-fit rounded-xl border border-border bg-secondary p-6 lg:sticky lg:top-28">
          <h2 className="text-base font-semibold mb-4">Order Summary</h2>

          {/* Items */}
          <div className="space-y-3 text-sm mb-6">
            {items.map(({ product, qty, retailPrice }) => (
              <div key={product.slug} className="flex justify-between gap-3">
                <div className="flex-1">
                  <p className="text-muted-foreground">{product.name}</p>
                  <p className="text-xs text-gray-500">× {qty}</p>
                </div>
                <p className="font-medium">${(retailPrice * qty).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="border-t border-border pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal ({itemCount} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-muted-foreground bg-blue-50 -mx-6 px-6 py-2">
              <span className="flex items-center gap-2">
                Retail Markup (20%)
                <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded">Included</span>
              </span>
              <span>${markupAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="text-xs text-orange-600 font-medium">Added by admin</span>
            </div>
          </div>

          {/* Final Total */}
          <div className="border-t border-border mt-4 pt-4 flex justify-between items-center">
            <span className="font-semibold">Order Total</span>
            <span className="text-2xl font-bold text-green-600">${total.toFixed(2)}</span>
          </div>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            Shipping will be added after admin review
          </p>

          <Link to="/cart" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
            ← Back to cart
          </Link>
        </aside>
      </div>
    </div>
  );
}
