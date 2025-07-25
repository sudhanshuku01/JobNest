import React, { useState, useEffect } from "react";
import locationIcon from "../assets/locationicon.png";
import jobTypeIcon from "../assets/usericon.png";
import searchIcon from "../assets/searchicon.png";
import downIcon from "../assets/downicon.png";
import axios from "axios";

const JobFilter = ({
  jobTitle,
  setJobTitle,
  location,
  setLocation,
  jobType,
  setJobType,
  maxSalary,
  setMaxSalary,
}) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/jobs/locations`
        );
        setLocations(res.data.locations || []);
      } catch (error) {
        console.error("Failed to fetch locations", error);
      }
    };

    fetchLocations();
  }, []);

  const handleRangeChange = (e) => {
    const val = Number(e.target.value);
    setMaxSalary(val); // keep minSalary = 0 always
  };

  const calculateBackground = () => {
    const percent = (maxSalary / 100000) * 100;
    return `linear-gradient(to right, #000000 ${percent}%, #ccc2c2 ${percent}%)`;
  };

  return (
    <div className="job-filter">
      {/* 🔍 Search */}
      <div className="job-filter__search">
        <img src={searchIcon} alt="Search" className="job-filter__icon" />
        <input
          type="text"
          placeholder="Search By Job Title, Role"
          className="job-filter__input"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>

      {/* 📍 Location */}
      <div className="job-filter__location">
        <img src={locationIcon} alt="Location" className="job-filter__icon" />
        <p className="job-filter__label">{location || "Preferred Location"}</p>
        <div className="dropdown-arrow">
          <img
            src={downIcon}
            alt="Down Arrow"
            className="dropdown-arrow__icon"
          />
          <ul className="dropdown-menu">
            {locations.map((loc, idx) => (
              <li key={idx} onClick={() => setLocation(loc)}>
                {loc}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 👤 Job Type */}
      <div className="job-filter__type">
        <img src={jobTypeIcon} alt="Job Type" className="job-filter__icon" />
        <p className="job-filter__label">{jobType || "Job Type"}</p>
        <div className="dropdown-arrow">
          <img
            src={downIcon}
            alt="Down Arrow"
            className="dropdown-arrow__icon"
          />
          <ul className="dropdown-menu">
            {["Full-time", "Part-time", "Contract", "Internship"].map(
              (type, idx) => (
                <li key={idx} onClick={() => setJobType(type)}>
                  {type}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* 💰 Salary Range */}
      <div className="job-filter__salary">
        <div className="job-filter-labels">
          <p className="job-filter__label">Salary Per Month</p>
          <p className="job-filter__label">
            <span>₹0k</span> <span> - </span> <span>₹{maxSalary / 1000}k</span>
          </p>
        </div>
        <input
          type="range"
          min="0"
          max="100000"
          step="5000"
          value={maxSalary}
          onChange={handleRangeChange}
          className="job-filter__range"
          style={{ background: calculateBackground() }}
        />
      </div>
    </div>
  );
};

export default JobFilter;
