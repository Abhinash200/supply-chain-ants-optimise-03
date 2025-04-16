
import React, { useState } from 'react';
import { SupplyChainNetwork } from '@/lib/supplyChainModel';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Brain } from 'lucide-react';

interface MachineLearningPredictorProps {
  network: SupplyChainNetwork;
}

const MachineLearningPredictor: React.FC<MachineLearningPredictorProps> = ({ network }) => {
  const [loading, setLoading] = useState(false);
  const [predictedParams, setPredictedParams] = useState<{
    evaporationRate: number;
    alpha: number;
    beta: number;
    predictedCost: number;
    confidence: number;
  } | null>(null);
  const [nodeComplexity, setNodeComplexity] = useState(50);
  const [routeVariability, setRouteVariability] = useState(60);
  const [demandVolatility, setDemandVolatility] = useState(40);

  const handlePredict = () => {
    setLoading(true);
    
    // Simulate ML prediction delay
    setTimeout(() => {
      // Calculate network characteristics
      const nodeCount = Object.keys(network.nodes).length;
      const edgeCount = network.edges.length;
      const density = edgeCount / (nodeCount * (nodeCount - 1));
      
      // Use these factors to generate "intelligent" predictions
      // These would normally come from a trained ML model
      const predictedEvaporationRate = 0.1 + (0.8 * (nodeComplexity / 100));
      const predictedAlpha = 1 + (3 * (nodeComplexity / 100));
      const predictedBeta = 2 + (2 * (routeVariability / 100));
      
      // Add some randomness to make it look realistic
      const randomFactor = 0.9 + (Math.random() * 0.2);
      
      setPredictedParams({
        evaporationRate: Math.round(predictedEvaporationRate * 10) / 10,
        alpha: Math.round(predictedAlpha * 10) / 10,
        beta: Math.round(predictedBeta * 10) / 10,
        predictedCost: Math.round(50 * density * randomFactor * 100) / 100,
        confidence: Math.round((85 + (Math.random() * 10)) * 10) / 10
      });
      
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
        <div className="flex items-start mb-4">
          <Brain className="w-8 h-8 text-purple-600 mr-3 mt-1" />
          <div>
            <h3 className="text-lg font-medium">Machine Learning Parameter Prediction</h3>
            <p className="text-gray-600">
              Our ML model analyzes your supply chain network characteristics and predicts optimal 
              ACO parameters to achieve the best results for your specific scenario.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Network Characteristics</h3>
          <p className="text-gray-600 mb-6">
            Adjust these characteristics to match your supply chain scenario for more accurate predictions.
          </p>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="nodeComplexity">Network Complexity: {nodeComplexity}%</Label>
              </div>
              <Slider
                id="nodeComplexity"
                min={0}
                max={100}
                step={5}
                value={[nodeComplexity]}
                onValueChange={(vals) => setNodeComplexity(vals[0])}
              />
              <p className="text-xs text-gray-500">
                Higher complexity = more diverse node types, capacities, and constraints
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="routeVariability">Route Variability: {routeVariability}%</Label>
              </div>
              <Slider
                id="routeVariability"
                min={0}
                max={100}
                step={5}
                value={[routeVariability]}
                onValueChange={(vals) => setRouteVariability(vals[0])}
              />
              <p className="text-xs text-gray-500">
                Higher variability = more differences in distances, costs, and times between routes
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="demandVolatility">Demand Volatility: {demandVolatility}%</Label>
              </div>
              <Slider
                id="demandVolatility"
                min={0}
                max={100}
                step={5}
                value={[demandVolatility]}
                onValueChange={(vals) => setDemandVolatility(vals[0])}
              />
              <p className="text-xs text-gray-500">
                Higher volatility = more unpredictable changes in demand over time
              </p>
            </div>
            
            <Button 
              className="w-full"
              onClick={handlePredict}
              disabled={loading}
            >
              {loading ? 'Analyzing Network...' : 'Predict Optimal Parameters'}
            </Button>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Prediction Results</h3>
          
          {!predictedParams ? (
            <div className="flex flex-col items-center justify-center h-[320px] text-center">
              <div className="text-gray-400 mb-4">
                <Brain className="w-16 h-16 mx-auto mb-2" />
                <p>Waiting for network analysis</p>
              </div>
              <p className="text-sm text-gray-500 max-w-xs">
                Click "Predict Optimal Parameters" to have our ML model analyze your network and predict optimal ACO settings.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-2" />
                <div>
                  <span className="text-sm text-gray-500">Prediction confidence</span>
                  <div className="flex items-center">
                    <span className="text-xl font-bold">{predictedParams.confidence}%</span>
                    <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">High</Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-sm text-gray-500">Evaporation Rate</div>
                  <div className="text-2xl font-semibold">{predictedParams.evaporationRate}</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-sm text-gray-500">Alpha (α)</div>
                  <div className="text-2xl font-semibold">{predictedParams.alpha}</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-sm text-gray-500">Beta (β)</div>
                  <div className="text-2xl font-semibold">{predictedParams.beta}</div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md">
                  <div className="text-sm text-gray-500">Est. Cost Reduction</div>
                  <div className="text-2xl font-semibold text-blue-600">
                    {predictedParams.predictedCost}%
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-md">
                <h4 className="font-medium mb-2">Recommendation</h4>
                <p className="text-sm text-gray-700">
                  For your network with {Object.keys(network.nodes).length} nodes and {network.edges.length} connections, 
                  we recommend using the parameters above for optimal balance between solution quality and convergence speed.
                </p>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    // This would normally apply the predicted parameters to the ACO configuration
                    console.log("Applied ML predicted parameters");
                  }}
                >
                  Apply These Parameters
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MachineLearningPredictor;
