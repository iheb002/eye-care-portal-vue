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
  LogOut,
  UserCheck,
  TrendingUp,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductsTable from '@/components/ProductsTable';
import ClientsTable from '@/components/ClientsTable';
import OrdonnancesTable from '@/components/OrdonnancesTable';

const AdminDashboard = () => {
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
    { id: 'users', label: 'Utilisateurs', icon: UserCheck },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'products', label: 'Produits', icon: Package },
    { id: 'ordonnances', label: 'Ordonnances', icon: FileText },
    { id: 'analytics', label: 'Analytique', icon: BarChart3 },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Gestion des Utilisateurs</h2>
            <p className="text-gray-600">Section gestion des utilisateurs en cours de développement...</p>
          </div>
        );
      case 'clients':
        return <ClientsTable />;
      case 'products':
        return <ProductsTable />;
      case 'ordonnances':
        return <OrdonnancesTable />;
      case 'analytics':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Analytique Avancée</h2>
            <p className="text-gray-600">Section analytique avancée en cours de développement...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Paramètres Système</h2>
            <p className="text-gray-600">Section paramètres système en cours de développement...</p>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            {/* Admin Dashboard Overview */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Tableau de bord Administrateur</h2>
              
              {/* Admin Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Total Utilisateurs</p>
                      <p className="text-2xl font-bold text-blue-900">45</p>
                    </div>
                    <UserCheck className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Revenus Totaux</p>
                      <p className="text-2xl font-bold text-green-900">€54,234</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-600 text-sm font-medium">Opticiens Actifs</p>
                      <p className="text-2xl font-bold text-yellow-900">12</p>
                    </div>
                    <Shield className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">Commandes ce mois</p>
                      <p className="text-2xl font-bold text-purple-900">1,847</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>
              
              {/* Admin Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button 
                  onClick={() => setActiveSection('users')}
                  className="h-16 text-left justify-start bg-blue-600 hover:bg-blue-700"
                >
                  <UserCheck className="mr-3 h-5 w-5" />
                  <div>
                    <div className="font-medium">Gérer les Utilisateurs</div>
                    <div className="text-xs opacity-80">Opticiens et administrateurs</div>
                  </div>
                </Button>
                
                <Button 
                  onClick={() => setActiveSection('analytics')}
                  className="h-16 text-left justify-start bg-green-600 hover:bg-green-700"
                >
                  <BarChart3 className="mr-3 h-5 w-5" />
                  <div>
                    <div className="font-medium">Analytique Avancée</div>
                    <div className="text-xs opacity-80">Rapports et statistiques</div>
                  </div>
                </Button>
                
                <Button 
                  onClick={() => setActiveSection('settings')}
                  className="h-16 text-left justify-start bg-purple-600 hover:bg-purple-700"
                >
                  <Settings className="mr-3 h-5 w-5" />
                  <div>
                    <div className="font-medium">Paramètres Système</div>
                    <div className="text-xs opacity-80">Configuration globale</div>
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

      {/* Admin Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-gradient-to-b from-purple-900 to-purple-800 shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-purple-700">
          <h1 className="text-xl font-bold text-white">AdminPanel</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:bg-purple-700"
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
                      ? 'bg-purple-700 text-white border-r-2 border-purple-300' 
                      : 'text-purple-200 hover:bg-purple-700 hover:text-white'
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
        
        {/* Admin Logout Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center bg-transparent border-purple-300 text-purple-200 hover:bg-purple-700 hover:text-white"
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
                {activeSection === 'dashboard' ? 'Tableau de bord Admin' : 
                 menuItems.find(item => item.id === activeSection)?.label}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-sm text-gray-600">
                Bienvenue, Administrateur
              </div>
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
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

export default AdminDashboard;
