
import React, { useState } from 'react';
import { SupplyChainNetwork, apiService } from '@/lib/supplyChainModel';
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

// Import refactored components
import NetworkCharacteristicsForm from './ml-predictor/NetworkCharacteristicsForm';
import PredictionResults from './ml-predictor/PredictionResults';
import ErrorDisplay from './ml-predictor/ErrorDisplay';
import MLIntroduction from './ml-predictor/MLIntroduction';

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
  const [apiError, setApiError] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePredict = async () => {
    setLoading(true);
    setApiError(null);
    
    try {
      // Call the Python ML API
      const prediction = await apiService.getPrediction(network, {
        nodeComplexity,
        routeVariability,
        demandVolatility
      });
      
      setPredictedParams(prediction);
      toast({
        title: "Prediction Complete",
        description: "ML parameters have been predicted successfully.",
        variant: "default",
      });
    } catch (error) {
      console.error('Prediction error:', error);
      setApiError('Failed to connect to Python backend. Make sure your Python server is running.');
      toast({
        title: "Prediction Failed",
        description: "Could not connect to the Python ML backend.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Calculate network stats for the prediction results
  const networkNodeCount = Object.keys(network.nodes).length;
  const networkEdgeCount = network.edges.length;

  return (
    <div className="space-y-6">
      <MLIntroduction />

      {apiError && <ErrorDisplay errorMessage={apiError} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Network Characteristics</h3>
          <p className="text-gray-600 mb-6">
            Adjust these characteristics to match your supply chain scenario for more accurate predictions.
          </p>
          
          <NetworkCharacteristicsForm
            nodeComplexity={nodeComplexity}
            setNodeComplexity={setNodeComplexity}
            routeVariability={routeVariability}
            setRouteVariability={setRouteVariability}
            demandVolatility={demandVolatility}
            setDemandVolatility={setDemandVolatility}
            handlePredict={handlePredict}
            loading={loading}
          />
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Prediction Results</h3>
          
          <PredictionResults
            predictedParams={predictedParams}
            networkNodeCount={networkNodeCount}
            networkEdgeCount={networkEdgeCount}
          />
        </Card>
      </div>
    </div>
  );
};

export default MachineLearningPredictor;
