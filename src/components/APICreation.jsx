import { Code } from "lucide-react";
import CodeBlock from "./CodeBlock.jsx";

export const CreationSection = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold mb-4">API Creation Fundamentals</h2>

    <div className="bg-white p-6 rounded-lg shadow-md border">
      <h3 className="text-xl font-semibold mb-4">1. Define Your Endpoints</h3>
      <p className="text-gray-700 mb-4">
        Start by planning what resources your API will expose:
      </p>

      <CodeBlock>
        {`// Example API Structure
GET    /api/users          // Get all users
GET    /api/users/:id      // Get specific user
POST   /api/users          // Create new user
PUT    /api/users/:id      // Update user
DELETE /api/users/:id      // Delete user`}
      </CodeBlock>
    </div>

    <div className="bg-white p-6 rounded-lg shadow-md border">
      <h3 className="text-xl font-semibold mb-4">
        2. Sample Node.js/Express API
      </h3>
      <CodeBlock>
        {`const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Sample data
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' }
];

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// POST new user
app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(3000, () => {
  console.log('API server running on port 3000');
});`}
      </CodeBlock>
    </div>

    <div className="bg-green-50 border-l-4 border-green-400 p-4">
      <h4 className="font-semibold text-green-800 mb-2">Best Practices</h4>
      <ul className="text-green-700 space-y-1">
        <li>Use meaningful HTTP status codes (200, 201, 400, 404, 500)</li>
        <li>Implement proper error handling and validation</li>
        <li>Use consistent naming conventions</li>
        <li>Add authentication and authorization</li>
        <li>Document your API thoroughly</li>
      </ul>
    </div>
  </div>
);
