
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { menuItems } from './MenuItems';

interface HeaderProps {
  activeSection: string;
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onSidebarToggle }) => {
  const getSectionTitle = () => {
    if (activeSection === 'dashboard') return 'Tableau de bord';
    return menuItems.find(item => item.id === activeSection)?.label || 'Section';
  };

  return (
    <header className="bg-white shadow-sm border-b px-4 py-3 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSidebarToggle}
            className="lg:hidden mr-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-semibold text-gray-800">
            {getSectionTitle()}
          </h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block text-sm text-gray-600">
            Bienvenue, Opticien
          </div>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">O</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
