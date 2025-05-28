
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { 
  Eye, 
  Users, 
  Calendar, 
  ShoppingCart, 
  Package, 
  FileText, 
  DollarSign,
  CreditCard,
  BarChart3,
  LogOut,
  Bell,
  User
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductsTable from '../components/ProductsTable';
import ClientsTable from '../components/ClientsTable';
import OrdonnancesTable from '../components/OrdonnancesTable';

const OpticienDashboard = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3, active: activeSection === 'dashboard' },
    { id: 'clients', name: 'Clients', icon: Users, count: 42 },
    { id: 'ordonnances', name: 'Ordonnances', icon: FileText },
    { id: 'rendez-vous', name: 'Rendez-vous', icon: Calendar },
    { id: 'produits', name: 'Produits', icon: Package },
    { id: 'commandes', name: 'Commandes', icon: ShoppingCart },
    { id: 'achats', name: 'Achats', icon: CreditCard },
    { id: 'ventes', name: 'Ventes', icon: DollarSign },
    { id: 'factures', name: 'Factures', icon: FileText },
    { id: 'caisse', name: 'Caisse', icon: CreditCard },
    { id: 'stock', name: 'Stock', icon: Package },
  ];

  const statsCards = [
    { title: 'Clients', value: '42', bgColor: 'bg-blue-500' },
    { title: 'Rendez-vous', value: '18', bgColor: 'bg-green-500' },
    { title: 'Ventes', value: '245', bgColor: 'bg-purple-500' },
    { title: 'Ordonnances', value: '27', bgColor: 'bg-orange-500' },
  ];

  const renderDashboardContent = () => (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Placeholder */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Évolution des ventes
          </h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Graphique à venir</p>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Activités récentes
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Nouveau client ajouté</p>
                <p className="text-sm text-gray-500">Il y a 2 heures</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">RDV confirmé</p>
                <p className="text-sm text-gray-500">Il y a 4 heures</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <FileText className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-medium">Ordonnance créée</p>
                <p className="text-sm text-gray-500">Il y a 6 heures</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white fixed h-full">
        {/* Profile Section */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">{user?.prenom}</h3>
              <p className="text-sm text-gray-400">Opticien</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveSection(item.id)}
              className={`px-6 py-3 flex items-center justify-between hover:bg-gray-700 cursor-pointer ${
                item.active ? 'bg-blue-600' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </div>
              {item.count && (
                <span className="bg-gray-600 text-xs px-2 py-1 rounded-full">
                  {item.count}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {sidebarItems.find(item => item.id === activeSection)?.name || 'Dashboard'}
            </h1>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>
              </div>
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">5</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-700">{user?.email}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Déconnexion</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {activeSection === 'dashboard' && renderDashboardContent()}
          {activeSection === 'clients' && <ClientsTable />}
          {activeSection === 'ordonnances' && <OrdonnancesTable />}
          {activeSection === 'produits' && <ProductsTable />}
          {(activeSection !== 'dashboard' && activeSection !== 'clients' && activeSection !== 'ordonnances' && activeSection !== 'produits') && (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Section en développement
              </h3>
              <p className="text-gray-600">
                Cette section sera bientôt disponible.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpticienDashboard;
