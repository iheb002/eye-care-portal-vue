
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TableHeaderProps {
  title: string;
  buttonText: string;
  onAddClick: () => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  buttonText,
  onAddClick
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
      <Button 
        onClick={onAddClick}
        className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
      >
        <Plus className="h-4 w-4 mr-2" />
        {buttonText}
      </Button>
    </div>
  );
};

export default TableHeader;
