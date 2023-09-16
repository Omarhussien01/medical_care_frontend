/* eslint-disable react/prop-types */
function Prescription({ name, intervals, instructions, id, handleDelete }) {
  return (
    <div className="col-md-6" style={{ marginBottom: "1rem" }}>
      <div className="card mb-4 mb-md-0">
        <div className="card-body">
          <p className="mb-4" style={{ fontSize: "1.5rem", fontWeight: "700" }}>
            Prescription
          </p>
          <p className="mb-1" style={{ fontSize: "1rem", fontWeight: "600" }}>
            {name}
          </p>

          <p
            className="mt-4 mb-1"
            style={{ fontSize: "1rem", fontWeight: "600" }}
          >
            {intervals}
          </p>

          <p
            className="mt-4 mb-1"
            style={{ fontSize: "1rem", fontWeight: "600" }}
          >
            {instructions}
          </p>

          {/* Add a delete button */}
          {localStorage.getItem("role") === "doctor" && (
            <button className="btn btn-danger" onClick={() => handleDelete(id)}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Prescription;
