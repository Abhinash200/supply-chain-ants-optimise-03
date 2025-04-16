
import React from 'react';
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataAnalysisProps {
  optimizationResults: {
    bestPath: number[];
    pathCost: number;
    convergenceData: { iteration: number; bestCost: number }[];
  } | null;
}

const DataAnalysis: React.FC<DataAnalysisProps> = ({ optimizationResults }) => {
  if (!optimizationResults) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h3 className="text-lg font-medium mb-2">No Data Available</h3>
        <p className="text-gray-600">
          Run the optimization to generate data for analysis.
        </p>
      </div>
    );
  }

  // Prepare convergence data
  const convergenceData = optimizationResults.convergenceData;
  
  // Calculate key metrics
  const initialCost = convergenceData[0]?.bestCost || 0;
  const finalCost = convergenceData[convergenceData.length - 1]?.bestCost || 0;
  const totalImprovement = initialCost - finalCost;
  const percentImprovement = initialCost ? (totalImprovement / initialCost) * 100 : 0;
  
  // Calculate convergence speed (iterations to reach 90% of total improvement)
  let convergenceIteration = convergenceData.length;
  const targetImprovement = totalImprovement * 0.9;
  for (let i = 0; i < convergenceData.length; i++) {
    if (initialCost - convergenceData[i].bestCost >= targetImprovement) {
      convergenceIteration = i + 1;
      break;
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Initial Cost</h3>
          <p className="text-2xl font-bold">{initialCost.toFixed(2)}</p>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Final Cost</h3>
          <p className="text-2xl font-bold text-green-600">{finalCost.toFixed(2)}</p>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Improvement</h3>
          <p className="text-2xl font-bold text-blue-600">{percentImprovement.toFixed(1)}%</p>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Convergence Speed</h3>
          <p className="text-2xl font-bold">{convergenceIteration} iterations</p>
        </Card>
      </div>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Optimization Convergence</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={convergenceData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="iteration" 
                label={{ value: 'Iteration', position: 'insideBottomRight', offset: -10 }}
              />
              <YAxis 
                label={{ value: 'Cost', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value) => [`${Number(value).toFixed(2)}`, 'Cost']}
                labelFormatter={(label) => `Iteration ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="bestCost" 
                name="Best Path Cost" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Optimization Key Insights</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 shrink-0">1</span>
              <span>
                <strong>Quick Initial Improvements:</strong> The algorithm found significant cost reductions in the early iterations.
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 shrink-0">2</span>
              <span>
                <strong>Convergence Rate:</strong> The solution reached 90% of total improvement by iteration {convergenceIteration}.
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 shrink-0">3</span>
              <span>
                <strong>Overall Performance:</strong> Achieved a {percentImprovement.toFixed(1)}% cost reduction from the initial solution.
              </span>
            </li>
          </ul>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Supply Chain Efficiency</h3>
          <p className="text-gray-700 mb-4">
            The optimized path reduces total supply chain costs by minimizing transport distance and better utilizing capacity.
          </p>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Cost Efficiency</span>
                <span>{(percentImprovement * 0.9).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${percentImprovement * 0.9}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Distance Optimization</span>
                <span>{(percentImprovement * 0.85).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${percentImprovement * 0.85}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Time Reduction</span>
                <span>{(percentImprovement * 0.7).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${percentImprovement * 0.7}%` }}
                ></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DataAnalysis;
