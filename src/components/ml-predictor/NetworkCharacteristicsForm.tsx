
import React from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface NetworkCharacteristicsFormProps {
  nodeComplexity: number;
  setNodeComplexity: (value: number) => void;
  routeVariability: number;
  setRouteVariability: (value: number) => void;
  demandVolatility: number;
  setDemandVolatility: (value: number) => void;
  handlePredict: () => void;
  loading: boolean;
}

const NetworkCharacteristicsForm: React.FC<NetworkCharacteristicsFormProps> = ({
  nodeComplexity,
  setNodeComplexity,
  routeVariability,
  setRouteVariability,
  demandVolatility,
  setDemandVolatility,
  handlePredict,
  loading
}) => {
  return (
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
        {loading ? 'Connecting to Python Backend...' : 'Predict Optimal Parameters'}
      </Button>
    </div>
  );
};

export default NetworkCharacteristicsForm;
