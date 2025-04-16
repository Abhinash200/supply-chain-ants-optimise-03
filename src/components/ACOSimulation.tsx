
import React, { useState, useEffect } from 'react';
import { SupplyChainNetwork } from '@/lib/supplyChainModel';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Play, Pause, SkipForward } from 'lucide-react';

interface ACOSimulationProps {
  network: SupplyChainNetwork;
  optimizationResults: {
    bestPath: number[];
    pathCost: number;
    convergenceData: { iteration: number; bestCost: number }[];
  } | null;
}

const ACOSimulation: React.FC<ACOSimulationProps> = ({ network, optimizationResults }) => {
  const [simulationStep, setSimulationStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1000); // ms between steps
  const maxSteps = optimizationResults?.convergenceData.length || 0;

  // Handle simulation playback
  useEffect(() => {
    if (!isPlaying || !optimizationResults) return;
    
    const timer = setTimeout(() => {
      if (simulationStep < maxSteps - 1) {
        setSimulationStep(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, simulationSpeed);
    
    return () => clearTimeout(timer);
  }, [isPlaying, simulationStep, maxSteps, simulationSpeed, optimizationResults]);

  // Reset simulation step when new optimization results come in
  useEffect(() => {
    setSimulationStep(0);
    setIsPlaying(false);
  }, [optimizationResults]);

  if (!optimizationResults) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
        <h3 className="text-lg font-medium mb-2">No Optimization Data Available</h3>
        <p className="text-gray-600 mb-4">
          Configure network parameters and run optimization to see the ant colony algorithm in action.
        </p>
      </div>
    );
  }

  const currentCost = optimizationResults.convergenceData[simulationStep]?.bestCost || 0;
  const percentImprovement = optimizationResults.convergenceData[0]?.bestCost 
    ? 100 * (1 - currentCost / optimizationResults.convergenceData[0].bestCost)
    : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Simulation Progress</span>
              <span>Iteration {simulationStep + 1} of {maxSteps}</span>
            </div>
            <Progress value={(simulationStep + 1) / maxSteps * 100} />
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <Button 
              size="icon" 
              variant="outline"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <Button 
              size="icon" 
              variant="outline"
              onClick={() => {
                setSimulationStep(maxSteps - 1);
                setIsPlaying(false);
              }}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            
            <div className="flex-1">
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={simulationSpeed}
                onChange={(e) => setSimulationSpeed(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Fast</span>
                <span>Slow</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="text-sm text-gray-500">Current Best Cost</div>
              <div className="text-2xl font-semibold">{currentCost.toFixed(2)}</div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-md">
              <div className="text-sm text-gray-500">Improvement</div>
              <div className="text-2xl font-semibold text-green-600">
                {percentImprovement.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Current Best Path</h3>
        <div className="bg-gray-50 p-4 rounded-md overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {optimizationResults.bestPath.map((nodeId, index) => {
              const node = network.nodes[nodeId];
              if (!node) return null;
              
              return (
                <React.Fragment key={nodeId}>
                  <div 
                    className="flex flex-col items-center"
                    style={{
                      opacity: simulationStep > 0 ? 1 : 0.5
                    }}
                  >
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium"
                      style={{ backgroundColor: simulationStep > 0 ? '#10b981' : '#9ca3af' }}
                    >
                      {nodeId}
                    </div>
                    <div className="text-xs mt-1">{node.type}</div>
                  </div>
                  
                  {index < optimizationResults.bestPath.length - 1 && (
                    <div className="flex items-center">
                      <div 
                        className="w-8 h-0.5"
                        style={{ 
                          backgroundColor: simulationStep > 0 ? '#10b981' : '#d1d5db',
                          opacity: simulationStep > 0 ? 1 : 0.5
                        }}
                      ></div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-md">
          <h4 className="font-medium mb-2">About Ant Colony Optimization</h4>
          <p className="text-sm text-gray-700">
            Ant Colony Optimization (ACO) is inspired by the foraging behavior of ants. As ants travel, they deposit pheromones, 
            creating paths that other ants can follow. In our simulation, virtual ants explore all possible routes through the 
            supply chain network. Better routes receive more pheromones, attracting more ants, while pheromones on less optimal 
            routes evaporate over time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ACOSimulation;
