import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  Wheat,
  Factory,
  Lightbulb,
  Truck,
} from "lucide-react";

export default function Register() {
  const [selectedRole, setSelectedRole] = useState("");

  const roles = [
    { id: "farmer", label: "Farmer", icon: Wheat, description: "Sell your produce directly", path: "/farmer-form" },
    { id: "industry", label: "Industry", icon: Factory, description: "Source raw materials", path: "/industry-form" },
    { id: "entrepreneur", label: "Entrepreneur", icon: Lightbulb, description: "Build your startup", path: "/entrepreneur-form" },
    { id: "logistics", label: "Logistics", icon: Truck, description: "Provide transport services", path: "/logistics-form" },
  ];

  const handleRoleSelect = (id) => {
    setSelectedRole(id);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center shadow-md">
              <Leaf className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">
              Agri<span className="text-primary">Link Hub</span>
            </span>
          </Link>
        </div>

        <div className="bg-white dark:bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <header className="px-6 py-5 text-center border-b border-border">
            <h2 className="text-2xl font-bold">Create Your Account</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Join the agricultural ecosystem
            </p>
          </header>

          <div className="p-6 space-y-6">
            {/* Role selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const active = selectedRole === role.id;

                  return (
                    <Link
                      key={role.id}
                      to={role.path}
                      state={{ role: role.id }}
                      onClick={() => handleRoleSelect(role.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-colors duration-150 flex flex-col items-start ${
                        active
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-6 h-6 ${
                            active ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                        <div>
                          <div
                            className={`font-semibold text-sm ${
                              active ? "text-primary" : "text-foreground"
                            }`}
                          >
                            {role.label}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {role.description}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
