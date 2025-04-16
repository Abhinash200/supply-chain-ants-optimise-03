
import React from 'react';
import { Brain } from 'lucide-react';

const MLIntroduction: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
      <div className="flex items-start mb-4">
        <Brain className="w-8 h-8 text-purple-600 mr-3 mt-1" />
        <div>
          <h3 className="text-lg font-medium">Machine Learning Parameter Prediction</h3>
          <p className="text-gray-600">
            Our Python-powered ML model analyzes your supply chain network characteristics and predicts optimal 
            ACO parameters using NumPy, Pandas, and PyTorch for accurate results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MLIntroduction;
