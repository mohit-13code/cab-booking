import { useState } from "react";

function BookRide() {
  const [userId, setUserId] = useState("");
  const [sourceNode, setSourceNode] = useState("");
  const [destinationNode, setDestinationNode] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const bookRide = async () => {
    setError("");
    setResponse(null);

    try {
      const res = await fetch("http://localhost:5000/api/rides/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          sourceNode: Number(sourceNode),
          destinationNode: Number(destinationNode)
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);

      setResponse(data.ride);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Smart Cab Booking System</h2>

      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={e => setUserId(e.target.value)}
      />

      <input
        type="number"
        placeholder="Source Node"
        value={sourceNode}
        onChange={e => setSourceNode(e.target.value)}
      />

      <input
        type="number"
        placeholder="Destination Node"
        value={destinationNode}
        onChange={e => setDestinationNode(e.target.value)}
      />

      <button onClick={bookRide}>Book Ride</button>

      {error && <p className="error">{error}</p>}

      {response && (
        <div className="result">
          <p><b>Driver ID:</b> {response.driverId}</p>
          <p><b>Driver Name:</b> {response.driver}</p>
          <p><b>Fare:</b> ₹{response.fare}</p>
        </div>
      )}
    </div>
  );
}

export default BookRide;
