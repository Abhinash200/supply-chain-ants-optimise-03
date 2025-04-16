// Types for supply chain network
export interface SupplyChainNode {
  id: number;
  type: 'supplier' | 'manufacturer' | 'distributor' | 'retailer';
  name: string;
  x: number;
  y: number;
  capacity: number;
  cost: number;
}

export interface SupplyChainEdge {
  from: number;
  to: number;
  distance: number;
  cost: number;
  time: number;
  capacity: number;
}

export interface SupplyChainNetwork {
  nodes: Record<number, SupplyChainNode>;
  edges: SupplyChainEdge[];
}

// API response interfaces
export interface OptimizationResult {
  bestPath: number[];
  pathCost: number;
  convergenceData: { iteration: number; bestCost: number }[];
}

export interface MLPrediction {
  evaporationRate: number;
  alpha: number;
  beta: number;
  predictedCost: number;
  confidence: number;
}

// Generate a random supply chain network
export const generateRandomNetwork = (nodeCount: number, density: number): SupplyChainNetwork => {
  const nodes: Record<number, SupplyChainNode> = {};
  const edges: SupplyChainEdge[] = [];
  const nodeTypes: Array<'supplier' | 'manufacturer' | 'distributor' | 'retailer'> = [
    'supplier', 'manufacturer', 'distributor', 'retailer'
  ];

  // Create nodes
  for (let i = 0; i < nodeCount; i++) {
    const type = nodeTypes[Math.floor(i / (nodeCount / 4)) % nodeTypes.length];
    nodes[i] = {
      id: i,
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${i}`,
      x: Math.random(),
      y: Math.random(),
      capacity: 50 + Math.floor(Math.random() * 150),
      cost: 10 + Math.floor(Math.random() * 40)
    };
  }

  // Create edges - more likely to connect nodes of adjacent types
  for (let i = 0; i < nodeCount; i++) {
    for (let j = 0; j < nodeCount; j++) {
      if (i === j) continue;
      
      // Calculate type compatibility (adjacent types more likely to connect)
      const fromType = nodes[i].type;
      const toType = nodes[j].type;
      
      let typeCompatibility = 0;
      if (
        (fromType === 'supplier' && toType === 'manufacturer') ||
        (fromType === 'manufacturer' && toType === 'distributor') ||
        (fromType === 'distributor' && toType === 'retailer')
      ) {
        typeCompatibility = 0.7; // Higher chance for typical supply chain flow
      } else {
        typeCompatibility = 0.1; // Lower chance for other connections
      }
      
      // Create edge with probability based on density and compatibility
      if (Math.random() < density * typeCompatibility) {
        const distance = Math.sqrt(
          Math.pow(nodes[i].x - nodes[j].x, 2) + 
          Math.pow(nodes[i].y - nodes[j].y, 2)
        ) * 1000; // Scale to km
        
        edges.push({
          from: i,
          to: j,
          distance: Math.round(distance * 10) / 10,
          cost: Math.round(distance * (5 + Math.random() * 5)),
          time: Math.round(distance * (0.05 + Math.random() * 0.1) * 10) / 10,
          capacity: 20 + Math.floor(Math.random() * 80)
        });
      }
    }
  }

  return { nodes, edges };
};

// ACO algorithm interface
export interface ACOParameters {
  iterations: number;
  antCount: number;
  evaporationRate: number;
  alpha: number;
  beta: number;
}

// Utility function to get node color based on type
export const getNodeColor = (type: string): string => {
  switch (type) {
    case 'supplier': return '#3b82f6'; // blue-500
    case 'manufacturer': return '#10b981'; // emerald-500
    case 'distributor': return '#8b5cf6'; // violet-500
    case 'retailer': return '#f59e0b'; // amber-500
    default: return '#6b7280'; // gray-500
  }
};

// API service for Python backend integration
export const apiService = {
  // Base URL for the Python API
  baseUrl: 'http://localhost:5000/api',
  
  // Get optimization results from Python backend
  async runOptimization(network: SupplyChainNetwork, params: ACOParameters): Promise<OptimizationResult> {
    try {
      const response = await fetch(`${this.baseUrl}/optimize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ network, params }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error running optimization:', error);
      throw error;
    }
  },
  
  // Get ML predictions from Python backend
  async getPrediction(network: SupplyChainNetwork, features: {
    nodeComplexity: number;
    routeVariability: number;
    demandVolatility: number;
  }): Promise<MLPrediction> {
    try {
      const response = await fetch(`${this.baseUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ network, features }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error getting ML prediction:', error);
      throw error;
    }
  },
};
