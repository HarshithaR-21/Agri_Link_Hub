import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function IndustryForm() {
  const location = useLocation();
  const role = location.state?.role;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role,
    industryName: "",
    ownerName: "",
    contactNumber: "",
    email: "",
    password: "",
    industryType: "",
    address: {
      street: "",
      village: "",
      city: "",
      district: "",
      state: "",
      pinCode: "",
    },
    licenseNumber: "",
    gstNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // nested address fields
    if (
      ["street", "village", "city", "district", "state", "pinCode"].includes(
        name
      )
    ) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.industryName.trim())
      newErrors.industryName = "Industry name is required.";
    if (!formData.ownerName.trim())
      newErrors.ownerName = "Owner name is required.";
    if (!formData.contactNumber.match(/^[0-9]{10}$/))
      newErrors.contactNumber = "Contact number must be 10 digits.";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Enter a valid email address.";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (!formData.industryType.trim())
      newErrors.industryType = "Please select an industry type.";

    // address validations
    if (!formData.address.street.trim())
      newErrors.street = "Street is required.";
    if (!formData.address.village.trim())
      newErrors.village = "Village is required.";
    if (!formData.address.city.trim()) newErrors.city = "City is required.";
    if (!formData.address.district.trim())
      newErrors.district = "District is required.";
    if (!formData.address.state.trim())
      newErrors.state = "State is required.";
    if (!formData.address.pinCode.match(/^[0-9]{6}$/))
      newErrors.pinCode = "Pin Code must be 6 digits.";

    // optional: basic gst validation (15 chars typically for India) if provided
    if (formData.gstNumber && !formData.gstNumber.match(/^[0-9A-Z]{15}$/))
      newErrors.gstNumber = "GST Number should be 15 alphanumeric uppercase chars.";

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
      // adjust API endpoint as needed
      const res = await axios.post(
        "http://localhost:8000/api/user/register",
        formData
      );
      toast.success("Industry registered successfully!");
      console.log("Response:", res.data);

      // reset form
      setFormData({
        role,
        industryName: "",
        ownerName: "",
        contactNumber: "",
        email: "",
        password: "",
        industryType: "",
        address: {
          street: "",
          village: "",
          city: "",
          district: "",
          state: "",
          pinCode: "",
        },
        licenseNumber: "",
        gstNumber: "",
      });
      setErrors({});

      // navigate to login if desired (keeps same behavior as sample)
      setTimeout(() => {
        navigate(`/login${role ? `?role=${role}` : ""}`);
      }, 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error registering industry");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-200">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold mb-6 text-green-700">🏭 Industry Registration</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Industry Name */}
        <div>
          <label className="block text-sm font-medium text-green-700">
            Industry Name
          </label>
          <input
            type="text"
            name="industryName"
            value={formData.industryName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:outline-none"
          />
          {errors.industryName && (
            <p className="text-red-500 text-sm mt-1">{errors.industryName}</p>
          )}
        </div>

        {/* Owner Name */}
        <div>
          <label className="block text-sm font-medium text-green-700">
            Owner Name
          </label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:outline-none"
          />
          {errors.ownerName && (
            <p className="text-red-500 text-sm mt-1">{errors.ownerName}</p>
          )}
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-sm font-medium text-green-700">
            Contact Number
          </label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:outline-none"
          />
          {errors.contactNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-green-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-green-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:outline-none"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Industry Type */}
        <div>
          <label className="block text-sm font-medium text-green-700">
            Industry Type
          </label>
          <select
            name="industryType"
            value={formData.industryType}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:outline-none"
          >
            <option value="">Select type</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="food-processing">Food Processing</option>
            <option value="textile">Textile</option>
            <option value="pharma">Pharmaceutical</option>
            <option value="chemical">Chemical</option>
            <option value="other">Other</option>
          </select>
          {errors.industryType && (
            <p className="text-red-500 text-sm mt-1">{errors.industryType}</p>
          )}
        </div>

        {/* Address grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Street */}
          <div>
            <label className="block text-sm font-medium text-green-700">Street</label>
            <input
              type="text"
              name="street"
              value={formData.address.street}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:outline-none"
            />
            {errors.street && (
              <p className="text-red-500 text-sm mt-1">{errors.street}</p>
            )}
          </div>

          {/* Village */}
          <div>
            <label className="block text-sm font-medium text-green-700">Village</label>
            <input
              type="text"
              name="village"
              value={formData.address.village}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:outline-none"
            />
            {errors.village && (
              <p className="text-red-500 text-sm mt-1">{errors.village}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-green-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.address.city}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:outline-none"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          {/* District */}
          <div>
            <label className="block text-sm font-medium text-green-700">
              District
            </label>
            <input
              type="text"
              name="district"
              value={formData.address.district}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:outline-none"
            />
            {errors.district && (
              <p className="text-red-500 text-sm mt-1">{errors.district}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-green-700">State</label>
            <input
              type="text"
              name="state"
              value={formData.address.state}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:outline-none"
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>

          {/* Pin Code */}
          <div>
            <label className="block text-sm font-medium text-green-700">
              Pin Code
            </label>
            <input
              type="text"
              name="pinCode"
              value={formData.address.pinCode}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:outline-none"
            />
            {errors.pinCode && (
              <p className="text-red-500 text-sm mt-1">{errors.pinCode}</p>
            )}
          </div>
        </div>

        {/* License & GST */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-green-700">
              License Number (optional)
            </label>
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700">
              GST Number (optional)
            </label>
            <input
              type="text"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={(e) =>
                // convert to uppercase to help match GST pattern
                handleChange({ target: { name: "gstNumber", value: e.target.value.toUpperCase() } })
              }
              className="w-full p-2 border rounded-md focus:ring-2 focus:outline-none"
            />
            {errors.gstNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.gstNumber}</p>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <button
            type="reset"
            className="px-4 py-2 border border-green-600 text-green-700 rounded-md hover:bg-green-50 transition"
            onClick={() =>
              setFormData({
                role,
                industryName: "",
                ownerName: "",
                contactNumber: "",
                email: "",
                password: "",
                industryType: "",
                address: {
                  street: "",
                  village: "",
                  city: "",
                  district: "",
                  state: "",
                  pinCode: "",
                },
                licenseNumber: "",
                gstNumber: "",
              })
            }
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
