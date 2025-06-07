
import { Home, Users, Package, FileText, BarChart3, Settings } from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  icon: any;
}

export const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Tableau de bord', icon: Home },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'products', label: 'Produits', icon: Package },
  { id: 'ordonnances', label: 'Ordonnances', icon: FileText },
  { id: 'analytics', label: 'Analytique', icon: BarChart3 },
  { id: 'settings', label: 'Paramètres', icon: Settings },
];
