const CodeBlock = ({ children }) => (
  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto whitespace-pre-wrap">
    <code>{children}</code>
  </pre>
);

export default CodeBlock;
