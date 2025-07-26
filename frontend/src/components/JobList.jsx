import onSiteIcon from "../assets/onsiteicon.png";
import packageIcon from "../assets/packageicon.png";
import expIcon from "../assets/expicon.png";
import amazonIcon from "../assets/amazonicon.png";
import teslaIcon from "../assets/teslaicon.png";
import swiggyIcon from "../assets/swiggyicon.png";

const Images = [amazonIcon, teslaIcon, swiggyIcon];
const JobList = ({ jobs, loading }) => {
  if (loading) {
    return (
      <div className="job-list">
        {[1, 2].map((_, i) => (
          <div className="job-card shimmer" key={i}>
            <div className="shimmer-logo shimmer-bg" />
            <div className="shimmer-title shimmer-bg" />
            <div className="shimmer-detail shimmer-bg" />
            <div className="shimmer-detail shimmer-bg" />
            <div className="shimmer-detail shimmer-bg" />
            <div className="shimmer-button shimmer-bg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="job-list">
      {jobs.map((job) => {
        const createdAt = new Date(job.createdAt);
        const now = new Date();

        const diffMs = now - createdAt;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        let postedLabel = "";
        if (diffDays === 0) {
          if (diffHours < 1) postedLabel = "Just now";
          else postedLabel = `${diffHours}h ago`;
        } else if (diffDays === 1) {
          postedLabel = "1d ago";
        } else if (diffDays <= 5) {
          postedLabel = `${diffDays}d ago`;
        }

        return (
          <div
            className={`job-card ${postedLabel ? "has-label" : ""}`}
            key={job._id}
            data-posted={postedLabel}
          >
            <img
              src={Images[Math.floor(Math.random() * Images.length)]}
              alt="Company Logo"
              className="job-card__logo"
            />
            <h1 className="job-card__title">{job.jobTitle}</h1>

            <div className="job-card__details">
              <div className="job-card__detail">
                <img src={expIcon} alt="Experience" />
                <p>{job.requirements || "0-1 yr Exp"}</p>
              </div>
              <div className="job-card__detail">
                <img src={onSiteIcon} alt="Work Type" />
                <p>{job.jobType || "On Site"}</p>
              </div>
              <div className="job-card__detail">
                <img src={packageIcon} alt="Package" />
                <p>
                  {job.salaryRange
                    ? `${(
                        (Number(job.salaryRange.split("-")[1]) * 12) /
                        100000
                      ).toFixed(1)} LPA`
                    : "12 LPA"}
                </p>
              </div>
            </div>

            <p className="job-card__description">
              <li>{job.jobDescription || "No description available."}</li>
              <li>{job.jobDescription || "No description available."}</li>
            </p>

            <button className="job-card__apply-button">Apply Now</button>
          </div>
        );
      })}

      {jobs.length < 1 && <div className="nojobfound">No matching jobs</div>}
    </div>
  );
};

export default JobList;
