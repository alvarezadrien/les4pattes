// AdoptionRequests.js
import React, { useState, useEffect } from "react";
import "./Gestion_adoption.css"; // Don't forget to create this CSS file

const GestionAdoption = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to simulate fetching data from a database
  const fetchAdoptionRequests = async () => {
    try {
      setLoading(true);
      // In a real application, you would replace this with an actual API call:
      // const response = await fetch('/api/adoption-requests');
      // const data = await response.json();

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockData = [
        {
          id: "req001",
          applicantName: "Alice Dubois",
          animalName: "Max (Chien)",
          status: "Pending",
          dateSubmitted: "2025-05-28",
          notes: "Waiting for initial document review.",
        },
        {
          id: "req002",
          applicantName: "Bob Martin",
          animalName: "Whiskers (Chat)",
          status: "In Review",
          dateSubmitted: "2025-05-29",
          notes: "Interview scheduled for next week.",
        },
        {
          id: "req003",
          applicantName: "Carole Leroy",
          animalName: "Pip (Hamster)",
          status: "Approved",
          dateSubmitted: "2025-05-30",
          notes: "Adoption finalized. Animal picked up.",
        },
        {
          id: "req004",
          applicantName: "David Petit",
          animalName: "Luna (Lapin)",
          status: "Rejected",
          dateSubmitted: "2025-05-31",
          notes: "Application did not meet requirements.",
        },
        {
          id: "req005",
          applicantName: "Émilie Moreau",
          animalName: "Rex (Chien)",
          status: "Pending",
          dateSubmitted: "2025-06-01",
          notes: "New request, awaiting initial contact.",
        },
      ];
      setRequests(mockData);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch adoption requests:", err);
      setError("Failed to load adoption requests. Please try again later.");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchAdoptionRequests();
  }, []); // Empty dependency array means this runs once after the initial render

  const handleStatusChange = async (requestId, newStatus) => {
    // Optimistically update the UI
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId ? { ...request, status: newStatus } : request
      )
    );

    try {
      // In a real application, you would send an update request to your API:
      // const response = await fetch(`/api/adoption-requests/${requestId}`, {
      //   method: 'PUT', // Or 'PATCH'
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ status: newStatus }),
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to update status');
      // }

      // Simulate API call delay for status update
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log(`Status of request ${requestId} updated to ${newStatus}`);
    } catch (err) {
      console.error(`Error updating status for request ${requestId}:`, err);
      setError("Failed to update status. Please refresh and try again.");
      // If the API call fails, revert the UI state
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === requestId
            ? {
                ...request,
                status: requests.find((r) => r.id === requestId).status,
              }
            : request
        )
      );
    }
  };

  if (loading) {
    return (
      <div className="adoption-requests-container">
        Chargement des demandes d'adoption...
      </div>
    );
  }

  if (error) {
    return (
      <div className="adoption-requests-container error-message">{error}</div>
    );
  }

  return (
    <div className="adoption-requests-container">
      <h2>Gestion des Demandes d'Adoption</h2>

      <div className="requests-summary">
        <div className="summary-card pending">
          <h3>En Attente</h3>
          <p>{requests.filter((req) => req.status === "Pending").length}</p>
        </div>
        <div className="summary-card in-review">
          <h3>En Cours</h3>
          <p>{requests.filter((req) => req.status === "In Review").length}</p>
        </div>
        <div className="summary-card approved">
          <h3>Approuvées</h3>
          <p>{requests.filter((req) => req.status === "Approved").length}</p>
        </div>
        <div className="summary-card rejected">
          <h3>Rejetées</h3>
          <p>{requests.filter((req) => req.status === "Rejected").length}</p>
        </div>
      </div>

      {requests.length === 0 ? (
        <p>Aucune demande d'adoption trouvée.</p>
      ) : (
        <table className="adoption-requests-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Demandeur</th>
              <th>Animal</th>
              <th>Statut</th>
              <th>Date Soumission</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.applicantName}</td>
                <td>{request.animalName}</td>
                <td>
                  <span
                    className={`status-badge ${request.status
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                  >
                    {request.status}
                  </span>
                </td>
                <td>{request.dateSubmitted}</td>
                <td>{request.notes}</td>
                <td>
                  <select
                    value={request.status}
                    onChange={(e) =>
                      handleStatusChange(request.id, e.target.value)
                    }
                  >
                    <option value="Pending">En Attente</option>
                    <option value="In Review">En Cours</option>
                    <option value="Approved">Approuvée</option>
                    <option value="Rejected">Rejetée</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GestionAdoption;
