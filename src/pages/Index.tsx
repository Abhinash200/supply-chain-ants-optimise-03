
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import SupplyChainVisualization from '@/components/SupplyChainVisualization';
import ACOSimulation from '@/components/ACOSimulation';
import DataAnalysis from '@/components/DataAnalysis';
import MachineLearningPredictor from '@/components/MachineLearningPredictor';
import NetworkConfiguration from '@/components/NetworkConfiguration';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SupplyChainNetwork, generateRandomNetwork } from '@/lib/supplyChainModel';

const Index = () => {
  const [network, setNetwork] = useState<SupplyChainNetwork>(() => generateRandomNetwork(10, 0.4));
  const [optimizationResults, setOptimizationResults] = useState<{
    bestPath: number[];
    pathCost: number;
    convergenceData: { iteration: number; bestCost: number }[];
  } | null>(null);

  const runOptimization = (params: {
    iterations: number;
    antCount: number;
    evaporationRate: number;
    alpha: number;
    beta: number;
  }) => {
    console.log("Running optimization with params:", params);
    
    // Simulate optimization process
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
        </header>

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
              <h2 className="text-xl font-semibold mb-4">Ant Colony Optimization Simulation</h2>
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
            Built with React, Tailwind CSS, and advanced visualization libraries.
            <br />
            Python integration simulated for demonstration purposes.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
