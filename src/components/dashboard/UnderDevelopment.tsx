
import React from 'react';

interface UnderDevelopmentProps {
  title: string;
  description?: string;
}

const UnderDevelopment: React.FC<UnderDevelopmentProps> = ({ 
  title, 
  description = "Section en cours de développement..." 
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default UnderDevelopment;
