
import React from 'react';
import { X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { menuItems, MenuItem } from './MenuItems';

interface SidebarProps {
  activeSection: string;
  sidebarOpen: boolean;
  onSectionChange: (section: string) => void;
  onSidebarToggle: () => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  sidebarOpen,
  onSectionChange,
  onSidebarToggle,
  onLogout
}) => {
  return (
    <div className={`
      fixed lg:static inset-y-0 left-0 z-50
      w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold text-gray-800">OptiPanel</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={onSidebarToggle}
          className="lg:hidden"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <nav className="mt-6 px-4">
        <div className="space-y-2">
          {menuItems.map((item: MenuItem) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  onSidebarToggle();
                }}
                className={`
                  w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors
                  ${activeSection === item.id 
                    ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <Icon className="mr-3 h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
      
      {/* Logout Button */}
      <div className="absolute bottom-4 left-4 right-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
