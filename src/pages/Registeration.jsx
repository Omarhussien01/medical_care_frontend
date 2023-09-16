import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseUrl from "./../config";

function Registeration() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("doctor");
  const [gender, setGender] = useState("female");

  const navigate = useNavigate();

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter valid values in ";

    if (name === null || name === "") {
      isproceed = false;
      errormessage += "Fullname";
    }

    if (password === null || password === "") {
      isproceed = false;
      errormessage += isproceed ? "Password" : ", Password";
    } else if (password.length < 6) {
      isproceed = false;
      errormessage += isproceed
        ? "Password (at least 6 characters)"
        : ", Password (at least 6 characters)";
    }

    if (email === null || email === "") {
      isproceed = false;
      errormessage += isproceed ? "Email" : ", Email";
    } else if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)
    ) {
      isproceed = false;
      errormessage += isproceed ? "Valid Email" : ", Valid Email";
    }

    if (phone === null || phone === "" || !/^[0-9]+$/.test(phone)) {
      isproceed = false;
      errormessage += isproceed ? "Valid Phone Number" : ", Valid Phone Number";
    }

    if (!isproceed) {
      toast.warning(errormessage);
    }

    return isproceed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let regobj = { name, password, email, phone, role, gender };
    console.log(regobj);
    if (IsValidate()) {
      try {
        const response = await fetch(
          `${baseUrl.baseUrl}/api/v1/auth/register`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(regobj),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${data}`);
        }

        toast.success("Registered successfully.");
        navigate("/login");
      } catch (error) {
        toast.error("Failed: " + error.message);
      }
    }
  };

  return (
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="tel"
                        className="form-control form-control-lg"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                      <h6 className="mb-0 me-4">Gender: </h6>

                      <div className="form-check form-check-inline mb-0 me-4">
                        <input
                          className="form-check-input"
                          type="radio"
                          checked={gender === "female"}
                          onChange={(e) => setGender(e.target.value)}
                          name="gender"
                          value="female"
                        />
                        <label className="form-check-label">Female</label>
                      </div>

                      <div className="form-check form-check-inline mb-0 me-4">
                        <input
                          className="form-check-input"
                          type="radio"
                          checked={gender === "male"}
                          onChange={(e) => setGender(e.target.value)}
                          name="gender"
                          value="male"
                        />
                        <label className="form-check-label">Male</label>
                      </div>
                    </div>

                    <div className="form-group mb-4">
                      <label htmlFor="role">Role:</label>
                      <select
                        id="role"
                        className="form-control"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="doctor">Doctor</option>
                        <option value="patient">Patient</option>
                      </select>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?{" "}
                      <Link to="/login" className="fw-bold text-body">
                        <u>Login here</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Registeration;
