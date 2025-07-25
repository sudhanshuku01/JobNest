import express from "express";
import {
  createJob,
  getAllJobLocations,
  getJobs,
} from "../controllers/jobController.js";

const router = express.Router();

router.post("/", createJob);
router.get("/", getJobs);

router.get("/locations", getAllJobLocations);

export default router;
