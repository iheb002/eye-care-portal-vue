
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  colorScheme: 'blue' | 'green' | 'yellow' | 'purple';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, colorScheme }) => {
  const getColorClasses = (scheme: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-600 text-blue-900',
      green: 'bg-green-50 border-green-200 text-green-600 text-green-900',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-600 text-yellow-900',
      purple: 'bg-purple-50 border-purple-200 text-purple-600 text-purple-900'
    };
    return colors[scheme] || colors.blue;
  };

  const classes = getColorClasses(colorScheme).split(' ');
  
  return (
    <div className={`${classes[0]} p-4 rounded-lg border ${classes[1]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`${classes[2]} text-sm font-medium`}>{title}</p>
          <p className={`text-2xl font-bold ${classes[3]}`}>{value}</p>
        </div>
        <Icon className={`h-8 w-8 ${classes[2]}`} />
      </div>
    </div>
  );
};

export default StatsCard;
