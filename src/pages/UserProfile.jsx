import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Prescription from "./../components/Prescription";
import { toast } from "react-toastify";
import PageNav from "../components/PageNav";
import config from './../config';

const UserProfile = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState("");
  const [prescription, setPrescription] = useState([]);
  const [name, setName] = useState("");
  const [intervals, setintervals] = useState("");
  const [instructions, setinstructions] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPrescription, setIsEditingPrescription] = useState(false); // Track if editing mode is enabled
  const [updatedProfile, setUpdatedProfile] = useState({}); // Store updated profile data

  useEffect(() => {
    // Fetch the user's profile based on the userId and include the token from localStorage
    const fetchUserProfile = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          // Handle the case where the token is not available
          console.error("Authentication token not found.");
          return;
        }

        // Set up headers with the token for authorization
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await fetch(
          `${config.baseUrl}/api/v1/user/${userId}`,
          {
            headers,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setUserProfile(data.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchPrescription = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          // Handle the case where the token is not available
          console.error("Authentication token not found.");
          return;
        }

        // Set up headers with the token for authorization
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await fetch(
          `${config.baseUrl}/api/v1/presciption/${userId}`,
          {
            headers,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPrescription(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    // Call the fetchUserProfile function
    fetchUserProfile();
    fetchPrescription();
  }, [userId, isEditingPrescription]);

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in ";

    if (name === null || name === "") {
      isproceed = false;
      errormessage += " Fullname";
    }
    if (intervals === null || intervals === "") {
      isproceed = false;
      errormessage += " intervals";
    }
    if (instructions === null || instructions === "") {
      isproceed = false;
      errormessage += " instructions";
    }

    if (!isproceed) {
      toast.warning(errormessage);
    }
    return isproceed;
  };

  const handlesubmitPrescription = async (e) => {
    e.preventDefault();
    let bodyObj = { name, intervals, instructions };
    console.log(bodyObj);
    if (IsValidate()) {
      //console.log(regobj);
      try {
        const response = await fetch(
          `${config.baseUrl}/api/v1/presciption/${userId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyObj),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        toast.success("Prescription added");
        setIsEditingPrescription(false);
      } catch (error) {
        toast.error("Failed: " + error.message);
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(true); // Enable editing mode
    setUpdatedProfile({ ...userProfile }); // Initialize updatedProfile with current data
  };
  const handleEditPrescriptionClick = () => {
    setIsEditingPrescription(true); // Enable editing mode
    // setUpdatedProfile({ ...userProfile }); // Initialize updatedProfile with current data
  };
  const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      // Send a PUT request to update the user profile on the server
      const response = await fetch(
        `${config.baseUrl}/api/v1/user/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProfile),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Update userProfile with the updated data
      setUserProfile(updatedProfile);
      setIsEditing(false); // Disable editing mode after successful update
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the updatedProfile object with the new input values
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  async function handleDelete(prescriptionId) {
    try {
      // Construct the URL for the DELETE request
      const deleteUrl = `${config.baseUrl}/api/v1/presciption/${userId}/${prescriptionId}`;

      // Make the DELETE request using fetch
      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // If the API call is successful, update the state to remove the deleted prescription
        const updatedPrescriptions = prescription.filter(
          (prescription) => prescription._id !== prescriptionId
        );
        setPrescription(updatedPrescriptions);
      } else {
        // Handle the case where the API call is not successful (e.g., 404 Not Found)
        console.error("Error deleting prescription:", response.status);
        // Implement your error handling logic as needed
      }
    } catch (error) {
      console.error("Error deleting prescription:", error);
      // Handle any network or other errors
    }
  }

  return (
    <>
      <PageNav />
      {isEditing && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        >
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div
                className="col-12 col-md-9 col-lg-7 col-xl-6"
                style={{ width: "100%" }}
              >
                <div
                  className="card"
                  style={{ borderRadius: "15px", width: "100%" }}
                >
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      Edit patient
                    </h2>

                    <form onSubmit={handleSaveClick}>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="bloodType"
                          value={updatedProfile.bloodType || ""}
                          onChange={handleInputChange}
                          placeholder="Blood Type"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <textarea
                          className="form-control form-control-lg"
                          name="diagnosis"
                          value={updatedProfile.diagnosis || ""}
                          onChange={handleInputChange}
                          placeholder="Please Enter the case diagnosis"
                          rows="4"
                        ></textarea>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditingPrescription && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        >
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div
                className="col-12 col-md-9 col-lg-7 col-xl-6"
                style={{ width: "100%" }}
              >
                <div
                  className="card"
                  style={{ borderRadius: "15px", width: "100%" }}
                >
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      Edit Prescription
                    </h2>

                    <form onSubmit={handlesubmitPrescription}>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="name"
                          value={name || ""}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Prescription Name"
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="intervals"
                          value={intervals || ""}
                          onChange={(e) => setintervals(e.target.value)}
                          placeholder="Prescription intervals"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <textarea
                          className="form-control form-control-lg"
                          name="instructions"
                          value={instructions || ""}
                          onChange={(e) => setinstructions(e.target.value)}
                          placeholder="Please Enter the instructions for this Prescription"
                          rows="2"
                        ></textarea>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Add
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src="/user.jpg"
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "150px" }}
                  />
                  <h5 className="my-3">{userProfile.name}</h5>

                  {localStorage.getItem("role") === "doctor" && (
                    <div className="d-flex justify-content-center mb-2">
                      <div className="d-flex justify-content-center align-items-center h-100">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleEditClick}
                        >
                          Edit
                        </button>
                      </div>

                      <button
                        type="button"
                        className="btn btn-outline-primary ms-1"
                        onClick={handleEditPrescriptionClick}
                      >
                        Prescription
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userProfile.name}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userProfile.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userProfile.phone}</p>
                    </div>
                  </div>

                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Blood Type</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userProfile.bloodType}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Diagnosis</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userProfile.diagnosis}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {prescription.map((element) => (
                  <Prescription
                    key={element._id}
                    name={element.name}
                    intervals={element.intervals}
                    instructions={element.instructions}
                    id={element._id}
                    handleDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
