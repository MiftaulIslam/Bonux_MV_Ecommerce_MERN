import React, { useState } from 'react';
import { CheckIcon } from '../../widgets/icons';
import { Link, useLocation } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SellerHome = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [emailAdded, setEmailAdded] = useState(false);
  const [storeAdded, setStoreAdded] = useState(false);
  const [productAdded, setProductAdded] = useState(false);

  const query = useQuery();
  const type = query.get("type") || "";

  const steps = [
    {
      title: 'Email',
      Success: emailAdded,
      description: 'Input an email to receive crucial updates and notifications',
      svg: <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
      </svg>
    },
    {
      title: 'Store',
      Success: storeAdded,
      description: 'Add a pick up address',
      svg: <svg fill="#9ca3af " width="6rem" height="6rem" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <path d="M28,30H16V22H14v8H8V22H6v8a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V22H28Z"></path>
        <path d="M33.79,13.27,29.71,5.11A2,2,0,0,0,27.92,4H8.08A2,2,0,0,0,6.29,5.11L2.21,13.27a2,2,0,0,0-.21.9v3.08a2,2,0,0,0,.46,1.28A4.67,4.67,0,0,0,6,20.13a4.72,4.72,0,0,0,3-1.07,4.73,4.73,0,0,0,6,0,4.73,4.73,0,0,0,6,0,4.73,4.73,0,0,0,6,0,4.72,4.72,0,0,0,6.53-.52A2,2,0,0,0,34,17.26V14.17A2,2,0,0,0,33.79,13.27Z"></path>
      </svg>
    },
    {
      title: 'Product',
      Success: productAdded,
      description: 'Upload your first product',
      svg: <svg width="6rem" height="6rem" fill='#9ca3af' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 3H2v6h1v11c0 1.105.895 2 2 2h14c1.105 0 2-.895 2-2V9h1V3zM4 5h16v2H4V5zm15 15H5V9h14v11zM9 11h6c0 1.105-.895 2-2 2h-2c-1.105 0-2-.895-2-2z" /></svg>
    },
  ];

  const handleStepClick = (stepNumber) => {
    setCurrentStep(stepNumber);
    setEmailAdded(false);
    setStoreAdded(false);
    setProductAdded(false);
  };

  const renderStepContent = (step) => {
    return (
      <div className="bg-white rounded-lg p-6 text-black">
        <div className="flex justify-center mb-4">
          {step.svg}
        </div>
        <p className="text-center text-gray-700 text-lg mb-4">{step.description}</p>
        <div className='text-center'>
          <button
            className="bg-blue-500 text-white py-2 px-10 rounded-md hover:bg-blue-600 transition-colors"
            onClick={() => {
              if (step.title === 'Email') setEmailAdded(true);
              if (step.title === 'Store') setStoreAdded(true);
              if (step.title === 'Product') setProductAdded(true);
            }}
          >
            View
          </button>
        </div>
        {step.Success && (
          <div className="mt-4 flex items-center justify-center text-green-500">
            <CheckIcon className="w-5 h-5 mr-2" />
            <span>{`${step.title} added successfully`}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 text-black rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Welcome</h1>
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center cursor-pointer" onClick={() => handleStepClick(index)}>
            <Link to={`?type=${step.title.toLowerCase()}`} className={`w-8 h-8 border border-gray-500 rounded-full flex items-center justify-center mb-2`}>
              {step.Success ? (
                <CheckIcon className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </Link>
            <span className="text-sm font-bold">{step.title}</span>
          </div>
        ))}
      </div>
      {steps[currentStep].title && renderStepContent(steps[currentStep])}
    </div>
  );
};

export default SellerHome;
