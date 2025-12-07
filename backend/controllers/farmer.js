const { sendNotification } = require('../messaging/twilio');
const FarmerProduct = require("../models/farmer");

const handleListings = async (req, res) => {
  try {
    const {
      farmerId,
      productName,
      productCategory,
      varietyType,
      description,
      totalQuantity,
      unitType,
      minimumOrderQuantity,
      packagingType,
      grade,
      qualityParameters,
      pricePerUnit,
      farmAddress,
      pickupLocation,
      distanceFromMainRoad,
      needLogisticsSupport,
      preferredDeliveryWindow,
      harvestedDate,
      availabilityStartDate,
      availabilityEndDate,
      storageCondition,
      status,
    } = req.body;

    // Validation
    if (
      !farmerId ||
      !productName ||
      !productCategory ||
      !totalQuantity ||
      !unitType ||
      !pricePerUnit ||
      !farmAddress ||
      !availabilityStartDate
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Create new product listing
    const newListing = new FarmerProduct({
      farmerId,
      productName,
      productCategory,
      varietyType,
      description,
      totalQuantity,
      unitType,
      minimumOrderQuantity,
      packagingType: packagingType || "Loose",
      grade: grade || "A",
      qualityParameters,
      pricePerUnit,
      farmAddress,
      pickupLocation: pickupLocation || "Farm",
      distanceFromMainRoad,
      needLogisticsSupport: needLogisticsSupport || false,
      preferredDeliveryWindow,
      harvestedDate,
      availabilityStartDate,
      availabilityEndDate,
      storageCondition: storageCondition || "Normal",
      status: status || "Available",
    });

    // Save to database
    const savedListing = await newListing.save();

    // after savedListing
    try {
      const to = req.body.to || process.env.PHONE_NUMBER; // prefer explicit recipient
      if (to) {
        const bodyText = `Your product "${productName}" has been listed successfully on Agri-Link Hub.`;
        await sendNotification({ to, body: bodyText });
      } else {
        console.warn('No recipient provided; skipped notification.');
      }
    } catch (notifyErr) {
      console.error('Notification failed:', notifyErr);
    }

    return res.status(201).json({
      message: "Product listing created successfully",
      sendNotification,
      listing: savedListing,
    });
  } catch (error) {
    console.error("Error creating listing:", error);
    return res.status(500).json({
      message: "Error creating product listing",
      error: error.message,
    });
  }
};

module.exports = { handleListings };