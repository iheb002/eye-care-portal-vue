import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Package, 
  FileText, 
  BarChart3, 
  Settings, 
  Menu,
  X,
  Home,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductsTable from '@/components/ProductsTable';
import ClientsTable from '@/components/ClientsTable';
import OrdonnancesTable from '@/components/OrdonnancesTable';

const OpticienDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: Home },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'products', label: 'Produits', icon: Package },
    { id: 'ordonnances', label: 'Ordonnances', icon: FileText },
    { id: 'analytics', label: 'Analytique', icon: BarChart3 },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'clients':
        return <ClientsTable />;
      case 'products':
        return <ProductsTable />;
      case 'ordonnances':
        return <OrdonnancesTable />;
      case 'analytics':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Analytique</h2>
            <p className="text-gray-600">Section analytique en cours de développement...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Paramètres</h2>
            <p className="text-gray-600">Section paramètres en cours de développement...</p>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            {/* Dashboard Overview */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Tableau de bord Opticien</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Total Clients</p>
                      <p className="text-2xl font-bold text-blue-900">1,234</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Produits</p>
                      <p className="text-2xl font-bold text-green-900">856</p>
                    </div>
                    <Package className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-600 text-sm font-medium">Ordonnances</p>
                      <p className="text-2xl font-bold text-yellow-900">342</p>
                    </div>
                    <FileText className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">Ventes du mois</p>
                      <p className="text-2xl font-bold text-purple-900">€12,845</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button 
                  onClick={() => setActiveSection('clients')}
                  className="h-16 text-left justify-start bg-blue-600 hover:bg-blue-700"
                >
                  <Users className="mr-3 h-5 w-5" />
                  <div>
                    <div className="font-medium">Gérer les Clients</div>
                    <div className="text-xs opacity-80">Ajouter, modifier, supprimer</div>
                  </div>
                </Button>
                
                <Button 
                  onClick={() => setActiveSection('products')}
                  className="h-16 text-left justify-start bg-green-600 hover:bg-green-700"
                >
                  <Package className="mr-3 h-5 w-5" />
                  <div>
                    <div className="font-medium">Gérer les Produits</div>
                    <div className="text-xs opacity-80">Inventaire et catalogue</div>
                  </div>
                </Button>
                
                <Button 
                  onClick={() => setActiveSection('ordonnances')}
                  className="h-16 text-left justify-start bg-yellow-600 hover:bg-yellow-700"
                >
                  <FileText className="mr-3 h-5 w-5" />
                  <div>
                    <div className="font-medium">Ordonnances</div>
                    <div className="text-xs opacity-80">Gérer les prescriptions</div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
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
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="mt-6 px-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
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
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-2"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h2 className="text-lg font-semibold text-gray-800 capitalize">
                {activeSection === 'dashboard' ? 'Tableau de bord' : 
                 menuItems.find(item => item.id === activeSection)?.label}
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

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default OpticienDashboard;
