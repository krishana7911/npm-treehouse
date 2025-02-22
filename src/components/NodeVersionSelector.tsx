import React from "react";

interface NodeVersionSelectorProps {
  nodeVersion: string;
  setNodeVersion: React.Dispatch<React.SetStateAction<string>>;
  customNodeVersion: string;
  setCustomNodeVersion: React.Dispatch<React.SetStateAction<string>>;
}

const NodeVersionSelector: React.FC<NodeVersionSelectorProps> = ({
  nodeVersion,
  setNodeVersion,
  customNodeVersion,
  setCustomNodeVersion,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <label className="text-lg font-semibold">Node Version</label>
      <select
        className="border rounded px-4 py-2 text-black flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={nodeVersion}
        onChange={(e) => setNodeVersion(e.target.value)}
      >
        {["18", "20", "22"].map((version) => (
          <option key={version} value={version}>
            {version}
          </option>
        ))}
        <option value="custom">Custom</option>
      </select>

      {nodeVersion === "custom" && (
        <input
          type="text"
          placeholder="Enter custom Node.js version"
          className="border rounded px-4 py-2 text-black flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={customNodeVersion}
          onChange={(e) => setCustomNodeVersion(e.target.value)}
        />
      )}
    </div>
  );
};

export default NodeVersionSelector;
