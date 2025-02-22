"use client";

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

interface GraphVisualizationProps {
  graphData: { nodes: any[]; links: any[] } | null;
}

export default function GraphVisualization({ graphData }: GraphVisualizationProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  useEffect(() => {
    if (!graphData || !svgRef.current) return;

    const width = window.innerWidth * 0.9;
    const height = window.innerHeight * 0.9;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background", "black");

    svg.selectAll("*").remove();

    const container = svg.append("g"); // For zoom and pan

    const simulation = d3.forceSimulation(graphData.nodes)
      .force("link", d3.forceLink(graphData.links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = container.selectAll("line")
      .data(graphData.links)
      .enter().append("line")
      .style("stroke", "#ccc")
      .style("stroke-width", 1.5);

    const node = container.selectAll("circle")
      .data(graphData.nodes)
      .enter().append("circle")
      .attr("r", 8)
      .style("fill", "steelblue")
      .call(drag(simulation))
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .on("click", handleClick);

    const tooltip = d3.select("body").append("div")
      .style("position", "absolute")
      .style("background", "#f9f9f9")
      .style("color", "#333")
      .style("padding", "6px 10px")
      .style("border-radius", "6px")
      .style("border", "1px solid #ccc")
      .style("box-shadow", "0px 0px 4px rgba(0,0,0,0.2)")
      .style("font-size", "12px")
      .style("visibility", "hidden");

    function handleMouseOver(event: any, d: any) {
      tooltip.style("visibility", "visible")
        .text(`Package: ${d.id}`)
        .style("top", `${event.pageY + 10}px`)
        .style("left", `${event.pageX + 10}px`);
    }

    function handleMouseOut() {
      tooltip.style("visibility", "hidden");
    }

    function handleClick(event: any, d: any) {
      setSelectedNode(d);
    }

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);
    });

    function drag(simulation: any) {
      function dragstarted(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event: any, d: any) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    const zoom = d3.zoom()
      .scaleExtent([0.5, 2])
      .on("zoom", (event) => {
        container.attr("transform", event.transform);
      });

    svg.call(zoom);
  }, [graphData]);

  return (
    <div className="w-full p-4">
      <label className="text-lg font-semibold text-white">Dependency Graph</label>
      <div className="border border-gray-700 rounded px-4 py-2 bg-gray-900 min-h-[800px] max-h-[800px] overflow-hidden w-full">
        <svg ref={svgRef}></svg>
      </div>
      {selectedNode && (
        <div className="mt-4 p-4 bg-gray-800 text-white rounded-lg">
          <h2 className="text-xl font-bold">{selectedNode.id}</h2>
          <p>Details about this package...</p>
        </div>
      )}
    </div>
  );
}
