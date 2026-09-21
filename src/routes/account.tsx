import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, User, AlertCircle, MapPin, ShoppingBag, CreditCard, Truck, ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/account")({
  component: AccountPage,
});

type TabType = "profile" | "address" | "orders" | "payments" | "tracking";

function AccountPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const userData = localStorage.getItem("user");

    if (!token) {
      navigate({ to: "/auth/login" });
      return;
    }

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        navigate({ to: "/auth/login" });
      }
    }
    
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    navigate({ to: "/" });
  };

  const menuItems = [
    { id: "profile" as TabType, label: "My Profile", icon: User },
    { id: "address" as TabType, label: "Addresses", icon: MapPin },
    { id: "orders" as TabType, label: "My Orders", icon: ShoppingBag },
    { id: "payments" as TabType, label: "Payments & Invoices", icon: CreditCard },
    { id: "tracking" as TabType, label: "Track Orders", icon: Truck },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 text-center mb-4">Session Expired</h2>
          <p className="text-gray-600 text-center mb-6">Please log in again to continue.</p>
          <Button
            onClick={() => navigate({ to: "/auth/login" })}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container-rhl max-w-7xl mx-auto">
        {/* Top User Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-md">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user?.name || "User"}</h1>
                <p className="text-gray-600">{user?.email || "No email"}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Layout - Sidebar + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
              {/* Mobile Toggle */}
              <div className="lg:hidden p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Menu</h3>
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>

              {/* Menu Items */}
              <nav className={`${sidebarOpen ? "block" : "hidden"} lg:block`}>
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full px-6 py-4 flex items-center gap-3 font-medium transition-all border-l-4 ${
                        isActive
                          ? "bg-green-50 text-green-700 border-green-600 shadow-sm"
                          : "text-gray-700 border-transparent hover:bg-gray-50"
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {isActive && <ChevronRight className="h-5 w-5" />}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-8">
              {activeTab === "profile" && <ProfileContent user={user} />}
              {activeTab === "address" && <AddressContent user={user} />}
              {activeTab === "orders" && <OrdersContent user={user} />}
              {activeTab === "payments" && <PaymentsContent user={user} />}
              {activeTab === "tracking" && <TrackingContent user={user} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Profile Content Component
function ProfileContent({ user }: { user: any }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Full Name</h3>
          <p className="text-2xl font-bold text-gray-900">{user?.name || "Not provided"}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Email Address</h3>
          <p className="text-lg font-medium text-gray-900 break-all">{user?.email || "Not provided"}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Phone Number</h3>
          <p className="text-lg font-medium text-gray-900">{user?.phone || "Not provided"}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Account Type</h3>
          <p className="text-lg font-medium text-gray-900 capitalize">{user?.role || "Customer"}</p>
        </div>
      </div>
      <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 font-medium">✅ Your account is verified and active</p>
      </div>
    </div>
  );
}

// Address Content Component
function AddressContent({ user }: { user: any }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">
          + Add New Address
        </button>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 font-medium">No addresses saved yet</p>
        <p className="text-gray-500 text-sm mt-2">Add a delivery address to make checkout faster</p>
      </div>
    </div>
  );
}

// Orders Content Component
function OrdersContent({ user }: { user: any }) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://ray-wholsell.onrender.com';
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/retailer-orders/my-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const downloadInvoice = async (orderId: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/orders/retailer-invoice/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Cannot download invoice yet. Order not confirmed.');
        return;
      }

      // Generate PDF invoice (simple HTML to PDF)
      generateInvoicePDF(data.invoice);
    } catch (error) {
      console.error('Failed to download invoice:', error);
    }
  };

  const generateInvoicePDF = (invoice: any) => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .invoice { max-width: 800px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #16a34a; padding-bottom: 20px; }
          .header h1 { color: #16a34a; margin: 0; }
          .details { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
          .section { margin: 20px 0; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          th { background: #f3f4f6; padding: 10px; text-align: left; border-bottom: 2px solid #e5e7eb; }
          td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
          .total-section { text-align: right; margin-top: 20px; }
          .final-total { font-size: 18px; font-weight: bold; color: #16a34a; }
        </style>
      </head>
      <body>
        <div class="invoice">
          <div class="header">
            <h1>INVOICE</h1>
            <p><strong>Order ID:</strong> ${invoice.orderId}</p>
            <p><strong>Invoice Date:</strong> ${invoice.invoiceDate}</p>
            <p><strong>Due Date:</strong> ${invoice.dueDate}</p>
          </div>

          <div class="details">
            <div>
              <h3>Bill To</h3>
              <p><strong>${invoice.customer.name}</strong></p>
              <p>${invoice.customer.email}</p>
              <p>${invoice.customer.phone}</p>
            </div>
            <div>
              <h3>Shipping Address</h3>
              <p>${invoice.shippingAddress.firstName} ${invoice.shippingAddress.lastName}</p>
              <p>${invoice.shippingAddress.street}</p>
              <p>${invoice.shippingAddress.city}, ${invoice.shippingAddress.state} ${invoice.shippingAddress.zip}</p>
            </div>
          </div>

          <div class="section">
            <h3>Order Items</h3>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${invoice.items.map((item: any) => `
                  <tr>
                    <td>${item.productName}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.retailPrice.toFixed(2)}</td>
                    <td>$${item.lineTotal.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="total-section">
            <p><strong>Subtotal:</strong> $${invoice.pricing.subtotal.toFixed(2)}</p>
            <p><strong>Shipping:</strong> $${invoice.pricing.shippingCost.toFixed(2)}</p>
            <p><strong>Tax:</strong> $${invoice.pricing.tax.toFixed(2)}</p>
            <p class="final-total">TOTAL DUE: $${invoice.pricing.finalTotal.toFixed(2)}</p>
          </div>

          <div class="section" style="margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 12px;">
            <p>© Ray's Healthy Living - 70 Solomons Island Rd S, Prince Frederick, MD 20678</p>
            <p>Thank you for your business!</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'paid':
        return 'bg-purple-100 text-purple-800';
      case 'processing':
        return 'bg-indigo-100 text-indigo-800';
      case 'shipped':
        return 'bg-cyan-100 text-cyan-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return '⏳ Pending Review';
      case 'confirmed':
        return '✓ Confirmed';
      case 'paid':
        return '✓ Paid';
      case 'processing':
        return '📦 Processing';
      case 'shipped':
        return '🚚 Shipped';
      case 'delivered':
        return '✓ Delivered';
      case 'cancelled':
        return '✕ Cancelled';
      default:
        return status;
    }
  };

  if (loadingOrders) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
        <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
          <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">No orders yet</p>
          <p className="text-gray-500 text-sm mt-2">Start shopping to see your orders here</p>
          <a
            href="/shop"
            className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
          >
            Browse Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders ({orders.length})</h2>

      <div className="space-y-4">
        {orders.map((order) => {
          // Calculate line total for each item
          const orderTotal = order.total || 0;
          const itemCount = order.items?.length || 0;
          
          return (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Order Summary */}
              <div
                className="p-6 bg-gradient-to-r from-gray-50 to-white cursor-pointer flex items-center justify-between"
                onClick={() =>
                  setExpandedOrder(expandedOrder === order._id ? null : order._id)
                }
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-bold text-gray-900">#{order.orderNumber}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    ${orderTotal.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">{itemCount} items</p>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedOrder === order._id && (
                <div className="p-6 border-t border-gray-200 bg-gray-50 space-y-4">
                  {/* Order Items */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
                    <div className="bg-white rounded p-4 space-y-2">
                      {order.items?.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {item.product?.name || 'Product'} × {item.quantity}
                          </span>
                          <span className="font-semibold text-gray-900">
                            ${(item.priceAtOrder * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Details */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Pricing Details</h4>
                    <div className="bg-white rounded p-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal:</span>
                        <span>${(order.subtotal || 0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping:</span>
                        <span>${(order.shippingCost || 0).toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 flex justify-between font-bold">
                        <span>Total:</span>
                        <span className="text-green-600">
                          ${orderTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Shipping To</h4>
                    <div className="bg-white rounded p-4 text-sm text-gray-600">
                      <p>{order.shippingAddress?.fullName}</p>
                      <p>{order.shippingAddress?.street}</p>
                      <p>
                        {order.shippingAddress?.city}, {order.shippingAddress?.state}{' '}
                        {order.shippingAddress?.zipCode}
                      </p>
                    </div>
                  </div>

                  {/* Admin Notes */}
                  {order.adminNotes && (
                    <div className="bg-blue-50 rounded p-4">
                      <h4 className="font-semibold text-blue-900 mb-2 text-sm">Admin Notes:</h4>
                      <p className="text-sm text-blue-800">{order.adminNotes}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    {order.status === 'pending' && (
                      <div className="flex-1 px-4 py-2 bg-yellow-50 text-yellow-800 rounded-lg text-sm text-center font-semibold">
                        ⏳ Awaiting Admin Confirmation
                      </div>
                    )}
                    {order.status === 'confirmed' && (
                      <div className="flex-1 px-4 py-2 bg-blue-50 text-blue-800 rounded-lg text-sm text-center font-semibold">
                        ✓ Order Confirmed - Ready for Payment
                      </div>
                    )}
                    {['paid', 'processing', 'shipped', 'delivered'].includes(order.status) && (
                      <div className="flex-1 px-4 py-2 bg-green-50 text-green-800 rounded-lg text-sm text-center font-semibold">
                        ✓ Order {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Payments Content Component
function PaymentsContent({ user }: { user: any }) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(true);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://ray-wholsell.onrender.com';
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    fetchPaymentInfo();
  }, []);

  const fetchPaymentInfo = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/retailer-orders/my-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Failed to fetch payment info:', error);
    } finally {
      setLoadingPayments(false);
    }
  };

  // Calculate totals
  const confirmedOrders = orders.filter((o) =>
    ['confirmed', 'paid', 'processing', 'shipped', 'delivered'].includes(o.status)
  );
  const totalSpent = confirmedOrders.reduce(
    (sum, o) => sum + (o.total || 0),
    0
  );
  const unpaidAmount = confirmedOrders
    .filter((o) => o.status !== 'paid' && o.status !== 'processing' && o.status !== 'shipped' && o.status !== 'delivered')
    .reduce((sum, o) => sum + (o.total || 0), 0);

  if (loadingPayments) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading payment information...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Payments & Invoices</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <p className="text-sm text-gray-600 font-medium">Total Spent</p>
          <p className="text-3xl font-bold text-blue-700 mt-2">
            ${totalSpent.toFixed(2)}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <p className="text-sm text-gray-600 font-medium">Total Orders</p>
          <p className="text-3xl font-bold text-green-700 mt-2">
            {confirmedOrders.length}
          </p>
        </div>
        <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
          <p className="text-sm text-gray-600 font-medium">Unpaid Amount</p>
          <p className="text-3xl font-bold text-orange-700 mt-2">
            ${unpaidAmount.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Payment Status */}
      {confirmedOrders.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
          <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">No confirmed orders</p>
          <p className="text-gray-500 text-sm mt-2">
            Payment invoices will appear here after orders are confirmed by admin
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {confirmedOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-between"
            >
              <div className="flex-1">
                <p className="font-bold text-gray-900">#{order.orderNumber}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right mr-6">
                <p className="text-xl font-bold text-gray-900">
                  ${(order.total || 0).toFixed(2)}
                </p>
                <p
                  className={`text-sm font-semibold mt-1 ${
                    order.status === 'paid' || order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered'
                      ? 'text-green-600'
                      : 'text-orange-600'
                  }`}
                >
                  {order.status === 'paid' || order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? '✓ Paid' : '⏳ Pending Payment'}
                </p>
              </div>
              <a 
                href={`/my-orders`}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
              >
                View Order
              </a>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-800 font-medium text-sm">
          ℹ️ After your order is confirmed by admin, an invoice will be generated. You can
          download it from your Orders page.
        </p>
      </div>
    </div>
  );
}

// Tracking Content Component
function TrackingContent({ user }: { user: any }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Track Your Orders</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Order Number</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter your order ID (e.g., ORD-123456)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
          />
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">
            Track
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
        <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 font-medium">No active shipments</p>
        <p className="text-gray-500 text-sm mt-2">Enter an order number above to track your delivery</p>
      </div>
    </div>
  );
}
