const FarmerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contactNumber: { type: String, required: true },
    location: {
      village: String,
      district: String,
      state: String,
      pinCode: String,
      required: true,
    },
    landSize: String,
    farmingType: { type: String }, // organic / conventional
    profileImage: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Farmer", FarmerSchema);
