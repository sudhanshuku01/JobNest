import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      required: true,
    },
    salaryRange: { type: String, required: true },
    jobDescription: { type: String, required: true },
    requirements: { type: String, default: "0-1 yr Exp" },
    responsibilities: { type: String, default: "" },
    applicationDeadline: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Job", jobSchema);
