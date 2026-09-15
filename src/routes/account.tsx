import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, User, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/account")({
  component: AccountPage,
});

function AccountPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-cream py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-cream py-12 px-4 flex items-center justify-center">
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
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="container-rhl max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header with User Info */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-md">
                <User className="h-10 w-10 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user?.name || "User"}</h1>
                <p className="text-gray-600 font-medium">{user?.email || "No email"}</p>
                <p className="text-sm text-gray-500 capitalize">
                  {user?.role ? `${user.role} Account` : "Account"}
                </p>
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

          {/* Account Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-xl">👤</span> Account Information
              </h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-semibold text-gray-700 mb-1">Full Name</dt>
                  <dd className="text-lg font-medium text-gray-900">{user?.name || "Not provided"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-gray-700 mb-1">Email Address</dt>
                  <dd className="text-lg font-medium text-gray-900 break-all">{user?.email || "Not provided"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-gray-700 mb-1">Phone Number</dt>
                  <dd className="text-lg font-medium text-gray-900">{user?.phone || "Not provided"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-gray-700 mb-1">Account Type</dt>
                  <dd className="text-lg font-medium text-gray-900 capitalize">{user?.role || "Customer"}</dd>
                </div>
              </dl>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-xl">🛍️</span> Quick Links
              </h2>
              <div className="space-y-3">
                <a
                  href="/shop"
                  className="block px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center font-semibold shadow-md hover:shadow-lg"
                >
                  Browse All Products
                </a>
                <a
                  href="/health-concerns"
                  className="block px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center font-semibold shadow-md hover:shadow-lg"
                >
                  Shop by Health Concerns
                </a>
                <a
                  href="/"
                  className="block px-4 py-3 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition-colors text-center font-semibold shadow-md hover:shadow-lg"
                >
                  Back to Home
                </a>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
            <p className="text-green-800 font-medium">
              ✅ Your account is active and verified
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
