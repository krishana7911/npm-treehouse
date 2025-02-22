import { useState } from "react";
import { extractGraph } from "../utils/graphExtractor";

interface GenerateButtonProps {
  packageJson: string;
  setPackageLock: (lockfile: object | null) => void;
  setGraphData: (data: { nodes: any[]; links: any[] } | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export default function GenerateButton({
  packageJson,
  setPackageLock,
  setGraphData,
  setLoading,
  setError,
}: GenerateButtonProps) {
  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-lockfile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageJson }),
      });

      if (!response.ok) throw new Error("Failed to generate package-lock.json");

      const { lockFile } = await response.json();
      setPackageLock(lockFile);

      // 🔥 Extract Graph Data Separately
      const graphData = extractGraph(lockFile);
      setGraphData(graphData);

    } catch (error) {
      setError("Error: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-500"
      onClick={handleGenerate}
      disabled={!packageJson}
    >
      Generate Lockfile & Visualize
    </button>
  );
}
