"use client";

import { useState } from "react";
import UploadForm from "@/components/UploadForm";
import NodeVersionSelector from "@/components/NodeVersionSelector";
import GenerateButton from "@/components/GenerateButton";
import PackageLockViewer from "@/components/PackageLockViewer";
import PackageJsonInput from "@/components/PackageJsonInput";
import GraphVisualization from "@/components/GraphVisualization";

export default function Home() {
  const [packageJson, setPackageJson] = useState<string>("");
  const [packageLock, setPackageLock] = useState<object | null>(null);
  const [graphData, setGraphData] = useState<{ nodes: any[]; links: any[] } | null>(null);
  const [nodeVersion, setNodeVersion] = useState<string>("20");
  const [customNodeVersion, setCustomNodeVersion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"lockfile" | "graph">("lockfile");

  return (
    <main className="container mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold text-left mb-6">NPM Treehouse</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="bg-black rounded-lg shadow-lg">
        <UploadForm setPackageJson={setPackageJson} setError={setError} />
        <PackageJsonInput packageJson={packageJson} setPackageJson={setPackageJson} setError={setError} />

        <div className="flex flex-col space-y-4 mt-6 mb-6">
        {/* <div className="flex justify-between">
          <NodeVersionSelector
            nodeVersion={nodeVersion}
            setNodeVersion={setNodeVersion}
            customNodeVersion={customNodeVersion}
            setCustomNodeVersion={setCustomNodeVersion}
          />
        </div> */}

        <div className="flex justify-between">
          <GenerateButton
            packageJson={packageJson}
            setPackageLock={setPackageLock}
            setGraphData={setGraphData}
            setLoading={setLoading}
            setError={setError}
          />
        </div>
      </div>
      </div>

      {/* Horizontal line */}
      <hr className="my-6 border-t-2 border-gray-600" />

      {/* Tabs for switching between package-lock.json and graph */}
      <div className="flex justify-start space-x-4 mt-6 text-left">
        <button
          className={`px-6 py-2 rounded-lg font-medium transitionduration-200 ${activeTab === "lockfile" ? "bg-blue-600 text-white" : "bg-gray-700 hover:bg-gray-600"}`}
          onClick={() => setActiveTab("lockfile")}
        >
          Package Lock JSON
        </button>
        <button
          className={`px-6 py-2 rounded-lg font-medium transition duration-200 ${activeTab === "graph" ? "bg-blue-600 text-white" : "bg-gray-700 hover:bg-gray-600"}`}
          onClick={() => setActiveTab("graph")}
        >
          Dependency Graph
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-900 rounded-lg shadow-lg text-left">
        {activeTab === "lockfile" && <PackageLockViewer lockFile={packageLock} />}
        {activeTab === "graph" && <GraphVisualization graphData={graphData} />}
      </div>
    </main>
  );
}
