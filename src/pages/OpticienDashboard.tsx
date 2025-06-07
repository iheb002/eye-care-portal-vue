
import React from 'react';
import ProductsTable from '@/components/ProductsTable';
import ClientsTable from '@/components/ClientsTable';
import OrdonnancesTable from '@/components/OrdonnancesTable';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import UnderDevelopment from '@/components/dashboard/UnderDevelopment';
import { useDashboard } from '@/hooks/useDashboard';

const OpticienDashboard = () => {
  const {
    activeSection,
    sidebarOpen,
    handleLogout,
    handleSectionChange,
    toggleSidebar
  } = useDashboard();

  const renderContent = () => {
    switch (activeSection) {
      case 'clients':
        return <ClientsTable />;
      case 'products':
        return <ProductsTable />;
      case 'ordonnances':
        return <OrdonnancesTable />;
      case 'analytics':
        return <UnderDevelopment title="Analytique" />;
      case 'settings':
        return <UnderDevelopment title="Paramètres" />;
      default:
        return <DashboardOverview onNavigate={handleSectionChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        sidebarOpen={sidebarOpen}
        onSectionChange={handleSectionChange}
        onSidebarToggle={toggleSidebar}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <Header
          activeSection={activeSection}
          onSidebarToggle={toggleSidebar}
        />

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default OpticienDashboard;
