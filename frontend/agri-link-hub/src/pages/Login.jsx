import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", role: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.email) {
      toast.error("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Enter a valid email address");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (!formData.role) {
      toast.error("Please select a role");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload = { ...formData };

      const response = await axios.post(`http://localhost:8000/api/login/${formData.role}`, payload);

      toast.success(response.data.message || "Signed in");

      // redirect based on role
      console.log(response.data.user);
      navigate("/" + response.data.user);
    } catch (err) {
      toast.error(err.response?.data?.message || "Sign in failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{ backgroundColor: "#6ca880ff" }}
    >
      <Toaster position="top-right" />

      {/* Decorative SVG accents */}
      <svg
        className="absolute -top-24 -right-24 opacity-30 pointer-events-none"
        width="520"
        height="520"
        viewBox="0 0 520 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="260" cy="260" r="260" fill="#E6FFEF" />
      </svg>

      <svg
        className="absolute -bottom-32 -left-32 opacity-20 pointer-events-none"
        width="420"
        height="420"
        viewBox="0 0 420 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="420" height="420" rx="30" fill="#F6FFF8" />
      </svg>

      <div className="w-full max-w-5xl relative z-10">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl flex items-center justify-center shadow-md">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-neutral-800">
              Agri<span className="text-emerald-700">Link Hub</span>
            </span>
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">
          {/* Left Visual Panel */}
          <div className="hidden md:flex flex-col justify-between p-8 bg-[linear-gradient(180deg,#ffffff,rgba(240,255,245,0.6))]">
            <div>
              <h3 className="text-2xl font-extrabold text-emerald-800">Welcome back</h3>
              <p className="text-sm text-neutral-600 mt-2 max-w-xs">
                Sign in to manage your listings, orders, and logistics — built for farmers and agri-businesses.
              </p>
            </div>

            <div className="mt-6">
              <img
                src="https://as2.ftcdn.net/v2/jpg/06/45/96/19/1000_F_645961919_oRvkwIWwIoJPVIawam6Q16wbvGKN3tL9.jpg"
                alt="farm workers"
                className="rounded-xl w-full object-cover h-56 shadow-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                <div className="text-xs text-emerald-700 font-semibold">Secure</div>
                <div className="text-sm text-neutral-600 mt-1">Your data is safe</div>
              </div>
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                <div className="text-xs text-emerald-700 font-semibold">Connected</div>
                <div className="text-sm text-neutral-600 mt-1">Buyers & carriers</div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="p-6 md:p-8">
            <div className="px-1 py-1">
              <div className="px-3 py-2 text-center border-b border-gray-100">
                <h2 className="text-xl font-semibold text-neutral-800">Welcome Back</h2>
                <p className="text-sm text-neutral-500 mt-1">Sign in to access your dashboard</p>
              </div>
            </div>

            <div className="p-1 mt-5">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-11 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
                      placeholder="farmer@example.com"
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="text-sm font-medium text-neutral-700">
                      Password
                    </label>
                    <Link to="/forgot-password" className="text-sm text-emerald-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-11 pr-11 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />

                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Role Selection */}
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-neutral-700 mb-2">
                    Select Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  >
                    <option value="">-- Choose a role --</option>
                    <option value="farmer">Farmer</option>
                    <option value="industry">Industry</option>
                    <option value="logistics">Logistics</option>
                  </select>
                </div>

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-30" />
                        <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" className="opacity-90" />
                      </svg>
                    ) : null}
                    <span>{isSubmitting ? "Signing in..." : "Sign In"}</span>
                    {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-neutral-600">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-emerald-600 font-medium hover:underline">
                    Create one
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-neutral-500 text-xs mt-6">
          By signing in, you agree to our{" "}
          <Link to="/terms" className="text-emerald-600 hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-emerald-600 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}