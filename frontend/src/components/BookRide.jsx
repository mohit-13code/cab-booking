import { useState } from "react";

function BookRide() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [sourceNode, setSourceNode] = useState("");
  const [destinationNode, setDestinationNode] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const login = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);
      setToken(data.token);
      setIsLoggedIn(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const register = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);
      setToken(data.token);
      setIsLoggedIn(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const bookRide = async () => {
    setError("");
    setResponse(null);

    try {
      const res = await fetch("http://localhost:5000/api/rides/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
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

      {!isLoggedIn ? (
        <div>
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Already have an account? Login" : "New user? Register"}
          </button>
          {isRegistering ? (
            <div>
              <h3>Register</h3>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button onClick={register}>Register</button>
            </div>
          ) : (
            <div>
              <h3>Login</h3>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button onClick={login}>Login</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h3>Book Ride</h3>
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
        </div>
      )}

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
