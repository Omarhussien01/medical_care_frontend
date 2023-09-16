import { useNavigate } from "react-router-dom";

import "./PageNav.module.css";
function PageNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove local storage items
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("_id");

    // Navigate to the login page
    navigate("/login");
  };

  return (
    <nav>
      <div className="d-flex justify-content-end">
        {" "}
        {/* Use justify-content-end to push button to the right */}
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default PageNav;
