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

// Payments Content Component
function PaymentsContent({ user }: { user: any }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Payments & Invoices</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <p className="text-sm text-gray-600 font-medium">Total Spent</p>
          <p className="text-3xl font-bold text-blue-700 mt-2">$0.00</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <p className="text-sm text-gray-600 font-medium">Total Orders</p>
          <p className="text-3xl font-bold text-green-700 mt-2">0</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
        <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 font-medium">No invoices yet</p>
        <p className="text-gray-500 text-sm mt-2">Your invoices will appear here after you make a purchase</p>
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
