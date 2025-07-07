import { useState } from "react";
import { Database, Loader, Play } from "lucide-react";

export const PracticeSection = () => {
    const [httpMethod, setHttpMethod] = useState("GET");
    const [apiUrl, setApiUrl] = useState(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const [requestBody, setRequestBody] = useState("");
    const [headers, setHeaders] = useState([
      { key: "Content-Type", value: "application/json" },
    ]);
    const [response, setResponse] = useState(null);
    const [responseStatus, setResponseStatus] = useState(null);
    const [requestLoading, setRequestLoading] = useState(false);
    const [responseTime, setResponseTime] = useState(null);

    const addHeader = () => {
      setHeaders([...headers, { key: "", value: "" }]);
    };

    const updateHeader = (index, field, value) => {
      const newHeaders = [...headers];
      newHeaders[index][field] = value;
      setHeaders(newHeaders);
    };

    const removeHeader = (index) => {
      setHeaders(headers.filter((_, i) => i !== index));
    };

    const sendRequest = async () => {
      setRequestLoading(true);
      setResponse(null);
      setResponseStatus(null);
      setResponseTime(null);

      const startTime = Date.now();

      try {
        // Build headers object
        const headersObj = {};
        headers.forEach((header) => {
          if (header.key && header.value) {
            headersObj[header.key] = header.value;
          }
        });

        // Prepare request options
        const options = {
          method: httpMethod,
          headers: headersObj,
        };

        if (httpMethod !== "GET" && requestBody) {
          options.body = requestBody;
        }

        const response = await fetch(apiUrl, options);
        const endTime = Date.now();
        setResponseTime(endTime - startTime);

        setResponseStatus(response.status);

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setResponse(data);
        } else {
          const text = await response.text();
          setResponse(text);
        }
      } catch (error) {
        const endTime = Date.now();
        setResponseTime(endTime - startTime);
        setResponseStatus("Error");
        setResponse({ error: error.message });
      } finally {
        setRequestLoading(false);
      }
    };

    const getStatusColor = (status) => {
      if (status >= 200 && status < 300) return "text-green-600";
      if (status >= 300 && status < 400) return "text-yellow-600";
      if (status >= 400) return "text-red-600";
      return "text-gray-600";
    };

    const sampleRequests = [
      {
        name: "Get Posts",
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/posts",
        body: "",
      },
      {
        name: "Get Single Post",
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/posts/1",
        body: "",
      },
      {
        name: "Create Post",
        method: "POST",
        url: "https://jsonplaceholder.typicode.com/posts",
        body: JSON.stringify(
          {
            title: "My New Post",
            body: "This is the content of my new post",
            userId: 1,
          },
          null,
          2
        ),
      },
      {
        name: "Update Post",
        method: "PUT",
        url: "https://jsonplaceholder.typicode.com/posts/1",
        body: JSON.stringify(
          {
            id: 1,
            title: "Updated Post Title",
            body: "Updated post content",
            userId: 1,
          },
          null,
          2
        ),
      },
      {
        name: "Delete Post",
        method: "DELETE",
        url: "https://jsonplaceholder.typicode.com/posts/1",
        body: "",
      },
    ];

    const loadSampleRequest = (sample) => {
      setHttpMethod(sample.method);
      setApiUrl(sample.url);
      setRequestBody(sample.body);
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Practice: API Testing Tool</h2>

        <div className="bg-white rounded-lg shadow-md border overflow-hidden">
          <div className="bg-orange-500 text-white px-4 py-2 flex items-center gap-2">
            <Database size={20} />
            <span className="font-semibold">API Testing Interface</span>
          </div>

          <div className="p-6 space-y-6">
            {/* Sample Requests */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                Quick Start - Sample Requests
              </h3>
              <div className="flex flex-wrap gap-2">
                {sampleRequests.map((sample, index) => (
                  <button
                    key={index}
                    onClick={() => loadSampleRequest(sample)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    {sample.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Request Builder */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg font-semibold mb-4">Request</h3>

              {/* Method and URL */}
              <div className="flex gap-2 mb-4">
                <select
                  value={httpMethod}
                  onChange={(e) => setHttpMethod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                  <option value="PATCH">PATCH</option>
                </select>

                <input
                  type="text"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="Enter API URL..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                <button
                  onClick={sendRequest}
                  disabled={requestLoading}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {requestLoading ? (
                    <Loader className="animate-spin" size={16} />
                  ) : (
                    <Play size={16} />
                  )}
                  Send
                </button>
              </div>

              {/* Headers */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Headers</h4>
                  <button
                    onClick={addHeader}
                    className="text-orange-500 hover:text-orange-600 text-sm"
                  >
                    + Add Header
                  </button>
                </div>
                {headers.map((header, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={header.key}
                      onChange={(e) =>
                        updateHeader(index, "key", e.target.value)
                      }
                      placeholder="Header key"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <input
                      type="text"
                      value={header.value}
                      onChange={(e) =>
                        updateHeader(index, "value", e.target.value)
                      }
                      placeholder="Header value"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                      onClick={() => removeHeader(index)}
                      className="text-red-500 hover:text-red-600 px-2"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* Request Body */}
              {httpMethod !== "GET" && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Request Body</h4>
                  <textarea
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    placeholder="Enter JSON request body..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm"
                    rows="6"
                  />
                </div>
              )}
            </div>

            {/* Response */}
            {(response !== null || responseStatus !== null) && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Response</h3>
                  <div className="flex items-center gap-4 text-sm">
                    {responseStatus && (
                      <span
                        className={`font-semibold ${getStatusColor(
                          responseStatus
                        )}`}
                      >
                        Status: {responseStatus}
                      </span>
                    )}
                    {responseTime && (
                      <span className="text-gray-600">
                        Time: {responseTime}ms
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto max-h-96 overflow-y-auto">
                  <pre>
                    {typeof response === "string"
                      ? response
                      : JSON.stringify(response, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Testing Tips</h4>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>
              Try the sample requests to get familiar with different HTTP
              methods
            </li>
            <li>
              JSONPlaceholder is a free fake API for testing and prototyping
            </li>
            <li>
              Check response status codes: 200 (OK), 201 (Created), 404 (Not
              Found), etc.
            </li>
            <li>Use proper Content-Type headers when sending JSON data</li>
            <li>POST/PUT requests typically require a request body</li>
          </ul>
        </div>
      </div>
    );
  };