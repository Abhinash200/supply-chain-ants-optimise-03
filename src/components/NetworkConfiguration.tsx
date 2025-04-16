
import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NetworkConfigurationProps {
  onRunOptimization: (params: {
    iterations: number;
    antCount: number;
    evaporationRate: number;
    alpha: number;
    beta: number;
  }) => void;
  onGenerateNewNetwork: (nodeCount: number, density: number) => void;
}

const NetworkConfiguration: React.FC<NetworkConfigurationProps> = ({ 
  onRunOptimization,
  onGenerateNewNetwork
}) => {
  const [nodeCount, setNodeCount] = useState(10);
  const [density, setDensity] = useState(0.4);
  const [iterations, setIterations] = useState(100);
  const [antCount, setAntCount] = useState(20);
  const [evaporationRate, setEvaporationRate] = useState(0.5);
  const [alpha, setAlpha] = useState(1);
  const [beta, setBeta] = useState(2);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Network Parameters</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="nodeCount">Node Count: {nodeCount}</Label>
          </div>
          <Slider
            id="nodeCount"
            min={5}
            max={30}
            step={1}
            value={[nodeCount]}
            onValueChange={(vals) => setNodeCount(vals[0])}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="density">Network Density: {density.toFixed(1)}</Label>
          </div>
          <Slider
            id="density"
            min={0.1}
            max={0.8}
            step={0.1}
            value={[density]}
            onValueChange={(vals) => setDensity(vals[0])}
          />
        </div>
        
        <Button 
          className="w-full"
          onClick={() => onGenerateNewNetwork(nodeCount, density)}
        >
          Generate New Network
        </Button>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">ACO Parameters</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="iterations">Iterations</Label>
            <Input
              id="iterations"
              type="number"
              min={10}
              max={1000}
              value={iterations}
              onChange={(e) => setIterations(parseInt(e.target.value) || 10)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="antCount">Ant Count</Label>
            <Input
              id="antCount"
              type="number"
              min={5}
              max={100}
              value={antCount}
              onChange={(e) => setAntCount(parseInt(e.target.value) || 5)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="evaporationRate">Pheromone Evaporation Rate: {evaporationRate.toFixed(1)}</Label>
          </div>
          <Slider
            id="evaporationRate"
            min={0.1}
            max={0.9}
            step={0.1}
            value={[evaporationRate]}
            onValueChange={(vals) => setEvaporationRate(vals[0])}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="alpha">Alpha (α): {alpha.toFixed(1)}</Label>
            </div>
            <Slider
              id="alpha"
              min={0.5}
              max={5}
              step={0.5}
              value={[alpha]}
              onValueChange={(vals) => setAlpha(vals[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="beta">Beta (β): {beta.toFixed(1)}</Label>
            </div>
            <Slider
              id="beta"
              min={0.5}
              max={5}
              step={0.5}
              value={[beta]}
              onValueChange={(vals) => setBeta(vals[0])}
            />
          </div>
        </div>
        
        <Button 
          className="w-full bg-green-600 hover:bg-green-700"
          onClick={() => onRunOptimization({
            iterations,
            antCount,
            evaporationRate,
            alpha,
            beta
          })}
        >
          Run Optimization
        </Button>
      </div>
    </div>
  );
};

export default NetworkConfiguration;
