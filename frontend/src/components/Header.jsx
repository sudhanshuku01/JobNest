import  { useState,useEffect } from "react";
import logo from "../assets/logo.png";
import JobModal from "./JobModal";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 850);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 850);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className="navbar">
        <div className="navbar__left">
          <img src={logo} alt="Company Logo" className="navbar__logo" />
        </div>

        {!isMobile && (
          <nav className="navbar__nav">
            <ul className="navbar__links">
              <li className="navbar__link">Find Jobs</li>
              <li className="navbar__link">Find Talents</li>
              <li className="navbar__link">About Us</li>
              <li className="navbar__link">Testimonials</li>
            </ul>
          </nav>
        )}

        <div className="navbar__right">
          <button className="navbar__btn" onClick={() => setShowModal(true)}>
            Create Jobs
          </button>
        </div>
      </header>

      {showModal && <JobModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Header;
