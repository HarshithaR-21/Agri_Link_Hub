const mongoose = require("mongoose");

const FarmerProductSchema = new mongoose.Schema(
  {
    // farmerId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Farmer",
    //   required: true,
    // },

    // Basic Product Info
    productName: { type: String, required: true },
    productCategory: { type: String, required: true }, // Vegetable, Fruit, Grain, etc.
    varietyType: { type: String },
    description: { type: String },

    // Quantity & Units
    totalQuantity: { type: Number, required: true },
    unitType: {
      type: String,
      enum: ["kg", "ton", "liter", "bag", "crate", "packet", "piece", "other"],
      required: true,
    },
    minimumOrderQuantity: { type: Number },
    packagingType: {
      type: String,
      enum: ["Loose", "Bags", "Crates", "Customized"],
      default: "Loose",
    },

    // Quality & Grading
    grade: { type: String, enum: ["A", "B", "C"], default: "A" },
    qualityParameters: {
      freshness: { type: String },
      moisturePercentage: { type: String },
      sizeRange: { type: String },
    },
    // organicCertified: { type: Boolean, default: false },
    // organicCertificateUrl: { type: String },

    // Pricing
    pricePerUnit: { type: Number, required: true },

    // Location & Logistics
    farmAddress: {
      addressLine: { type: String, required: true },
      village: { type: String, required: true },
      district: { type: String, required: true },
      state: { type: String, required: true },
      pinCode: { type: String, required: true },
    },

    pickupLocation: {
      type: String,
      default: "Farm",
    },

    distanceFromMainRoad: { type: String },
    needLogisticsSupport: { type: Boolean, default: false },

    preferredDeliveryWindow: {
      startDate: { type: Date },
      endDate: { type: Date },
      preferredTime: { type: String },
    },

    // Availability
    harvestedDate: { type: Date },
    availabilityStartDate: { type: Date, required: true },
    availabilityEndDate: { type: Date },

    storageCondition: {
      type: String,
      enum: ["Normal", "Cold Storage", "Warehouse"],
      default: "Normal",
    },

    // Status
    status: {
      type: String,
      enum: ["Available", "Sold", "Pending Pickup"],
      default: "Available",
    },

    // Time Stamps
  },
  { timestamps: true }
);

module.exports = mongoose.model("FarmerProduct", FarmerProductSchema);
