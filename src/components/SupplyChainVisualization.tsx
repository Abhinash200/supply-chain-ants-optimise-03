
import React, { useEffect, useRef } from 'react';
import { SupplyChainNetwork, getNodeColor } from '@/lib/supplyChainModel';

interface SupplyChainVisualizationProps {
  network: SupplyChainNetwork;
  optimizedPath: number[];
}

const SupplyChainVisualization: React.FC<SupplyChainVisualizationProps> = ({ 
  network,
  optimizedPath 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw the network on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions based on its display size
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    // Scale coordinates to fit canvas
    const padding = 40;
    const scaleX = (x: number) => padding + x * (rect.width - 2 * padding);
    const scaleY = (y: number) => padding + y * (rect.height - 2 * padding);
    
    // Draw edges
    network.edges.forEach(edge => {
      const fromNode = network.nodes[edge.from];
      const toNode = network.nodes[edge.to];
      
      if (!fromNode || !toNode) return;
      
      ctx.beginPath();
      ctx.moveTo(scaleX(fromNode.x), scaleY(fromNode.y));
      ctx.lineTo(scaleX(toNode.x), scaleY(toNode.y));
      
      // Check if this edge is part of the optimized path
      const isOptimizedEdge = optimizedPath.length > 1 && 
        optimizedPath.some((nodeId, index) => {
          return index < optimizedPath.length - 1 && 
            nodeId === edge.from && 
            optimizedPath[index + 1] === edge.to;
        });
      
      if (isOptimizedEdge) {
        ctx.strokeStyle = '#ef4444'; // red-500
        ctx.lineWidth = 3;
      } else {
        ctx.strokeStyle = '#d1d5db'; // gray-300
        ctx.lineWidth = 1;
      }
      
      ctx.stroke();
    });
    
    // Draw optimized path
    if (optimizedPath.length > 1) {
      ctx.beginPath();
      const firstNode = network.nodes[optimizedPath[0]];
      if (firstNode) {
        ctx.moveTo(scaleX(firstNode.x), scaleY(firstNode.y));
        
        for (let i = 1; i < optimizedPath.length; i++) {
          const node = network.nodes[optimizedPath[i]];
          if (node) {
            ctx.lineTo(scaleX(node.x), scaleY(node.y));
          }
        }
        
        ctx.strokeStyle = '#ef4444'; // red-500
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
    
    // Draw nodes
    Object.values(network.nodes).forEach(node => {
      ctx.beginPath();
      ctx.arc(scaleX(node.x), scaleY(node.y), 8, 0, 2 * Math.PI);
      ctx.fillStyle = getNodeColor(node.type);
      ctx.fill();
      
      // Highlight nodes in optimized path
      if (optimizedPath.includes(node.id)) {
        ctx.beginPath();
        ctx.arc(scaleX(node.x), scaleY(node.y), 12, 0, 2 * Math.PI);
        ctx.strokeStyle = '#ef4444'; // red-500
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      // Draw node labels
      ctx.fillStyle = '#1f2937'; // gray-800
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.name, scaleX(node.x), scaleY(node.y) - 20);
    });
    
    // Draw legend
    const legendX = rect.width - 150;
    const legendY = 30;
    const legendSpacing = 25;
    
    ['supplier', 'manufacturer', 'distributor', 'retailer'].forEach((type, index) => {
      const y = legendY + index * legendSpacing;
      
      // Draw color box
      ctx.fillStyle = getNodeColor(type);
      ctx.fillRect(legendX, y - 8, 16, 16);
      
      // Draw text
      ctx.fillStyle = '#1f2937'; // gray-800
      ctx.font = '14px Arial';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(type.charAt(0).toUpperCase() + type.slice(1), legendX + 25, y);
    });
    
    // Draw optimized path in legend if exists
    if (optimizedPath.length > 0) {
      const y = legendY + 4 * legendSpacing;
      
      ctx.beginPath();
      ctx.moveTo(legendX, y);
      ctx.lineTo(legendX + 16, y);
      ctx.strokeStyle = '#ef4444'; // red-500
      ctx.lineWidth = 3;
      ctx.stroke();
      
      ctx.fillStyle = '#1f2937'; // gray-800
      ctx.fillText('Optimized Path', legendX + 25, y);
    }
  }, [network, optimizedPath]);

  return (
    <div className="w-full h-[400px] relative border border-gray-200 rounded-md overflow-hidden bg-white">
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default SupplyChainVisualization;
