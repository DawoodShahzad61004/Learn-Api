import { useState } from "react";
import { Code, Globe } from "lucide-react";

export const CorsSection = () => {
  const [token, setToken] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    try {
      const res = await fetch("http://localhost:5000/protected", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        setResponse(JSON.stringify(data, null, 2));
      } else {
        const text = await res.text();
        setResponse(text);
      }

      if (!res.ok) {
        setError(`HTTP ${res.status}: ${res.statusText}`);
      } else {
        setError("");
      }
    } catch (err) {
      setError("Network error or CORS rejection");
    }
  };

  return (
    <div className="text-gray-700 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">CORS & Auth</h2>
        <p>
          Understand <strong>Cross-Origin Resource Sharing (CORS)</strong> and
          how it affects frontend-backend communication. Learn how to handle
          CORS errors and configure your server correctly.
        </p>
        <ul className="list-disc pl-6 mt-3">
          <li>Preflight requests and HTTP OPTIONS</li>
          <li>Allow-Origin, Allow-Headers, Allow-Methods</li>
          <li>WithCredentials and cookies</li>
          <li>Common CORS misconfigurations</li>
        </ul>
      </div>

      <div className="bg-white p-6 border rounded-lg shadow-sm space-y-4">
        <h3 className="text-xl font-semibold mb-2">🔐 Practice: Auth & CORS</h3>

        <p className="text-sm text-gray-600">
          Try making an authenticated request to a protected backend endpoint
          using a JWT token. This simulates how CORS and Auth headers are
          handled.
        </p>

        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste JWT token here"
          className="w-full border border-gray-300 rounded-lg p-3 text-sm font-mono"
        />

        <button
          onClick={handleFetch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Fetch Protected Data
        </button>

        {response && (
          <div className="bg-gray-100 mt-4 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Response:</h4>
            <pre className="text-sm text-gray-800 overflow-x-auto">
              {response}
            </pre>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 mt-4 p-4 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}

        <details className="mt-6 bg-gray-50 p-4 border border-blue-200 rounded-lg">
          <summary className="cursor-pointer text-blue-600 font-medium">
            📘 Show Setup Instructions (Frontend + Backend + CORS)
          </summary>
          <div className="mt-4 text-sm space-y-4 text-gray-700">
            <div>
              <strong>1. Frontend Setup:</strong>
              <pre className="bg-gray-900 text-green-300 p-3 rounded-md overflow-x-auto whitespace-pre-wrap text-xs">
                {`fetch("http://localhost:5000/protected", {
  method: "GET",
  headers: {
    Authorization: "Bearer YOUR_JWT_HERE"
  },
  credentials: "include"
})`}
              </pre>
              <p>
                Use <code>Authorization: Bearer &lt;token&gt;</code> and{" "}
                <code>credentials: "include"</code> to simulate protected CORS
                calls.
              </p>
            </div>

            <div>
              <strong>2. Backend Example (Express.js):</strong>
              <pre className="bg-gray-900 text-green-300 p-3 rounded-md overflow-x-auto whitespace-pre-wrap text-xs">
                {`const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.get("/protected", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const user = jwt.verify(token, "secret123");
    res.json({ message: "Access granted", user });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.listen(5000);`}
              </pre>
            </div>

            <div>
              <strong>3. How CORS Works:</strong>
              <ul className="list-disc pl-5">
                <li>
                  Browser sends preflight OPTIONS request (for non-simple
                  requests)
                </li>
                <li>Server must respond with correct CORS headers</li>
                <li>If not, browser blocks the main request</li>
              </ul>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};
