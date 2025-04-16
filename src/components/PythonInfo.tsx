
import React from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code } from "@/components/ui/code";

const PythonInfo: React.FC = () => {
  return (
    <div className="space-y-6 mt-8">
      <h2 className="text-2xl font-semibold">Python Backend Setup</h2>
      <p className="text-gray-600">
        This application uses a Python backend to provide real machine learning capabilities and optimization 
        algorithms. Follow the setup instructions below to get your Python backend running.
      </p>
      
      <Tabs defaultValue="setup">
        <TabsList>
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="code">Python Code</TabsTrigger>
          <TabsTrigger value="libraries">Libraries</TabsTrigger>
        </TabsList>
        
        <TabsContent value="setup" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Getting Started</h3>
            <ol className="space-y-4 list-decimal list-inside">
              <li>
                <strong>Clone the Python backend repository:</strong>
                <pre className="bg-gray-100 p-3 rounded-md my-2 overflow-x-auto">
                  <code>git clone https://github.com/yourusername/supply-chain-aco-backend.git
cd supply-chain-aco-backend</code>
                </pre>
              </li>
              
              <li>
                <strong>Create a virtual environment (recommended):</strong>
                <pre className="bg-gray-100 p-3 rounded-md my-2 overflow-x-auto">
                  <code>python -m venv venv
# On Windows
venv\Scripts\activate
# On MacOS/Linux
source venv/bin/activate</code>
                </pre>
              </li>
              
              <li>
                <strong>Install requirements:</strong>
                <pre className="bg-gray-100 p-3 rounded-md my-2 overflow-x-auto">
                  <code>pip install -r requirements.txt</code>
                </pre>
              </li>
              
              <li>
                <strong>Start the server:</strong>
                <pre className="bg-gray-100 p-3 rounded-md my-2 overflow-x-auto">
                  <code>python app.py</code>
                </pre>
                <p className="text-sm text-gray-600">
                  The server will start at http://localhost:5000 by default
                </p>
              </li>
            </ol>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">File Structure</h3>
            <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
              <code>python_backend/
├── app.py                # Main Flask application
├── requirements.txt      # Python dependencies
├── models/
│   ├── aco.py            # Ant Colony Optimization implementation
│   └── ml_predictor.py   # Machine Learning model for parameter prediction
├── utils/
│   ├── network.py        # Supply chain network utilities
│   └── visualization.py  # Data visualization utilities
└── data/
    └── sample_network.json</code>
            </pre>
          </Card>
        </TabsContent>
        
        <TabsContent value="code">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Python ACO Implementation</h3>
            <p className="text-gray-600 mb-4">
              The backend uses NumPy and SciPy for efficient implementation of the Ant Colony Optimization algorithm.
            </p>
            <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
              <code>import numpy as np
from scipy.spatial.distance import pdist, squareform

class AntColonyOptimizer:
    def __init__(self, distances, n_ants, decay, alpha=1, beta=1):
        """
        Initialize ACO algorithm with parameters
        """
        self.distances = distances
        self.pheromones = np.ones(distances.shape) / len(distances)
        self.n_ants = n_ants
        self.decay = decay
        self.alpha = alpha
        self.beta = beta
        self.best_path = None
        self.best_cost = float('inf')
        self.history = []
        
    def run(self, n_iterations):
        """
        Run the ACO algorithm for n_iterations
        """
        for iteration in range(n_iterations):
            paths, costs = self._generate_paths()
            self._update_pheromones(paths, costs)
            
            # Track best solution
            best_idx = np.argmin(costs)
            if costs[best_idx] < self.best_cost:
                self.best_cost = costs[best_idx]
                self.best_path = paths[best_idx]
            
            # Record history
            self.history.append({
                'iteration': iteration + 1,
                'best_cost': self.best_cost
            })
            
        return self.best_path, self.best_cost, self.history</code>
            </pre>
          </Card>
        </TabsContent>
        
        <TabsContent value="libraries">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Python Libraries Used</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-md">
                  <h4 className="font-medium text-blue-800">NumPy</h4>
                  <p className="text-sm">
                    Used for efficient array operations and mathematical calculations in the ACO algorithm.
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-md">
                  <h4 className="font-medium text-green-800">Pandas</h4>
                  <p className="text-sm">
                    Used for data manipulation and analysis of supply chain network data.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-md">
                  <h4 className="font-medium text-purple-800">PyTorch</h4>
                  <p className="text-sm">
                    Used for building and training the ML model that predicts optimal ACO parameters.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-md">
                  <h4 className="font-medium text-red-800">Matplotlib</h4>
                  <p className="text-sm">
                    Used for creating visualizations of optimization results and network graphs.
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-md">
                  <h4 className="font-medium text-yellow-800">Flask</h4>
                  <p className="text-sm">
                    Used to create the REST API that connects the Python backend with the React frontend.
                  </p>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-md">
                  <h4 className="font-medium text-indigo-800">SciPy</h4>
                  <p className="text-sm">
                    Used for scientific computing functions like distance calculations and optimization.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PythonInfo;
