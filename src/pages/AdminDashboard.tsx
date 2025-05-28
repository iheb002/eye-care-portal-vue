
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Eye, 
  Settings, 
  BarChart3, 
  Shield, 
  Database,
  Activity,
  LogOut,
  Bell,
  User,
  Store
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const adminStats = [
    { title: 'Opticiens inscrits', value: '45', icon: Users, color: 'text-blue-600' },
    { title: 'Boutiques actives', value: '32', icon: Store, color: 'text-green-600' },
    { title: 'Examens total', value: '1,248', icon: Eye, color: 'text-purple-600' },
    { title: 'Revenus total', value: '€125,400', icon: BarChart3, color: 'text-orange-600' },
  ];

  const recentOpticiens = [
    { nom: 'Dr. Martin', boutique: 'Optique Centre', status: 'Actif', inscrit: '2024-01-15' },
    { nom: 'Dr. Dubois', boutique: 'Vision Plus', status: 'Actif', inscrit: '2024-01-10' },
    { nom: 'Dr. Laurent', boutique: 'Optic 2000', status: 'Inactif', inscrit: '2024-01-05' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-red-600" />
              <h1 className="text-2xl font-bold text-gray-900">Administration OptiVision</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Bell className="h-5 w-5 text-gray-500" />
              <div className="flex items-center space-x-3">
                <User className="h-6 w-6 text-gray-500" />
                <span className="text-gray-700">{user?.prenom} {user?.nom}</span>
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
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Tableau de bord administrateur
          </h2>
          <p className="text-gray-600">
            Gérez l'ensemble de la plateforme OptiVision
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-100`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Admin Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions administrateur</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <Users className="h-8 w-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Gérer opticiens</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <Store className="h-8 w-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Boutiques</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Statistiques</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                  <Database className="h-8 w-8 text-yellow-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Base de données</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                  <Activity className="h-8 w-8 text-red-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Monitoring</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Settings className="h-8 w-8 text-gray-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Configuration</span>
                </button>
              </div>
            </div>

            {/* Chart Placeholder */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Utilisation de la plateforme</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Graphiques d'analyse disponibles prochainement</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Opticiens */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Opticiens récents</h3>
              <div className="space-y-4">
                {recentOpticiens.map((opticien, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{opticien.nom}</p>
                      <p className="text-sm text-gray-500">{opticien.boutique}</p>
                      <p className="text-xs text-gray-400">Inscrit: {opticien.inscrit}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      opticien.status === 'Actif' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {opticien.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">État du système</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Serveur</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Opérationnel
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Base de données</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Opérationnel
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">API</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    Maintenance
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
