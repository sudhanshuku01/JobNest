import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ success: true, job });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const { jobTitle, location, jobType, minSalary, maxSalary } = req.query;
    let query = {};

    if (jobTitle) {
      const regex = { $regex: jobTitle, $options: "i" };
      query.$or = [{ jobTitle: regex }, { jobDescription: regex }];
    }

    if (location) query.location = { $regex: location, $options: "i" };
    if (jobType) query.jobType = jobType;

    const allJobs = await Job.find(query).sort({ createdAt: -1 });

    let filteredJobs = allJobs;

    if (minSalary || maxSalary) {
      const min = minSalary ? Number(minSalary) : 0;
      const max = maxSalary ? Number(maxSalary) : Infinity;

      filteredJobs = allJobs.filter((job) => {
        if (!job.salaryRange) return false;

        const [rangeMin, rangeMax] = job.salaryRange
          .split("-")
          .map((val) => Number(val.trim()));

        return (
          !isNaN(rangeMin) &&
          !isNaN(rangeMax) &&
          rangeMax >= min &&
          rangeMin <= max
        );
      });
    }

    res.json({ success: true, jobs: filteredJobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllJobLocations = async (req, res) => {
  try {
    const locations = await Job.distinct("location");
    res.status(200).json({
      success: true,
      locations,
    });
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch job locations",
    });
  }
};
