import React, { useState } from 'react';

export const SecuritySection = () => {
  const [decoded, setDecoded] = useState(null);
  const [token, setToken] = useState("");

  const [payload, setPayload] = useState('');
  const [secret, setSecret] = useState('');
  const [encoded, setEncoded] = useState('');

  const base64url = (source) => {
    return btoa(source)
      .replace(/=+$/, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  const handleEncode = () => {
    try {
      const header = { alg: 'HS256', typ: 'JWT' };
      const encodedHeader = base64url(JSON.stringify(header));
      const encodedPayload = base64url(payload);

      // NOTE: Real JWTs use HMAC SHA256 signature; this is a mock
      const fakeSignature = base64url(secret || 'secret');

      const jwt = `${encodedHeader}.${encodedPayload}.${fakeSignature}`;
      setEncoded(jwt);
    } catch (error) {
      setEncoded("Error encoding JWT");
    }
  };

  const handleDecode = () => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      setDecoded(JSON.parse(jsonPayload));
    } catch (error) {
      setDecoded({ error: "Invalid JWT" });
    }
  };

  return (
    <div className="text-gray-700 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">JWT & Security</h2>
        <p>
          Learn how to secure your APIs using <strong>JWT (JSON Web Tokens)</strong>. Understand authentication vs. authorization, token expiration, refresh tokens, and how to safely store and verify them on server/client.
        </p>
        <ul className="list-disc pl-6 mt-3">
          <li>JWT Structure: Header, Payload, Signature</li>
          <li>Signing with secrets or RSA keys</li>
          <li>Stateless authentication</li>
          <li>Role-based access control (RBAC)</li>
        </ul>
      </div>

      <div className="bg-white p-6 border rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-2">🛠 Practice: Decode a JWT</h3>
        <p className="mb-2 text-sm text-gray-600">
          Paste a JWT token below and click <strong>Decode</strong> to view its payload (the middle part of the token).
        </p>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste your JWT here..."
          className="w-full border border-gray-300 rounded-lg p-3 text-sm font-mono mb-4"
          rows={4}
        />
        <button
          onClick={handleDecode}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Decode
        </button>

        {decoded && (
          <div className="mt-4 bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Payload:</h4>
            <pre className="text-sm text-gray-800 overflow-x-auto">
              {JSON.stringify(decoded, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div className="bg-white p-6 border rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-2">🧪 Practice: Encode Payload to JWT</h3>
        <p className="mb-2 text-sm text-gray-600">
          Enter a JSON payload and a secret to create a basic JWT (this is a mock, not secure).
        </p>
        <textarea
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          placeholder='e.g. { "user": "dawood", "role": "admin" }'
          className="w-full border border-gray-300 rounded-lg p-3 text-sm font-mono mb-4"
          rows={4}
        />
        <input
          type="text"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Secret (optional)"
          className="w-full border border-gray-300 rounded-lg p-3 text-sm font-mono mb-4"
        />
        <button
          onClick={handleEncode}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Encode
        </button>

        {encoded && (
          <div className="mt-4 bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Generated JWT:</h4>
            <pre className="text-sm text-gray-800 overflow-x-auto break-all">{encoded}</pre>
          </div>
        )}
      </div>
    </div>
  );
};