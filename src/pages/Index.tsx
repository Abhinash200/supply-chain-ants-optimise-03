
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SupplyChainVisualization from '@/components/SupplyChainVisualization';
import ACOSimulation from '@/components/ACOSimulation';
import DataAnalysis from '@/components/DataAnalysis';
import MachineLearningPredictor from '@/components/MachineLearningPredictor';
import NetworkConfiguration from '@/components/NetworkConfiguration';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SupplyChainNetwork, generateRandomNetwork, apiService } from '@/lib/supplyChainModel';
import { Server, AlertCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [network, setNetwork] = useState<SupplyChainNetwork>(() => generateRandomNetwork(10, 0.4));
  const [optimizationResults, setOptimizationResults] = useState<{
    bestPath: number[];
    pathCost: number;
    convergenceData: { iteration: number; bestCost: number }[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { toast } = useToast();

  const runOptimization = async (params: {
    iterations: number;
    antCount: number;
    evaporationRate: number;
    alpha: number;
    beta: number;
  }) => {
    setIsLoading(true);
    setApiError(null);
    
    try {
      console.log("Running optimization with params:", params);
      
      // Call the Python backend API
      const results = await apiService.runOptimization(network, params);
      setOptimizationResults(results);
      
      toast({
        title: "Optimization Complete",
        description: `Found solution with cost: ${results.pathCost.toFixed(2)}`,
      });
    } catch (error) {
      console.error('API error:', error);
      setApiError('Failed to connect to Python backend. Make sure your Python server is running.');
      
      // Fallback to client-side simulation if API fails
      const iterations = Array.from({ length: params.iterations }, (_, i) => i + 1);
      const bestCosts = iterations.map(i => {
        // Simulate decreasing costs with some randomness
        return 100 * Math.exp(-0.05 * i) * (1 + 0.2 * Math.random());
      });
      
      // Generate a random path
      const nodes = Object.keys(network.nodes).map(id => parseInt(id));
      const shuffledNodes = [...nodes].sort(() => Math.random() - 0.5);
      
      setOptimizationResults({
        bestPath: shuffledNodes,
        pathCost: bestCosts[bestCosts.length - 1],
        convergenceData: iterations.map((iteration, index) => ({
          iteration,
          bestCost: bestCosts[index]
        }))
      });
      
      toast({
        title: "Using Simulated Data",
        description: "Could not connect to Python backend. Using simulated results instead.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Supply Chain Optimization with Ant Colony Algorithm
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Visualize and optimize supply chain networks using ant colony optimization, 
            data analysis, and machine learning predictions.
          </p>
          <div className="mt-4">
            <Link to="/python-backend">
              <Button variant="outline" className="flex items-center">
                <Server className="h-4 w-4 mr-2" />
                Python Backend Setup
              </Button>
            </Link>
          </div>
        </header>

        {apiError && (
          <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-700 p-4 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium">Using Simulated Results</h4>
              <p className="text-sm">{apiError}</p>
              <div className="mt-2">
                <Link to="/python-backend">
                  <Button variant="outline" size="sm" className="text-xs">
                    View Python Setup Instructions
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 col-span-1">
            <h2 className="text-xl font-semibold mb-4">Network Configuration</h2>
            <NetworkConfiguration 
              onRunOptimization={runOptimization}
              onGenerateNewNetwork={(nodeCount, density) => {
                setNetwork(generateRandomNetwork(nodeCount, density));
                setOptimizationResults(null);
              }}
            />
          </Card>
          
          <Card className="p-6 col-span-1 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Supply Chain Network</h2>
            <SupplyChainVisualization 
              network={network} 
              optimizedPath={optimizationResults?.bestPath || []}
            />
          </Card>
        </div>

        <Tabs defaultValue="simulation" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="simulation">ACO Simulation</TabsTrigger>
            <TabsTrigger value="analysis">Data Analysis</TabsTrigger>
            <TabsTrigger value="prediction">ML Prediction</TabsTrigger>
          </TabsList>
          
          <TabsContent value="simulation">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {isLoading ? "Running Python Optimization..." : "Ant Colony Optimization Simulation"}
              </h2>
              <ACOSimulation 
                network={network}
                optimizationResults={optimizationResults}
              />
            </Card>
          </TabsContent>
          
          <TabsContent value="analysis">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Optimization Data Analysis</h2>
              <DataAnalysis optimizationResults={optimizationResults} />
            </Card>
          </TabsContent>
          
          <TabsContent value="prediction">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Parameter Prediction with Machine Learning</h2>
              <MachineLearningPredictor network={network} />
            </Card>
          </TabsContent>
        </Tabs>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>
            Built with React, Python, NumPy, Pandas, PyTorch, and Flask.
            <br />
            A complete end-to-end solution for supply chain optimization.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
