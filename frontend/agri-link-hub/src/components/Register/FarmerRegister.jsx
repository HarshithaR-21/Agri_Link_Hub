import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";


export default function FarmerForm() {
    const location = useLocation();
  const role = location.state?.role;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role,
    name: "",
    contactNumber: "",
    email: "",
    password: "",
    location: {
      village: "",
      district: "",
      state: "",
      pinCode: "",
    },
    farmingType: "",
    profileImage: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["village", "district", "state", "pinCode"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.contactNumber.match(/^[0-9]{10}$/))
      newErrors.contactNumber = "Contact number must be 10 digits.";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Enter a valid email address.";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (!formData.location.village.trim())
      newErrors.village = "Village is required.";
    if (!formData.location.district.trim())
      newErrors.district = "District is required.";
    if (!formData.location.state.trim())
      newErrors.state = "State is required.";
    if (!formData.location.pinCode.match(/^[0-9]{6}$/))
      newErrors.pinCode = "Pin Code must be 6 digits.";
    if (!formData.farmingType)
      newErrors.farmingType = "Please select a farming type.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/api/user/register", formData);
      toast.success("Farmer registered successfully!");
      console.log("Response:", res.data);
      setFormData({
        name: "",
        contactNumber: "",
        email: "",
        password: "",
        location: { village: "", district: "", state: "", pinCode: "" },
        farmingType: "",
        profileImage: "",
      });
      setTimeout(() => {
        navigate(`/login?role=${role}`);
      }, 2000);
      setErrors({});
    } catch (err) {
      toast.error(err.response?.data?.message || "Error registering farmer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-200">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold mb-6 text-green-700">🌱 Farmer Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <h2>Register as {role}</h2>
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-green-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border  rounded-md focus:ring-2  focus:outline-none"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-sm font-medium text-green-700">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full p-2 border  rounded-md focus:ring-2  focus:outline-none"
          />
          {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-green-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border  rounded-md focus:ring-2  focus:outline-none"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-green-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border  rounded-md focus:ring-2  focus:outline-none"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Location */}
        <div className="grid grid-cols-2 gap-4">
          {["village", "district", "state", "pinCode"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-green-700 capitalize">{field}</label>
              <input
                type="text"
                name={field}
                value={formData.location[field]}
                onChange={handleChange}
                className="w-full p-2 border  rounded-md focus:ring-2  focus:outline-none"
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}
        </div>

        {/* Farming Type */}
        <div>
          <label className="block text-sm font-medium text-green-700">Farming Type</label>
          <select
            name="farmingType"
            value={formData.farmingType}
            onChange={handleChange}
            className="w-full p-2 border  rounded-md focus:ring-2  focus:outline-none"
          >
            <option value="">Select type</option>
            <option value="organic">Organic</option>
            <option value="conventional">Conventional</option>
          </select>
          {errors.farmingType && <p className="text-red-500 text-sm mt-1">{errors.farmingType}</p>}
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <button
            type="reset"
            className="px-4 py-2 border border-green-600 text-green-700 rounded-md hover:bg-green-50 transition"
            onClick={() => {
              setFormData({
                name: "",
                contactNumber: "",
                email: "",
                password: "",
                location: { village: "", district: "", state: "", pinCode: "" },
                farmingType: "",
                profileImage: "",
              });
              setErrors({});
            }}
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            {loading ? "Submitting..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}
