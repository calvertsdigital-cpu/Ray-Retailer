import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { UserPlus, AlertCircle, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://ray-wholsell.onrender.com';

export const Route = createFileRoute("/auth/signup")({
  component: SignupPage,
});

// Toast Component
const Toast = ({ message, type, onClose, show }: any) => {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        background: type === "success" ? "#10b981" : "#ef4444",
        color: "white",
        padding: "16px 24px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        zIndex: 1000,
        maxWidth: "400px",
      }}
    >
      <div>
        {type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
      </div>
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          cursor: "pointer",
          marginLeft: "auto",
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
};

function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"register" | "otp">("register");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "retailer",
  });
  const [otp, setOtp] = useState("");
  const [registeredUserId, setRegisteredUserId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message: string, type: string = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.email &&
      formData.phone.length === 10 &&
      ["retailer", "wholesaler", "user"].includes(formData.role) &&
      formData.password.length >= 6
    );
  };

  const handleChange = (name: string, value: string) => {
    if (name === "phone") {
      setFormData({ ...formData, phone: value.replace(/\D/g, "").slice(0, 10) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      if (data.requiresVerification) {
        setRegisteredUserId(data.userId);
        setStep("otp");
        showToast("OTP sent to your email!", "success");
      } else if (data.token) {
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        showToast("Signup successful!", "success");
        setTimeout(() => navigate({ to: "/account" }), 1500);
      }
    } catch (err: any) {
      const errorMessage = err.message || "Signup failed. Please try again.";
      setError(errorMessage);
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      showToast("Please enter a valid 6-digit OTP", "error");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/verify-email-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: registeredUserId,
          otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      const { token, user } = data;
      if (token) {
        localStorage.setItem("userToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        showToast("Email verified successfully!", "success");
        setTimeout(() => navigate({ to: "/account" }), 1500);
      }
    } catch (err: any) {
      const errorMessage = err.message || "OTP verification failed";
      setError(errorMessage);
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/auth/resend-verification-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }

      showToast("OTP resent successfully!", "success");
    } catch (err: any) {
      showToast(err.message || "Failed to resend OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center py-12 px-4">
      <Toast message={toast.message} type={toast.type} show={toast.show} onClose={() => {}} />

      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src="/favicon.png" alt="Ray's Healthy Living" className="h-16 w-auto" />
          </div>

          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            {step === "register" ? "Create Your Account" : "Verify Your Email"}
          </h1>
          <p className="text-center text-gray-600 mb-8">
            {step === "register"
              ? "Join Ray's Healthy Living community"
              : "Enter the OTP sent to your email"}
          </p>

          {step === "register" ? (
            <form onSubmit={handleSignup} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Full Name */}
              <div>
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                  className="mt-2"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  className="mt-2"
                />
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone" className="text-gray-700 font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="1234567890"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  required
                  pattern="\d{10}"
                  className="mt-2"
                />
                <p className="text-gray-500 text-sm mt-1">10 digits required</p>
              </div>

              {/* Role */}
              <div>
                <Label htmlFor="role" className="text-gray-700 font-medium">
                  Account Type
                </Label>
                <Select value={formData.role} onValueChange={(value) => handleChange("role", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retailer">Retailer</SelectItem>
                    <SelectItem value="wholesaler">Wholesaler</SelectItem>
                    <SelectItem value="user">Customer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                  minLength={6}
                  className="mt-2"
                />
                {formData.password && formData.password.length < 6 && (
                  <p className="text-red-600 text-sm mt-1">Minimum 6 characters required</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading || !isFormValid()}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-colors mt-6"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div>
                <Label htmlFor="otp" className="text-gray-700 font-medium">
                  Enter OTP
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  required
                  maxLength={6}
                  className="mt-2 text-center text-2xl tracking-widest"
                />
                <p className="text-gray-500 text-sm mt-1">Check your email for the OTP code</p>
              </div>

              <Button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-colors mt-6"
              >
                {loading ? "Verifying..." : "Verify Email"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleResendOTP}
                disabled={loading}
                className="w-full"
              >
                Didn't receive OTP? Resend
              </Button>
            </form>
          )}

          {/* Links */}
          <div className="mt-6 text-center space-y-2">
            {step === "register" && (
              <p className="text-gray-600">
                Already have an account?{" "}
                <a
                  href="/auth/login"
                  className="font-semibold text-green-600 hover:text-green-700 transition-colors"
                >
                  Sign in
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Protected by secure SSL encryption</p>
        </div>
      </div>
    </div>
  );
}
