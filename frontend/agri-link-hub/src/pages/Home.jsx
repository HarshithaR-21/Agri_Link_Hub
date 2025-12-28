import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  TrendingUp,
  Truck,
  Factory,
  Sprout,
  Lightbulb,
  CheckCircle2,
  Shield,
  Zap,
  Globe,
  Handshake,
  HeartHandshake,
  Leaf,
  Menu,
  X,
} from "lucide-react";

/**
 * Home.jsx — Brand palette applied
 * - Brand Primary Greens: #0A8A43 / #0F7B4F / #1B5E20
 * - Pastel backgrounds: #E8F8EF, #F3FFF8, #F9FCFB
 * - Neutrals: Dark text #1A1A1A, Text grey #555555, Divider #DDDDDD
 *
 * Root element sets CSS variables for quick adjustments.
 */

function Navbar() {
  const [open, setOpen] = useState(false);
  const nav = [
    { label: "Farmer", to: "/?role=farmer" },
    { label: "Entrepreneur", to: "/?role=entrepreneur" },
    { label: "Agriculture", to: "/agriculture" },
    { label: "Logistics", to: "/logistics" },
  ];

  return (
    <header className="sticky top-0 z-30" style={{ backgroundColor: "var(--bg-ultra)", backdropFilter: "saturate(120%) blur(6px)", borderBottom: "1px solid var(--divider)" }}>
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ backgroundColor: "rgba(10,138,67,0.06)" }}>
              <Leaf className="w-5 h-5" style={{ color: "var(--brand-strong)" }} />
            </div>
            <span className="font-bold text-[#1A1A1A] text-lg">Agri Link Hub</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {nav.map((n) => (
            <Link key={n.label} to={n.to} className="text-sm" style={{ color: "var(--text-gray)" }}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="text-sm" style={{ color: "var(--text-gray)" }}>
            Sign In
          </Link>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold"
            style={{ background: "linear-gradient(90deg,var(--brand-strong),var(--brand-contrast))", color: "#fff", boxShadow: "0 6px 18px rgba(15,123,79,0.16)" }}
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
          style={{ color: "var(--text-dark)" }}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden" style={{ backgroundColor: "var(--bg-ultra)", borderTop: "1px solid var(--divider)" }}>
          <div className="px-6 py-4 space-y-3">
            {nav.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                className="block font-medium py-2"
                onClick={() => setOpen(false)}
                style={{ color: "var(--text-dark)" }}
              >
                {n.label}
              </Link>
            ))}

            <div className="flex gap-3 pt-2">
              <Link to="/login" className="flex-1 text-center py-2" onClick={() => setOpen(false)} style={{ color: "var(--text-dark)" }}>
                Sign In
              </Link>
              <Link
                to="/register"
                className="flex-1 text-center py-2 rounded-md"
                onClick={() => setOpen(false)}
                style={{ backgroundColor: "var(--brand-strong)", color: "#fff", fontWeight: 600 }}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* Decorative background behind content */
function BackgroundDecor() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <svg className="absolute right-0 top-0 w-[48rem] max-w-full opacity-10" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id="bgG1" x1="0" x2="1">
            <stop offset="0%" stopColor="#399b63ff" />
            <stop offset="100%" stopColor="#F3FFF8" />
          </linearGradient>
        </defs>
        <path d="M600 0C700 80 740 200 700 300C660 400 540 520 420 560C300 600 200 560 120 500C40 440 0 360 0 260C0 160 60 80 160 40C260 0 460 -80 600 0Z" fill="url(#bgG1)"/>
      </svg>

      <svg className="absolute left-0 bottom-0 w-[36rem] max-w-full opacity-8 transform rotate-12" viewBox="0 0 700 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id="bgY1" x1="0" x2="1">
            <stop offset="0%" stopColor="#F9FCFB" />
            <stop offset="100%" stopColor="#F3FFF8" />
          </linearGradient>
        </defs>
        <path d="M560 20C640 80 700 180 680 280C660 380 560 460 440 480C320 500 200 460 120 400C40 340 0 260 0 160C0 60 100 0 200 0C300 0 480 -40 560 20Z" fill="url(#bgY1)"/>
      </svg>
    </div>
  );
}

function StatsGrid() {
  const stats = [
    { icon: Users, value: "10K+", label: "Active Users" },
    { icon: Factory, value: "500+", label: "Industries" },
    { icon: Truck, value: "1K+", label: "Deliveries" },
    { icon: TrendingUp, value: "₹50Cr+", label: "Trade Volume" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <div
            key={i}
            className="flex items-center gap-4 rounded-xl p-3 shadow-sm"
            style={{ backgroundColor: "var(--bg-pastel)", border: "1px solid var(--divider)" }}
          >
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(90deg,#E8F8EF,#F3FFF8)" }}>
              <Icon className="w-5 h-5" style={{ color: "var(--brand-strong)" }} />
            </div>
            <div>
              <div className="text-lg font-bold text-[#1A1A1A]">{s.value}</div>
              <div className="text-xs" style={{ color: "var(--text-gray)" }}>{s.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CardMini({ icon, title, subtitle, accent = "emerald" }) {
  return (
    <div className="p-3 rounded-lg shadow-sm" style={{ backgroundColor: "var(--bg-almost)", border: "1px solid var(--divider)" }}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-md flex items-center justify-center" style={{ backgroundColor: "rgba(10,138,67,0.06)" }}>
          {React.cloneElement(icon, { style: { color: "var(--brand-strong)" } })}
        </div>
        <div>
          <div className="text-sm font-semibold" style={{ color: "var(--text-dark)" }}>{title}</div>
          <div className="text-xs" style={{ color: "var(--text-gray)" }}>{subtitle}</div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg,var(--bg-ultra),var(--bg-pastel))" }}>
      {/* Wave */}
      <svg className="absolute -top-32 left-0 w-full opacity-10" viewBox="0 0 1440 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,64L48,96C96,128,192,192,288,197.3C384,203,480,149,576,149.3C672,149,768,203,864,218.7C960,235,1056,213,1152,202.7C1248,192,1344,192,1392,192L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" fill="rgba(10,138,67,0.04)"/>
      </svg>

      <div className="container mx-auto px-6 py-20 lg:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full mb-6" style={{ backgroundColor: "rgba(10,138,67,0.06)", color: "var(--brand-strong)", fontWeight: 600 }}>
              <Leaf className="w-4 h-4" style={{ color: "var(--brand-strong)" }} />
              AgriConnect — Trusted by farmers & partners
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight mb-4" style={{ color: "var(--text-dark)" }}>
              Connect farmers, industry & logistics — <span style={{ color: "var(--brand-strong)" }}>grow together</span>.
            </h1>

            <p className="text-lg mb-6" style={{ color: "var(--text-gray)" }}>
              One platform to list produce, discover trusted buyers, book transportation,
              and access market insights — designed to increase incomes and reduce friction.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <Link
                to="/register"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-lg font-semibold shadow-xl"
                style={{ background: "linear-gradient(90deg,var(--brand-strong),var(--brand-contrast))", color: "#fff" }}
                aria-label="Start free today"
              >
                Start Free Today
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#modules"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border shadow-sm justify-center"
                style={{ backgroundColor: "var(--bg-almost)", borderColor: "var(--divider)", color: "var(--text-dark)" }}
              >
                Explore Features
              </a>
            </div>

            <StatsGrid />
          </div>

          <div className="mx-auto lg:mx-0 max-w-md">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ backgroundColor: "var(--bg-almost)", border: "1px solid var(--divider)" }}>
              <div className="p-8" style={{ background: "linear-gradient(90deg,#F3FFF8,#E8F8EF)" }}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(10,138,67,0.06)" }}>
                    <Leaf className="w-8 h-8" style={{ color: "var(--brand-strong)" }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: "var(--text-dark)" }}>AgriConnect</h3>
                    <p className="text-sm" style={{ color: "var(--text-gray)" }}>Unified marketplace & logistics</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CardMini icon={<Users className="w-5 h-5" />} title="Farmers" subtitle="Sell produce directly" />
                  <CardMini icon={<Factory className="w-5 h-5" />} title="Industries" subtitle="Source & process" />
                  <CardMini icon={<Truck className="w-5 h-5" />} title="Logistics" subtitle="Track & deliver" />
                  <CardMini icon={<TrendingUp className="w-5 h-5" />} title="Market" subtitle="Insights & pricing" />
                </div>
              </div>

              <div className="p-6" style={{ borderTop: "1px solid var(--divider)", backgroundColor: "var(--bg-almost)" }}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium" style={{ color: "var(--text-dark)" }}>Verified Partners</div>
                    <div className="text-xs" style={{ color: "var(--text-gray)" }}>Trust & quality checks</div>
                  </div>

                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold"
                    style={{ backgroundColor: "var(--brand-strong)", color: "#fff" }}
                  >
                    Join Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> {/* container */}
    </section>
  );
}

function ModulesSection() {
  const modules = [
    {
      id: "farmers",
      icon: Sprout,
      title: "Farmer Module",
      description: "Manage inputs, listings, and connect with buyers directly.",
      features: ["Monitoring dashboard", "Direct requests", "Sales analytics", "Scheme access"],
    },
    {
      id: "industries",
      icon: Factory,
      title: "Industry Module",
      description: "Source produce, manage inventory and collaborate with farmers.",
      features: ["Profiles & inventory", "Slot booking", "Direct sourcing", "Jobs & listings"],
    },
    {
      id: "entrepreneurs",
      icon: Lightbulb,
      title: "Entrepreneur Module",
      description: "Resources and tools to build and scale agri-startups.",
      features: ["Guidance", "Partner directory", "Messaging", "Mentorship"],
    },
    {
      id: "logistics",
      icon: Truck,
      title: "Logistics Module",
      description: "Booking, tracking and ratings for transporters.",
      features: ["Transporter profiles", "Booking & schedule", "Live tracking", "History & ratings"],
    },
  ];

  return (
    <section id="modules" className="py-16 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold" style={{ color: "var(--text-dark)" }}>Platform Modules</h2>
          <p style={{ color: "var(--text-gray)", marginTop: 8 }}>Tools tailored for every stakeholder — farmers, industries, entrepreneurs and logistics.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <article key={m.id} className="rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition" style={{ backgroundColor: "var(--bg-pastel)", border: "1px solid var(--divider)" }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--bg-almost)" }}>
                    <Icon className="w-6 h-6" style={{ color: "var(--brand-strong)" }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: "var(--text-dark)" }}>{m.title}</h3>
                    <p className="text-sm" style={{ color: "var(--text-gray)", marginTop: 4 }}>{m.description}</p>
                  </div>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {m.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-gray)" }}>
                      <CheckCircle2 className="w-4 h-4" style={{ color: "var(--brand-strong)" }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div>
                  <Link to="/register" className="inline-flex items-center gap-2 font-medium" style={{ color: "var(--brand-strong)" }}>
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    { icon: Handshake, title: "Direct Connections", description: "Cut out middlemen — connect directly with buyers." },
    { icon: TrendingUp, title: "Market Access", description: "Real-time prices, demand signals and trends." },
    { icon: Zap, title: "Fast Payments", description: "Secure and quick transactions for sellers." },
    { icon: Shield, title: "Verified Partners", description: "Trustworthy network through verification." },
    { icon: Globe, title: "Pan-India Network", description: "Scale across regions and markets." },
    { icon: HeartHandshake, title: "Support Ecosystem", description: "Access schemes, mentorship and training." },
  ];

  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: "var(--bg-ultra)" }}>
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold" style={{ color: "var(--text-dark)" }}>Why AgriConnect</h2>
          <p style={{ color: "var(--text-gray)", marginTop: 8 }}>Designed to increase income, reduce friction and build trust across the supply chain.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="p-6 rounded-2xl text-center shadow-sm hover:shadow-lg transition" style={{ backgroundColor: "var(--bg-pastel)", border: "1px solid var(--divider)" }}>
                <div className="w-14 h-14 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: "var(--bg-almost)" }}>
                  <Icon className="w-6 h-6" style={{ color: "var(--brand-strong)" }} />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-dark)", marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: "var(--text-gray)" }}>{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-16 lg:py-24" style={{ background: "linear-gradient(90deg,var(--bg-pastel),var(--bg-ultra))" }}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center p-8 rounded-2xl border shadow-xl" style={{ backgroundColor: "var(--bg-almost)", borderColor: "var(--divider)" }}>
          <div className="w-16 h-16 rounded-lg mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: "rgba(10,138,67,0.06)" }}>
            <Leaf className="w-6 h-6" style={{ color: "var(--brand-strong)" }} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "var(--text-dark)" }}>Ready to transform your agribusiness?</h2>
          <p style={{ color: "var(--text-gray)", marginBottom: 18 }}>Join thousands of stakeholders already growing through AgriConnect.</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold shadow-md"
              style={{ background: "linear-gradient(90deg,var(--brand-strong),var(--brand-contrast))", color: "#fff" }}
            >
              Create Free Account <ArrowRight className="w-4 h-4" />
            </Link>

            <Link to="/login" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border" style={{ borderColor: "var(--divider)", color: "var(--text-dark)" }}>
              Sign In
            </Link>
          </div>

          <p style={{ color: "var(--text-gray)", marginTop: 12, fontSize: 13 }}>No credit card required • Free forever for basic features</p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  // root CSS variables: easy to tweak centrally
  const rootStyle = {
    "--brand-strong": "#0A8A43",
    "--brand-contrast": "#0F7B4F",
    "--brand-dark": "#436b45ff",
    "--bg-pastel": "#E8F8EF",
    "--bg-ultra": "#F3FFF8",
    "--bg-almost": "#F9FCFB",
    "--text-dark": "#1A1A1A",
    "--text-gray": "#555555",
    "--divider": "#DDDDDD",
    backgroundColor: "#F3FFF8", // fallback background
  };

  return (
    <div className="relative min-h-screen text-black antialiased overflow-hidden" style={rootStyle}>
      <BackgroundDecor />

      <Navbar />
      <main>
        <HeroSection />
        <ModulesSection />
        <FeaturesSection />
        <CTASection />
      </main>
    </div>
  );
}