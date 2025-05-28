
import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface Ordonnance {
  id: string;
  numeroOrdonnance: string;
  client: string;
  dateCreation: string;
  dateValidite: string;
  medecin: string;
  statut: string;
  type: string;
}

const OrdonnancesTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Données d'exemple
  const ordonnances: Ordonnance[] = [
    {
      id: '1',
      numeroOrdonnance: 'ORD-001',
      client: 'Marie Dupont',
      dateCreation: '2023-11-15',
      dateValidite: '2024-11-15',
      medecin: 'Dr. Lemaire',
      statut: 'Valide',
      type: 'Vision de près'
    },
    {
      id: '2',
      numeroOrdonnance: 'ORD-002',
      client: 'Pierre Martin',
      dateCreation: '2023-11-10',
      dateValidite: '2024-11-10',
      medecin: 'Dr. Rousseau',
      statut: 'Valide',
      type: 'Progressif'
    },
    {
      id: '3',
      numeroOrdonnance: 'ORD-003',
      client: 'Sophie Bernard',
      dateCreation: '2023-08-20',
      dateValidite: '2024-08-20',
      medecin: 'Dr. Moreau',
      statut: 'Expire bientôt',
      type: 'Vision de loin'
    }
  ];

  const filteredOrdonnances = ordonnances.filter(ordonnance =>
    ordonnance.numeroOrdonnance.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ordonnance.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ordonnance.medecin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'Valide':
        return 'bg-green-100 text-green-800';
      case 'Expire bientôt':
        return 'bg-yellow-100 text-yellow-800';
      case 'Expiré':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Ordonnances</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter Ordonnance
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Rechercher une ordonnance ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">N° ORDONNANCE</TableHead>
              <TableHead className="font-semibold">CLIENT</TableHead>
              <TableHead className="font-semibold">DATE DE CRÉATION</TableHead>
              <TableHead className="font-semibold">DATE DE VALIDITÉ</TableHead>
              <TableHead className="font-semibold">MÉDECIN</TableHead>
              <TableHead className="font-semibold">TYPE</TableHead>
              <TableHead className="font-semibold">STATUT</TableHead>
              <TableHead className="font-semibold">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrdonnances.map((ordonnance) => (
              <TableRow key={ordonnance.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{ordonnance.numeroOrdonnance}</TableCell>
                <TableCell>{ordonnance.client}</TableCell>
                <TableCell>{ordonnance.dateCreation}</TableCell>
                <TableCell>{ordonnance.dateValidite}</TableCell>
                <TableCell>{ordonnance.medecin}</TableCell>
                <TableCell>{ordonnance.type}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ordonnance.statut)}`}>
                    {ordonnance.statut}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-1 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200">
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-700">
          Affichage de 1 à {filteredOrdonnances.length} sur {ordonnances.length} ordonnances
        </p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
            Précédent
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdonnancesTable;
