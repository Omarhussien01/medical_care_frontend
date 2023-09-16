import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import { Link } from "react-router-dom";
import baseUrl from '../config.js'

function Overview() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Define a function to fetch the user list
    const fetchUserList = async () => {
      try {
        const response = await fetch(`${baseUrl.baseUrl}/api/v1/user/`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data.data); // Update the state with the fetched user data
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    // Call the fetchUserList function
    fetchUserList();
  }, []);

  return (
    <>
      <PageNav />
      <div className="container mt-4">
        <h1>Patients List</h1>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone || "N/A"}</td>
                <td>
                  <Link to={`/profile/${user._id}`} className="btn btn-primary">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Overview;
