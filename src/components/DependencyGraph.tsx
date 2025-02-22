import { useEffect, useState } from "react";

interface DependencyNode {
  id: string;
  version: string;
}

interface DependencyLink {
  source: string;
  target: string;
}

interface DependencyGraph {
  nodes: DependencyNode[];
  links: DependencyLink[];
}

export default function DependencyGraphData() {
  const [data, setData] = useState<DependencyGraph | null>(null);

  useEffect(() => {
    fetch("/api/dependency-graph")
      .then((res) => res.json())
      .then((json: DependencyGraph) => setData(json))
      .catch((err) => console.error("Error fetching graph:", err));
  }, []);

  return (
    <div>
      <h2>Dependency Graph Data</h2>
      <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        {data ? JSON.stringify(data, null, 2) : "Loading..."}
      </pre>
    </div>
  );
}
