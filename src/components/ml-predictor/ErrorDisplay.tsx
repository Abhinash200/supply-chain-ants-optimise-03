
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorDisplayProps {
  errorMessage: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errorMessage }) => {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-start">
      <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
      <div>
        <h4 className="font-medium">Backend Connection Error</h4>
        <p className="text-sm">{errorMessage}</p>
        <p className="text-sm mt-2">
          To run the Python backend:
          <ol className="list-decimal list-inside mt-1 ml-2">
            <li>Navigate to the python_backend directory</li>
            <li>Run <code className="bg-red-100 px-1 rounded">pip install -r requirements.txt</code></li>
            <li>Start the server with <code className="bg-red-100 px-1 rounded">python app.py</code></li>
          </ol>
        </p>
      </div>
    </div>
  );
};

export default ErrorDisplay;
