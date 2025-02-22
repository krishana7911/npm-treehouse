// utils/graphExtractor.ts

export function extractGraph(lockFile: any) {
    let nodes = [{ id: "root" }];
    let links = [];
    const seen = new Set<string>();

    function addDependencies(parent: string, packagePath: string) {
      const packageData = lockFile.packages?.[packagePath];
      if (!packageData || !packageData.dependencies) return;

      for (const dep in packageData.dependencies) {
        const depPath = `node_modules/${dep}`;

        if (!seen.has(dep)) {
          nodes.push({ id: dep });
          seen.add(dep);
        }

        links.push({ source: parent, target: dep });

        addDependencies(dep, depPath);
      }
    }

    addDependencies("root", "");

    return { nodes, links };
  }
