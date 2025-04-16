
import React from 'react';
import { Card } from "@/components/ui/card";
import PythonInfo from '@/components/PythonInfo';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const PythonBackend = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/">
            <Button variant="outline" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to App
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Python Backend Integration
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">About This Integration</h2>
            <p className="text-gray-600 mb-4">
              This application demonstrates a real-world implementation of Supply Chain Optimization 
              using Ant Colony Algorithms powered by Python. The frontend is built with React, 
              while all the heavy computational work happens in a separate Python backend.
            </p>
            
            <h3 className="text-lg font-medium mt-6 mb-3">Key Features:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
              <li>
                <strong>Real Python Backend:</strong> Uses NumPy, Pandas, PyTorch, and Matplotlib for authentic data science capabilities
              </li>
              <li>
                <strong>Machine Learning:</strong> PyTorch model predicts optimal parameters for the ACO algorithm
              </li>
              <li>
                <strong>Data Processing:</strong> Pandas dataframes process and analyze supply chain data
              </li>
              <li>
                <strong>Visualization:</strong> Matplotlib creates detailed analytics visualizations
              </li>
              <li>
                <strong>REST API:</strong> Flask provides a clean API interface between Python and React
              </li>
            </ul>
            
            <div className="flex justify-end">
              <Button variant="outline" className="flex items-center">
                <Github className="h-4 w-4 mr-2" />
                View Python Code on GitHub
              </Button>
            </div>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Python Environment</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm text-gray-500">Python Version</div>
                <div className="font-mono">3.8+</div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm text-gray-500">Environment</div>
                <div className="font-mono">venv / conda</div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm text-gray-500">API Endpoint</div>
                <div className="font-mono">http://localhost:5000/api</div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-md">
                <h4 className="font-medium mb-2">Required Packages</h4>
                <ul className="text-sm space-y-1 font-mono">
                  <li>numpy&gt;=1.20.0</li>
                  <li>pandas&gt;=1.3.0</li>
                  <li>torch&gt;=1.9.0</li>
                  <li>flask&gt;=2.0.0</li>
                  <li>matplotlib&gt;=3.4.0</li>
                  <li>scipy&gt;=1.7.0</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <PythonInfo />

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>
            Built with React, Python, NumPy, Pandas, PyTorch, and Flask.
            <br />
            A complete end-to-end solution for supply chain optimization.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PythonBackend;
