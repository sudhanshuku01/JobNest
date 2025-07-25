import { useState, useEffect } from "react";
import Header from "./components/Header";
import JobFilter from "./components/JobFilter";
import JobList from "./components/JobList";
import "./styles/App.css";
import axios from "axios";
const App = () => {
  const [loading, setLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [maxSalary, setMaxSalary] = useState(100000);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);

      // Delay before API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/jobs`,
          {
            params: {
              jobTitle,
              location,
              jobType,
              minSalary: 0,
              maxSalary,
            },
          }
        );
        setJobs(res.data.jobs);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [jobTitle, location, jobType, maxSalary]);

  return (
    <div className="app">
      <Header />
      <JobFilter
        jobTitle={jobTitle}
        setJobTitle={setJobTitle}
        location={location}
        setLocation={setLocation}
        jobType={jobType}
        setJobType={setJobType}
        maxSalary={maxSalary}
        setMaxSalary={setMaxSalary}
      />
      <JobList jobs={jobs} loading={loading} />
    </div>
  );
};

export default App;
