import { Code, Globe } from "lucide-react";

export const OverviewSection = () => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
      <h2 className="text-3xl font-bold mb-2">Welcome to API Learning Hub</h2>
      <p className="text-lg opacity-90">
        Master API creation and integration through interactive examples
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Code className="text-blue-600" />
          What is an API?
        </h3>
        <p className="text-gray-700 mb-4">
          An API (Application Programming Interface) is a set of rules and
          protocols that allows different software applications to communicate
          with each other.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <strong>Think of it like a waiter:</strong> You (client) tell the
          waiter (API) what you want, the waiter goes to the kitchen (server),
          and brings back your food (data).
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Globe className="text-green-600" />
          REST API Principles
        </h3>
        <ul className="text-gray-700 space-y-2">
          <li>
            <strong>GET:</strong> Retrieve data
          </li>
          <li>
            <strong>POST:</strong> Create new data
          </li>
          <li>
            <strong>PUT:</strong> Update existing data
          </li>
          <li>
            <strong>DELETE:</strong> Remove data
          </li>
        </ul>
      </div>
    </div>

    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <h4 className="font-semibold text-yellow-800 mb-2">
        Key Concepts to Learn
      </h4>
      <p className="text-yellow-700">
        Endpoints, HTTP methods, status codes, request/response formats,
        authentication, error handling, and rate limiting.
      </p>
    </div>
  </div>
);
