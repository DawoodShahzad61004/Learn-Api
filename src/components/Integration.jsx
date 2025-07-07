import { useState } from "react";
import { Play, Loader, AlertCircle } from "lucide-react";
import CodeBlock from "./CodeBlock.jsx";

export const IntegrationSection = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiData, setApiData] = useState(null);

  const fetchData = async (endpoint) => {
    setLoading(true);
    setError(null);
    setApiData(null);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/${endpoint}`
      );
      const data = await response.json();
      setApiData(data);
    } catch (err) {
      setError("Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">API Integration Examples</h2>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-xl font-semibold mb-4">Interactive API Demo</h3>
        <p className="text-gray-700 mb-4">
          Click the buttons below to simulate API calls:
        </p>

        <div className="flex gap-4 mb-4">
          <button
            onClick={() => fetchData("users")}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Play size={16} />
            Fetch Users
          </button>
          <button
            onClick={() => fetchData("posts")}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Play size={16} />
            Fetch Posts
          </button>
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-blue-600">
            <Loader className="animate-spin" size={16} />
            Loading data...
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {apiData && !loading && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">API Response:</h4>
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(apiData, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-xl font-semibold mb-4">JavaScript Fetch Example</h3>
        <CodeBlock>
          {`// GET request
const fetchUsers = async () => {
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// POST request
const createUser = async (userData) => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    const newUser = await response.json();
    console.log('User created:', newUser);
  } catch (error) {
    console.error('Error:', error);
  }
};`}
        </CodeBlock>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-xl font-semibold mb-4">
          React Integration Example
        </h3>
        <CodeBlock>
          {`import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};`}
        </CodeBlock>
      </div>
    </div>
  );
};
