
import React from 'react';
import { Users, Package, FileText, BarChart3 } from 'lucide-react';
import StatsCard from './StatsCard';
import QuickAction from './QuickAction';

interface DashboardOverviewProps {
  onNavigate: (section: string) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigate }) => {
  const statsData = [
    { title: 'Total Clients', value: '1,234', icon: Users, colorScheme: 'blue' as const },
    { title: 'Produits', value: '856', icon: Package, colorScheme: 'green' as const },
    { title: 'Ordonnances', value: '342', icon: FileText, colorScheme: 'yellow' as const },
    { title: 'Ventes du mois', value: '€12,845', icon: BarChart3, colorScheme: 'purple' as const }
  ];

  const quickActions = [
    {
      title: 'Gérer les Clients',
      description: 'Ajouter, modifier, supprimer',
      icon: Users,
      colorScheme: 'blue' as const,
      action: 'clients'
    },
    {
      title: 'Gérer les Produits',
      description: 'Inventaire et catalogue',
      icon: Package,
      colorScheme: 'green' as const,
      action: 'products'
    },
    {
      title: 'Ordonnances',
      description: 'Gérer les prescriptions',
      icon: FileText,
      colorScheme: 'yellow' as const,
      action: 'ordonnances'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Tableau de bord Opticien</h2>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              colorScheme={stat.colorScheme}
            />
          ))}
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <QuickAction
              key={index}
              title={action.title}
              description={action.description}
              icon={action.icon}
              colorScheme={action.colorScheme}
              onClick={() => onNavigate(action.action)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
