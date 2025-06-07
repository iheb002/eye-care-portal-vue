
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuickActionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  colorScheme: 'blue' | 'green' | 'yellow';
}

const QuickAction: React.FC<QuickActionProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  onClick, 
  colorScheme 
}) => {
  const getColorClasses = (scheme: string) => {
    const colors = {
      blue: 'bg-blue-600 hover:bg-blue-700',
      green: 'bg-green-600 hover:bg-green-700',
      yellow: 'bg-yellow-600 hover:bg-yellow-700'
    };
    return colors[scheme] || colors.blue;
  };

  return (
    <Button 
      onClick={onClick}
      className={`h-16 text-left justify-start ${getColorClasses(colorScheme)}`}
    >
      <Icon className="mr-3 h-5 w-5" />
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-xs opacity-80">{description}</div>
      </div>
    </Button>
  );
};

export default QuickAction;
