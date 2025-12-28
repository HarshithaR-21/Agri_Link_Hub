// FarmerDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import {
  Leaf,
  Menu,
  X,
  Bell,
  User,
  Home,
  Package,
  Plus,
  TrendingUp,
  MessageSquare,
  HelpCircle,
  Trash,
} from "lucide-react";

// Nav config
const navItems = [
  { key: "overview", label: "Overview", icon: Home },
  { key: "profile", label: "Profile", icon: User },
  { key: "product-listings", label: "Product Listings", icon: Package },
  { key: "add-product", label: "Add Product", icon: Plus },
  { key: "sales", label: "Sales History", icon: TrendingUp },
  { key: "requests", label: "Orders", icon: MessageSquare },
  { key: "support", label: "Support", icon: HelpCircle },
];

/* ----------------------------- Section: Overview ---------------------------- */
function OverviewContent({ onNavigate, products, orders, loading, error }) {
  const activeListingsCount =
    products.filter((p) => p.totalQuantity > 0 && p.status !== "Sold").length ||
    0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your farm today
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-card rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Active Listings</p>
          <p className="text-3xl font-bold">{activeListingsCount}</p>
          <button
            onClick={() => onNavigate("product-listings")}
            className="mt-2 text-sm text-primary hover:underline"
          >
            View all →
          </button>
        </div>

        <div className="p-4 bg-card rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Orders</p>
          <p className="text-3xl font-bold">{orders.length}</p>
          <button
            onClick={() => onNavigate("requests")}
            className="mt-2 text-sm text-primary hover:underline"
          >
            Review now →
          </button>
        </div>

        <div className="p-4 bg-card rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Loading state</p>
          <p className="text-3xl font-bold">{loading ? "…" : "Ready"}</p>
          {error && (
            <p className="text-xs text-destructive mt-1">Error: {error}</p>
          )}
        </div>

        <div className="p-4 bg-card rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Completed sales</p>
          <p className="text-3xl font-bold">—</p>
          <button
            onClick={() => onNavigate("sales")}
            className="mt-2 text-sm text-primary hover:underline"
          >
            View history →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 bg-card rounded-lg">
          <h3 className="font-semibold mb-3">Recent Activity</h3>
          <ul className="space-y-2 text-sm">
            <li className="p-3 rounded-md bg-accent/50">
              Realtime orders stream connected
            </li>
            <li className="p-3 rounded-md bg-accent/50">
              Products synced from backend
            </li>
            <li className="p-3 rounded-md bg-accent/50">
              Navigate to Orders to review details
            </li>
          </ul>
        </div>

        <div className="p-4 bg-card rounded-lg">
          <h3 className="font-semibold mb-3">Quick Actions</h3>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => onNavigate("add-product")}
              className="text-left p-3 bg-primary/5 rounded-md"
            >
              Add New Product
            </button>
            <button
              onClick={() => onNavigate("requests")}
              className="text-left p-3 rounded-md border"
            >
              View Orders
            </button>
            <button
              onClick={() => onNavigate("profile")}
              className="text-left p-3 rounded-md border"
            >
              Update Profile
            </button>
            <button
              onClick={() => onNavigate("support")}
              className="text-left p-3 rounded-md border"
            >
              Explore Schemes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------- Section: Product listings ----------------------- */

function ProductListingsContent({ products, loading, error, onAdd, onDeleted }) {
  const visibleProducts = products.filter(
    (p) => p.totalQuantity > 0 && p.status !== "Sold"
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/farmer/delete-listing/${id}`, {
        withCredentials: true,
      });
      // notify parent to refresh products
      if (onDeleted) onDeleted(id);
    } catch (err) {
      console.error("Delete failed:", err);
      alert(err.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Product Listings</h2>
          <p className="text-muted-foreground">Manage your listed products</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onAdd}
            className="px-3 py-2 bg-primary text-white rounded-md inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add New Product
          </button>
        </div>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Loading products…</p>}
      {error && <p className="text-sm text-destructive">Error: {error}</p>}

      {!loading && visibleProducts.length === 0 && !error && (
        <div className="bg-card rounded-lg p-4">
          <p className="text-sm text-muted-foreground">
            No products available for selling. Click “Add New Product” to create one.
          </p>
        </div>
      )}

      {!loading && visibleProducts.length > 0 && (
        <div className="overflow-x-auto bg-card rounded-lg p-4">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr>
                <th className="pb-2">Product</th>
                <th className="pb-2">Category</th>
                <th className="pb-2">Quantity</th>
                <th className="pb-2">Price</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Location</th>
                <th className="pb-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleProducts.map((p) => (
                <tr key={p._id} className="border-t border-border hover:bg-accent/50">
                  <td className="py-3 font-medium">{p.productName}</td>
                  <td className="py-3">{p.productCategory}</td>
                  <td className="py-3">
                    {p.totalQuantity} {p.unitType}
                  </td>
                  <td className="py-3">
                    ₹{p.pricePerUnit} / {p.unitType}
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs ${p.status === "Available"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3">
                    {p.farmAddress?.village}, {p.farmAddress?.district}
                  </td>
                  <td className="py-3 text-right space-x-2">
                    <button className="p-2 text-muted-foreground hover:text-foreground">
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <Trash className="w-4 h-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Section: Orders ----------------------------- */
function OrdersContent({ orders }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Orders</h2>
      <div className="grid gap-3">
        {!orders.length && (
          <p className="text-sm text-muted-foreground">No orders yet.</p>
        )}
        {orders.map((o) => (
          <div
            key={o._id}
            className="p-3 bg-card rounded-md flex items-start justify-between border border-border"
          >
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">
                Buyer: {o.buyerName} • {o.buyerContact}
              </div>
              <div className="font-medium">
                {o.productName} — {o.quantity}
              </div>
              <div className="text-sm text-muted-foreground">
                Total: ₹{o.totalPrice}
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Status:</span> {o.status}
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Logistics booked:</span>{" "}
                {o.logisticsBooked ? "Yes" : "No"}
              </div>
            </div>
            {/* Actions (accept/reject etc.) can be wired to backend when available */}
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------- Section: Add product form ---------------------- */


function ProductFormContent({ onBack }) {
  
    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/farmer/listing", formData, { withCredentials: true });
      alert("Product added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Error adding product");
    }
  };
  return (
    <div className="space-y-8 bg-white p-6 rounded-xl shadow-md border border-green-200">

      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-md border  text-green-700 hover:bg-green-50 transition"
        >
          Back
        </button>
        <div>
          <h2 className="text-3xl font-bold text-green-700">Add New Product</h2>
          <p className="text-green-600">List your produce</p>
        </div>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        {/* --- BASIC INFO --- */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-green-700 mb-2">Basic Details</h3>
        </div>

        <Input label="Product Name" placeholder="Basmati Rice" onChange={handleChange} name="productName" />
        <Input label="Category" placeholder="Grain" onChange={handleChange} name="productCategory" />
        <Input label="Variety Type" placeholder="Long Grain" onChange={handleChange} name="varietyType" />
        <Textarea label="Description" placeholder="Details about product..." onChange={handleChange} name="description" className="md:col-span-2" />

        {/* --- QUANTITY --- */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-green-700 mb-2">Quantity & Units</h3>
        </div>

        <Input type="number" label="Total Quantity" placeholder="500" name="totalQuantity" onChange={handleChange}/>
        <Select label="Unit Type" name="unitType" onChange={handleChange} options={["Kg", "Ton", "Liter", "Bag", "Crate", "Packet", "Piece", "Other"]} />
        <Input type="number" label="Minimum Order Quantity" onChange={handleChange} placeholder="50" name="minimumOrderQuantity" />
        <Select label="Packaging Type" name="packagingType" onChange={handleChange} options={["Loose", "Bags", "Crates", "Customized"]} />

        {/* --- QUALITY --- */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-green-700 mb-2">Quality & Grading</h3>
        </div>

        <Select label="Grade" name="grade" options={["A", "B", "C"]} />
        <Input label="Freshness" onChange={handleChange} placeholder="Freshly harvested" name="freshness" />
        <Input label="Moisture %" onChange={handleChange} placeholder="12%" name="moisturePercentage" />
        <Input label="Size Range" onChange={handleChange} placeholder="Medium" name="sizeRange" />

        {/* --- PRICING --- */}
        <Input type="number" onChange={handleChange} label="Price per Unit" placeholder="45" name="pricePerUnit" />

        {/* --- ADDRESS --- */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-green-700 mb-2">Farm Address</h3>
        </div>

        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Address Line" onChange={handleChange} name="addressLine" />
          <Input label="Village" onChange={handleChange} name="village" />
          <Input label="District" onChange={handleChange} name="district" />
          <Input label="State" onChange={handleChange} name="state" />
          <Input label="PIN Code" onChange={handleChange} name="pinCode" />
        </div>

        <Input label="Pickup Location" placeholder="Farm" onChange={handleChange} name="pickupLocation" />
        <Input label="Distance From Main Road" placeholder="2 km" onChange={handleChange} name="distanceFromMainRoad" />
        <Select label="Need Logistics Support?" name="needLogisticsSupport" onChange={handleChange} options={["No", "Yes"]} />

        {/* --- AVAILABILITY --- */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-green-700 mb-2">Availability</h3>
        </div>

        <Input type="date" label="Harvested Date" name="harvestedDate" onChange={handleChange} />
        <Input type="date" label="Availability Start Date" name="availabilityStartDate" onChange={handleChange} />
        <Input type="date" label="Availability End Date" name="availabilityEndDate" onChange={handleChange} />
        <Select label="Storage Condition" name="storageCondition" onChange={handleChange} options={["Normal", "Cold Storage", "Warehouse"]} />

        {/* --- DELIVERY --- */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-green-700 mb-2">Delivery</h3>
        </div>

        <Select label="Can Deliver?" name="canDeliver" onChange={handleChange} options={["No", "Yes"]} />
        <Input type="number" label="Delivery Charges" onChange={handleChange} placeholder="0" name="deliveryCharges" />

        {/* --- STATUS --- */}
        <Select label="Status" name="status" onChange={handleChange} options={["Available", "Sold", "Pending Pickup"]} />

        {/* ACTIONS */}
        <div className="md:col-span-2 flex gap-3 justify-end pt-4">
          <button
            type="button"
            className="px-5 py-2 rounded-md border border-green-500 text-green-700 hover:bg-green-50 transition"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition shadow-md"
          >
            Save Listing
          </button>
        </div>
      </form>
    </div>
  );
}

/* Utility Components */
function Input({ label, name, className = "", ...props }) {
  return (
    <div className={className}>
      <label className="block text-sm text-green-700 mb-1">{label}</label>
      <input
        name={name}
        {...props}
        className="w-full p-2 border rounded-md focus:ring-2"
      />
    </div>
  );
}

function Textarea({ label, name, className = "", ...props }) {
  return (
    <div className={className}>
      <label className="block text-sm text-green-700 mb-1">{label}</label>
      <textarea
        name={name}
        {...props}
        className="w-full p-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
      />
    </div>
  );
}

function Select({ label, name, options }) {
  return (
    <div>
      <label className="block text-sm text-green-700 mb-1">{label}</label>
      <select
        name={name}
        className="w-full p-2 border border-green-300 rounded-md bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
      >
        {options.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}


/* -------------------------- Section: Sales & Support ------------------------ */
function SalesHistoryContent() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Sales History</h2>
      <p className="text-muted-foreground mb-4">
        Your completed sales and invoices.
      </p>
      <div className="bg-card rounded-lg p-4">
        <p className="text-sm">No detailed data — this is a placeholder view.</p>
      </div>
    </div>
  );
}

function SupportContent() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Support</h2>
      <p className="text-muted-foreground">Contact support or browse help articles.</p>
      <div className="mt-4 bg-card p-4 rounded-md">
        <p className="text-sm">Support content placeholder.</p>
      </div>
    </div>
  );
}

/* ---------------------------------- App shell -------------------------------- */
export default function FarmerDashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Backend state
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // for products
  const [error, setError] = useState(null);

  // Effects: initial fetch + sockets
  useEffect(() => {
    fetchProducts();
    fetchOrders();

    const s = io("http://localhost:8000");

    s.on("orderPlaced", (order) => {
      setOrders((prev) => [order, ...prev]);
    });
    s.on("orderCancelled", (order) => {
      setOrders((prev) => prev.map((o) => (o._id === order._id ? order : o)));
    });
    s.on("logisticsBooked", (order) => {
      setOrders((prev) => prev.map((o) => (o._id === order._id ? order : o)));
    });

    return () => {
      s.disconnect();
    };
  }, []);

  // API calls
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        "http://localhost:8000/api/farmer/get-listings", { withCredentials: true }
      );
      setProducts(
        Array.isArray(response.data.listings) ? response.data.listings : []
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch products from backend"
      );
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/small-scale-industry/orders", { withCredentials: true }
      );
      setOrders(res.data.orders || []);
    } catch (err) {
      // keep UI resilient; orders can be empty
      console.error("Error fetching orders:", err);
    }
  };

  // Render section
  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return (
          <OverviewContent
            onNavigate={setActiveSection}
            products={products}
            orders={orders}
            loading={loading}
            error={error}
          />
        );
      case "profile":
        return (
          <div>
            <h2 className="text-2xl font-bold">Profile</h2>
            <p className="text-muted-foreground">Profile view placeholder.</p>
          </div>
        );
      case "product-listings":
        return (
          <ProductListingsContent
            products={products}
            loading={loading}
            error={error}
            onAdd={() => setActiveSection("add-product")}
          />
        );
      case "add-product":
        return (
          <ProductFormContent onBack={() => setActiveSection("product-listings")} />
        );
      case "sales":
        return <SalesHistoryContent />;
      case "requests":
        return <OrdersContent orders={orders} />;
      case "support":
        return <SupportContent />;
      default:
        return (
          <OverviewContent
            onNavigate={setActiveSection}
            products={products}
            orders={orders}
            loading={loading}
            error={error}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <nav className="sticky top-0 z-50 bg-card border-b border-border h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">
              Agri<span className="text-primary">Connect</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </button>
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 bg-card border-r border-border min-h-[calc(100vh-4rem)] p-4">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary">Farmer Dashboard</h3>
            <p className="text-sm text-muted-foreground">Manage your farm</p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeSection === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent"
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="w-64 h-full bg-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold">AgriConnect</div>
                      <div className="text-xs text-muted-foreground">
                        Farmer Dashboard
                      </div>
                    </div>
                  </div>
                </div>

                <nav className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.key}
                        onClick={() => {
                          setActiveSection(item.key);
                          setSidebarOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent"
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">{renderSection()}</main>
      </div>
    </div>
  );
}
