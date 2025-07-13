const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { 
        type: String, 
        required: true
     },
    description: {
        type: String
    },
    category: {
      type: String,
      enum: ["Personal", "Academic", "Business", "Other"],
      default: "Other",
    },
    notes: {
      type: String,
      default: "",
    },
    mindMap: {
      type: Array,
      default: [],
    },
    swot: {
      strengths: { type: [String], default: [] },
      weaknesses: { type: [String], default: [] },
      opportunities: { type: [String], default: [] },
      threats: { type: [String], default: [] },
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Problem", problemSchema);
