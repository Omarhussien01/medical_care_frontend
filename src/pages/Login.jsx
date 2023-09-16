import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseUrl from './../config';

function Login() {
  const [email, emailupdate] = useState("");
  const [password, passwordupdate] = useState("");

  const navigate = useNavigate();

  const ProceedLoginusingAPI = async (e) => {
    e.preventDefault();
    const loginObject = { email, password };
    if (validate()) {
      try {
        const response = await fetch(
          `${baseUrl.baseUrl}/api/v1/auth/login`,
          {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(loginObject),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        // Save token, role, and _id to local storage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("_id", data._id);
        toast.success("Login successfully.");
        if (data.role === "doctor") {
          navigate("/overview");
        } else {
          navigate(`/profile/${data._id}`);
        }
      } catch (error) {
        toast.error("Failed: " + 'Wrong Credentials');
      }
    }
  };
  const validate = () => {
    let result = true;
    if (email === "" || email === null) {
      result = false;
      toast.warning("Please Enter email");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };

  return (
   
    <section
      className="vh-100 bg-image"
      style={{
        backgroundImage:
          "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
      }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Login</h2>

                  <form onSubmit={ProceedLoginusingAPI}>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => emailupdate(e.target.value)}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => passwordupdate(e.target.value)}
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Login
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      {`Don't have an account?`}{" "}
                      <Link to={"/register"} className="fw-bold text-body">
                        <u>Register</u>
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

export default Login;
