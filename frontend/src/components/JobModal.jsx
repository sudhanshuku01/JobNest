import React, { useEffect, useRef, useState } from "react";
import doubleRightIcon from "../assets/doubleright.png";
import doubleDownIcon from "../assets/doubledown.png";

const JobModal = ({ onClose }) => {
  
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [minSalary, setMinSalary] = useState();
  const [maxSalary, setMaxSalary] = useState();
  const [selectedDate, setSelectedDate] = useState("");
  const [description, setDescription] = useState("");

  const modalRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (minSalary < 1 || maxSalary < 1) {
      alert("Salary must be greater then 0");
      return;
    }
    if (Number(minSalary) > Number(maxSalary)) {
      alert("maxSalary must be greater then minSalary");
      return;
    }

    if (
      !jobTitle ||
      !companyName ||
      !location ||
      !jobType ||
      !selectedDate ||
      !description
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const jobData = {
      jobTitle,
      companyName,
      location,
      jobType,
      salaryRange: `${minSalary}-${maxSalary}`,
      applicationDeadline: selectedDate,
      jobDescription: description,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error("Failed to create job");
      }

      onClose();
      alert("Job posted successfully!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while posting the job.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <form className="modal-content" onSubmit={handleSubmit} ref={modalRef}>
        <h2>Create Job Opening</h2>
        <div className="modal-content-container">
          <div className="jobtitle textinput">
            <label>Job Title</label>
            <input
              type="text"
              placeholder="Enter job title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </div>

          <div className="companyname textinput">
            <label>Company Name</label>
            <input
              type="text"
              placeholder="Amazon, Microsoft, Swiggy"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>

          <div className="location selectdiv">
            <label htmlFor="location">Location</label>
            <select
              name="location"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            >
              <option value="" disabled>
                Choose your preferred location
              </option>
              <option value="Patna">Patna</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
            </select>
          </div>

          <div className="jobtype selectdiv">
            <label htmlFor="jobtype">Job Type</label>
            <select
              name="jobtype"
              id="jobtype"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              required
            >
              <option value="" disabled>
                Select job type
              </option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <div className="salaryrange">
            <label>Salary Range</label>
            <div>
              <input
                type="number"
                placeholder="↑↓ ₹ 0"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="↑↓ ₹ 12,00,000"
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="deadline">
            <label>Application Deadline</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-input"
              required
            />
          </div>

          <div className="description">
            <label>Job Description</label>
            <textarea
              placeholder="Write job responsibilities, qualifications, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="buttons">
          <button onClick={onClose}>
            <p>Save Draft</p>
            <img src={doubleDownIcon} alt="double down icon" />
          </button>
          <button type="submit">
            <p>Publish</p>
            <img src={doubleRightIcon} alt="double right icon" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobModal;
