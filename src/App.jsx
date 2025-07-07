// import React, { useState, useEffect } from "react";
// import {
//   Play,
//   Code,
//   Globe,
//   Database,
//   ArrowRight,
//   CheckCircle,
//   AlertCircle,
//   Loader,
//   Shield,
//   Lock,
//   Key,
//   Users,
// } from "lucide-react";
// import "./App.css";

// const APILearningHub = () => {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [apiData, setApiData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Mock API data
//   const mockUsers = [
//     {
//       id: 1,
//       name: "Alice Johnson",
//       email: "alice@example.com",
//       role: "Developer",
//     },
//     { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Designer" },
//     { id: 3, name: "Carol Davis", email: "carol@example.com", role: "Manager" },
//   ];

//   const mockPosts = [
//     {
//       id: 1,
//       title: "Understanding REST APIs",
//       content: "REST APIs are fundamental...",
//       author: "Alice Johnson",
//     },
//     {
//       id: 2,
//       title: "GraphQL vs REST",
//       content: "Comparing different API architectures...",
//       author: "Bob Smith",
//     },
//     {
//       id: 3,
//       title: "API Security Best Practices",
//       content: "Securing your APIs is crucial...",
//       author: "Carol Davis",
//     },
//   ];

//   // Simulate API call
//   const fetchData = async (endpoint) => {
//     setLoading(true);
//     setError(null);

//     try {
//       // Simulate network delay
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       if (endpoint === "users") {
//         setApiData(mockUsers);
//       } else if (endpoint === "posts") {
//         setApiData(mockPosts);
//       }
//     } catch (err) {
//       setError("Failed to fetch data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const TabButton = ({ id, label, icon: Icon }) => (
//     <button
//       onClick={() => setActiveTab(id)}
//       className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
//         activeTab === id
//           ? "bg-blue-600 text-white shadow-lg"
//           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//       }`}
//     >
//       <Icon size={18} />
//       {label}
//     </button>
//   );

//   const CodeBlock = ({ children }) => (
//     <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
//       {children}
//     </div>
//   );

//   const SecuritySection = () => (
//     <div className="text-gray-700 space-y-4">
//       <h2 className="text-2xl font-bold">JWT & Security</h2>
//       <p>
//         Learn how to secure your APIs using{" "}
//         <strong>JWT (JSON Web Tokens)</strong>. Understand authentication vs.
//         authorization, token expiration, refresh tokens, and how to safely store
//         and verify them on server/client.
//       </p>
//       <ul className="list-disc pl-6">
//         <li>JWT Structure: Header, Payload, Signature</li>
//         <li>Signing with secrets or RSA keys</li>
//         <li>Stateless authentication</li>
//         <li>Role-based access control (RBAC)</li>
//       </ul>
//     </div>
//   );

//   const CorsSection = () => (
//     <div className="text-gray-700 space-y-4">
//       <h2 className="text-2xl font-bold">CORS & Auth</h2>
//       <p>
//         Understand <strong>Cross-Origin Resource Sharing (CORS)</strong> and how
//         it affects frontend-backend communication. Learn how to handle CORS
//         errors and configure your server correctly.
//       </p>
//       <ul className="list-disc pl-6">
//         <li>Preflight requests and HTTP OPTIONS</li>
//         <li>Allow-Origin, Allow-Headers, Allow-Methods</li>
//         <li>WithCredentials and cookies</li>
//         <li>Common CORS misconfigurations</li>
//       </ul>
//     </div>
//   );

//   const OverviewSection = () => (
//     <div className="space-y-6">
//       <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
//         <h2 className="text-3xl font-bold mb-2">Welcome to API Learning Hub</h2>
//         <p className="text-lg opacity-90">
//           Master API creation and integration through interactive examples
//         </p>
//       </div>

//       <div className="grid md:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-md border">
//           <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
//             <Code className="text-blue-600" />
//             What is an API?
//           </h3>
//           <p className="text-gray-700 mb-4">
//             An API (Application Programming Interface) is a set of rules and
//             protocols that allows different software applications to communicate
//             with each other.
//           </p>
//           <div className="bg-blue-50 p-4 rounded-lg">
//             <strong>Think of it like a waiter:</strong> You (client) tell the
//             waiter (API) what you want, the waiter goes to the kitchen (server),
//             and brings back your food (data).
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md border">
//           <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
//             <Globe className="text-green-600" />
//             REST API Principles
//           </h3>
//           <ul className="text-gray-700 space-y-2">
//             <li>
//               <strong>GET:</strong> Retrieve data
//             </li>
//             <li>
//               <strong>POST:</strong> Create new data
//             </li>
//             <li>
//               <strong>PUT:</strong> Update existing data
//             </li>
//             <li>
//               <strong>DELETE:</strong> Remove data
//             </li>
//           </ul>
//         </div>
//       </div>

//       <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
//         <h4 className="font-semibold text-yellow-800 mb-2">
//           Key Concepts to Learn
//         </h4>
//         <p className="text-yellow-700">
//           Endpoints, HTTP methods, status codes, request/response formats,
//           authentication, error handling, and rate limiting.
//         </p>
//       </div>
//     </div>
//   );

//   const CreationSection = () => (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold mb-4">API Creation Fundamentals</h2>

//       <div className="bg-white p-6 rounded-lg shadow-md border">
//         <h3 className="text-xl font-semibold mb-4">1. Define Your Endpoints</h3>
//         <p className="text-gray-700 mb-4">
//           Start by planning what resources your API will expose:
//         </p>

//         <CodeBlock>
//           {`// Example API Structure
// GET    /api/users          // Get all users
// GET    /api/users/:id      // Get specific user
// POST   /api/users          // Create new user
// PUT    /api/users/:id      // Update user
// DELETE /api/users/:id      // Delete user`}
//         </CodeBlock>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md border">
//         <h3 className="text-xl font-semibold mb-4">
//           2. Sample Node.js/Express API
//         </h3>
//         <CodeBlock>
//           {`const express = require('express');
// const app = express();

// // Middleware
// app.use(express.json());

// // Sample data
// let users = [
//   { id: 1, name: 'John Doe', email: 'john@example.com' }
// ];

// // GET all users
// app.get('/api/users', (req, res) => {
//   res.json(users);
// });

// // POST new user
// app.post('/api/users', (req, res) => {
//   const newUser = {
//     id: users.length + 1,
//     name: req.body.name,
//     email: req.body.email
//   };
//   users.push(newUser);
//   res.status(201).json(newUser);
// });

// app.listen(3000, () => {
//   console.log('API server running on port 3000');
// });`}
//         </CodeBlock>
//       </div>

//       <div className="bg-green-50 border-l-4 border-green-400 p-4">
//         <h4 className="font-semibold text-green-800 mb-2">Best Practices</h4>
//         <ul className="text-green-700 space-y-1">
//           <li>Use meaningful HTTP status codes (200, 201, 400, 404, 500)</li>
//           <li>Implement proper error handling and validation</li>
//           <li>Use consistent naming conventions</li>
//           <li>Add authentication and authorization</li>
//           <li>Document your API thoroughly</li>
//         </ul>
//       </div>
//     </div>
//   );

//   const IntegrationSection = () => (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold mb-4">API Integration Examples</h2>

//       <div className="bg-white p-6 rounded-lg shadow-md border">
//         <h3 className="text-xl font-semibold mb-4">Interactive API Demo</h3>
//         <p className="text-gray-700 mb-4">
//           Click the buttons below to simulate API calls:
//         </p>

//         <div className="flex gap-4 mb-4">
//           <button
//             onClick={() => fetchData("users")}
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             <Play size={16} />
//             Fetch Users
//           </button>
//           <button
//             onClick={() => fetchData("posts")}
//             className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
//           >
//             <Play size={16} />
//             Fetch Posts
//           </button>
//         </div>

//         {loading && (
//           <div className="flex items-center gap-2 text-blue-600">
//             <Loader className="animate-spin" size={16} />
//             Loading data...
//           </div>
//         )}

//         {error && (
//           <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
//             <AlertCircle size={16} />
//             {error}
//           </div>
//         )}

//         {apiData && !loading && (
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <h4 className="font-semibold mb-2">API Response:</h4>
//             <pre className="text-sm overflow-x-auto">
//               {JSON.stringify(apiData, null, 2)}
//             </pre>
//           </div>
//         )}
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md border">
//         <h3 className="text-xl font-semibold mb-4">JavaScript Fetch Example</h3>
//         <CodeBlock>
//           {`// GET request
// const fetchUsers = async () => {
//   try {
//     const response = await fetch('/api/users');
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

// // POST request
// const createUser = async (userData) => {
//   try {
//     const response = await fetch('/api/users', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData)
//     });
//     const newUser = await response.json();
//     console.log('User created:', newUser);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };`}
//         </CodeBlock>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md border">
//         <h3 className="text-xl font-semibold mb-4">
//           React Integration Example
//         </h3>
//         <CodeBlock>
//           {`import React, { useState, useEffect } from 'react';

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('/api/users');
//         const data = await response.json();
//         setUsers(data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       {users.map(user => (
//         <div key={user.id}>
//           <h3>{user.name}</h3>
//           <p>{user.email}</p>
//         </div>
//       ))}
//     </div>
//   );
// };`}
//         </CodeBlock>
//       </div>
//     </div>
//   );

//   const PracticeSection = () => {
//     const [httpMethod, setHttpMethod] = useState("GET");
//     const [apiUrl, setApiUrl] = useState(
//       "https://jsonplaceholder.typicode.com/posts"
//     );
//     const [requestBody, setRequestBody] = useState("");
//     const [headers, setHeaders] = useState([
//       { key: "Content-Type", value: "application/json" },
//     ]);
//     const [response, setResponse] = useState(null);
//     const [responseStatus, setResponseStatus] = useState(null);
//     const [requestLoading, setRequestLoading] = useState(false);
//     const [responseTime, setResponseTime] = useState(null);

//     const addHeader = () => {
//       setHeaders([...headers, { key: "", value: "" }]);
//     };

//     const updateHeader = (index, field, value) => {
//       const newHeaders = [...headers];
//       newHeaders[index][field] = value;
//       setHeaders(newHeaders);
//     };

//     const removeHeader = (index) => {
//       setHeaders(headers.filter((_, i) => i !== index));
//     };

//     const sendRequest = async () => {
//       setRequestLoading(true);
//       setResponse(null);
//       setResponseStatus(null);
//       setResponseTime(null);

//       const startTime = Date.now();

//       try {
//         // Build headers object
//         const headersObj = {};
//         headers.forEach((header) => {
//           if (header.key && header.value) {
//             headersObj[header.key] = header.value;
//           }
//         });

//         // Prepare request options
//         const options = {
//           method: httpMethod,
//           headers: headersObj,
//         };

//         if (httpMethod !== "GET" && requestBody) {
//           options.body = requestBody;
//         }

//         const response = await fetch(apiUrl, options);
//         const endTime = Date.now();
//         setResponseTime(endTime - startTime);

//         setResponseStatus(response.status);

//         const contentType = response.headers.get("content-type");
//         if (contentType && contentType.includes("application/json")) {
//           const data = await response.json();
//           setResponse(data);
//         } else {
//           const text = await response.text();
//           setResponse(text);
//         }
//       } catch (error) {
//         const endTime = Date.now();
//         setResponseTime(endTime - startTime);
//         setResponseStatus("Error");
//         setResponse({ error: error.message });
//       } finally {
//         setRequestLoading(false);
//       }
//     };

//     const getStatusColor = (status) => {
//       if (status >= 200 && status < 300) return "text-green-600";
//       if (status >= 300 && status < 400) return "text-yellow-600";
//       if (status >= 400) return "text-red-600";
//       return "text-gray-600";
//     };

//     const sampleRequests = [
//       {
//         name: "Get Posts",
//         method: "GET",
//         url: "https://jsonplaceholder.typicode.com/posts",
//         body: "",
//       },
//       {
//         name: "Get Single Post",
//         method: "GET",
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//         body: "",
//       },
//       {
//         name: "Create Post",
//         method: "POST",
//         url: "https://jsonplaceholder.typicode.com/posts",
//         body: JSON.stringify(
//           {
//             title: "My New Post",
//             body: "This is the content of my new post",
//             userId: 1,
//           },
//           null,
//           2
//         ),
//       },
//       {
//         name: "Update Post",
//         method: "PUT",
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//         body: JSON.stringify(
//           {
//             id: 1,
//             title: "Updated Post Title",
//             body: "Updated post content",
//             userId: 1,
//           },
//           null,
//           2
//         ),
//       },
//       {
//         name: "Delete Post",
//         method: "DELETE",
//         url: "https://jsonplaceholder.typicode.com/posts/1",
//         body: "",
//       },
//     ];

//     const loadSampleRequest = (sample) => {
//       setHttpMethod(sample.method);
//       setApiUrl(sample.url);
//       setRequestBody(sample.body);
//     };

//     return (
//       <div className="space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Practice: API Testing Tool</h2>

//         <div className="bg-white rounded-lg shadow-md border overflow-hidden">
//           <div className="bg-orange-500 text-white px-4 py-2 flex items-center gap-2">
//             <Database size={20} />
//             <span className="font-semibold">API Testing Interface</span>
//           </div>

//           <div className="p-6 space-y-6">
//             {/* Sample Requests */}
//             <div>
//               <h3 className="text-lg font-semibold mb-3">
//                 Quick Start - Sample Requests
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {sampleRequests.map((sample, index) => (
//                   <button
//                     key={index}
//                     onClick={() => loadSampleRequest(sample)}
//                     className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
//                   >
//                     {sample.name}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Request Builder */}
//             <div className="border rounded-lg p-4 bg-gray-50">
//               <h3 className="text-lg font-semibold mb-4">Request</h3>

//               {/* Method and URL */}
//               <div className="flex gap-2 mb-4">
//                 <select
//                   value={httpMethod}
//                   onChange={(e) => setHttpMethod(e.target.value)}
//                   className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 >
//                   <option value="GET">GET</option>
//                   <option value="POST">POST</option>
//                   <option value="PUT">PUT</option>
//                   <option value="DELETE">DELETE</option>
//                   <option value="PATCH">PATCH</option>
//                 </select>

//                 <input
//                   type="text"
//                   value={apiUrl}
//                   onChange={(e) => setApiUrl(e.target.value)}
//                   placeholder="Enter API URL..."
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 />

//                 <button
//                   onClick={sendRequest}
//                   disabled={requestLoading}
//                   className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//                 >
//                   {requestLoading ? (
//                     <Loader className="animate-spin" size={16} />
//                   ) : (
//                     <Play size={16} />
//                   )}
//                   Send
//                 </button>
//               </div>

//               {/* Headers */}
//               <div className="mb-4">
//                 <div className="flex items-center justify-between mb-2">
//                   <h4 className="font-semibold">Headers</h4>
//                   <button
//                     onClick={addHeader}
//                     className="text-orange-500 hover:text-orange-600 text-sm"
//                   >
//                     + Add Header
//                   </button>
//                 </div>
//                 {headers.map((header, index) => (
//                   <div key={index} className="flex gap-2 mb-2">
//                     <input
//                       type="text"
//                       value={header.key}
//                       onChange={(e) =>
//                         updateHeader(index, "key", e.target.value)
//                       }
//                       placeholder="Header key"
//                       className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                     />
//                     <input
//                       type="text"
//                       value={header.value}
//                       onChange={(e) =>
//                         updateHeader(index, "value", e.target.value)
//                       }
//                       placeholder="Header value"
//                       className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                     />
//                     <button
//                       onClick={() => removeHeader(index)}
//                       className="text-red-500 hover:text-red-600 px-2"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               {/* Request Body */}
//               {httpMethod !== "GET" && (
//                 <div className="mb-4">
//                   <h4 className="font-semibold mb-2">Request Body</h4>
//                   <textarea
//                     value={requestBody}
//                     onChange={(e) => setRequestBody(e.target.value)}
//                     placeholder="Enter JSON request body..."
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm"
//                     rows="6"
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Response */}
//             {(response !== null || responseStatus !== null) && (
//               <div className="border rounded-lg p-4 bg-gray-50">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-lg font-semibold">Response</h3>
//                   <div className="flex items-center gap-4 text-sm">
//                     {responseStatus && (
//                       <span
//                         className={`font-semibold ${getStatusColor(
//                           responseStatus
//                         )}`}
//                       >
//                         Status: {responseStatus}
//                       </span>
//                     )}
//                     {responseTime && (
//                       <span className="text-gray-600">
//                         Time: {responseTime}ms
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto max-h-96 overflow-y-auto">
//                   <pre>
//                     {typeof response === "string"
//                       ? response
//                       : JSON.stringify(response, null, 2)}
//                   </pre>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Tips */}
//         <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
//           <h4 className="font-semibold text-blue-800 mb-2">Testing Tips</h4>
//           <ul className="text-blue-700 space-y-1 text-sm">
//             <li>
//               Try the sample requests to get familiar with different HTTP
//               methods
//             </li>
//             <li>
//               JSONPlaceholder is a free fake API for testing and prototyping
//             </li>
//             <li>
//               Check response status codes: 200 (OK), 201 (Created), 404 (Not
//               Found), etc.
//             </li>
//             <li>Use proper Content-Type headers when sending JSON data</li>
//             <li>POST/PUT requests typically require a request body</li>
//           </ul>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-6xl mx-auto px-4 py-4">
//           <div className="flex items-center gap-3">
//             <Database className="text-blue-600" size={32} />
//             <h1 className="text-2xl font-bold text-gray-800">
//               API Learning Hub
//             </h1>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 py-6">
//         <div className="flex flex-wrap gap-4 mb-6">
//           <TabButton id="overview" label="Overview" icon={Globe} />
//           <TabButton id="creation" label="API Creation" icon={Code} />
//           <TabButton id="integration" label="Integration" icon={ArrowRight} />
//           <TabButton id="security" label="JWT & Security" icon={Shield} />
//           <TabButton id="cors" label="CORS & Auth" icon={Lock} />
//           <TabButton id="practice" label="API Testing" icon={Play} />
//         </div>

//         <div className="bg-white rounded-lg shadow-sm border p-6">
//           {activeTab === "overview" && <OverviewSection />}
//           {activeTab === "creation" && <CreationSection />}
//           {activeTab === "integration" && <IntegrationSection />}
//           {activeTab === "security" && <SecuritySection />}
//           {activeTab === "cors" && <CorsSection />}
//           {activeTab === "practice" && <PracticeSection />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default APILearningHub;


import React, { useState, useEffect } from "react";
import {
  Play,
  Code,
  Globe,
  Database,
  ArrowRight,
  Shield,
  Lock
} from "lucide-react";
import "./App.css";

import { OverviewSection } from './components/Overview.jsx';
import { CreationSection } from './components/APICreation.jsx';
import { IntegrationSection } from './components/Integration.jsx';
import { CorsSection } from './components/CORSandAuth.jsx';
import { SecuritySection } from './components/JWTandSecurity.jsx';
import { PracticeSection } from './components/APITesting.jsx';
import CodeBlock from "./components/CodeBlock.jsx";

const APILearningHub = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        activeTab === id
          ? "bg-blue-600 text-white shadow-lg"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Database className="text-blue-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-800">
              API Learning Hub
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <TabButton id="overview" label="Overview" icon={Globe} />
          <TabButton id="creation" label="API Creation" icon={Code} />
          <TabButton id="integration" label="Integration" icon={ArrowRight} />
          <TabButton id="security" label="JWT & Security" icon={Shield} />
          <TabButton id="cors" label="CORS & Auth" icon={Lock} />
          <TabButton id="practice" label="API Testing" icon={Play} />
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          {activeTab === "overview" && <OverviewSection />}
          {activeTab === "creation" && <CreationSection />}
          {activeTab === "integration" && <IntegrationSection />}
          {activeTab === "security" && <SecuritySection />}
          {activeTab === "cors" && <CorsSection />}
          {activeTab === "practice" && <PracticeSection />}
        </div>
      </div>
    </div>
  );
};

export default APILearningHub;