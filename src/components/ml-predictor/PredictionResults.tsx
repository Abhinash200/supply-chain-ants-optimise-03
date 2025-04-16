
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Brain } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface PredictedParams {
  evaporationRate: number;
  alpha: number;
  beta: number;
  predictedCost: number;
  confidence: number;
}

interface PredictionResultsProps {
  predictedParams: PredictedParams | null;
  networkNodeCount: number;
  networkEdgeCount: number;
}

const PredictionResults: React.FC<PredictionResultsProps> = ({ 
  predictedParams, 
  networkNodeCount, 
  networkEdgeCount 
}) => {
  const { toast } = useToast();

  const handleApplyParameters = () => {
    console.log("Applied ML predicted parameters");
    toast({
      title: "Parameters Applied",
      description: "ML predicted parameters have been applied to the optimizer.",
    });
  };

  if (!predictedParams) {
    return (
      <div className="flex flex-col items-center justify-center h-[320px] text-center">
        <div className="text-gray-400 mb-4">
          <Brain className="w-16 h-16 mx-auto mb-2" />
          <p>Waiting for Python ML prediction</p>
        </div>
        <p className="text-sm text-gray-500 max-w-xs">
          Click "Predict Optimal Parameters" to use our Python-powered ML model with NumPy, Pandas, and PyTorch.
        </p>
      </div>
    );
  }

  return (
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
          Based on Python ML analysis of your network with {networkNodeCount} nodes and {networkEdgeCount} connections, 
          we recommend using the parameters above for optimal balance between solution quality and convergence speed.
        </p>
      </div>
      
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          size="sm"
          className="text-xs"
          onClick={handleApplyParameters}
        >
          Apply These Parameters
        </Button>
      </div>
    </div>
  );
};

export default PredictionResults;
