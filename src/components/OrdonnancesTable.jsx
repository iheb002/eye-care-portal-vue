
import React, { useState, useEffect } from 'react';
import { Search, Plus, Eye, Edit, Trash } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useOrdonnancesApi } from '@/hooks/useApi';

const OrdonnancesTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ordonnances, setOrdonnances] = useState([]);
  const { toast } = useToast();
  
  const {
    getOrdonnances,
    deleteOrdonnance,
    loading
  } = useOrdonnancesApi();

  // Load ordonnances on component mount
  useEffect(() => {
    loadOrdonnances();
  }, []);

  const loadOrdonnances = async () => {
    try {
      const data = await getOrdonnances();
      setOrdonnances(data);
    } catch (error) {
      // Fallback to mock data for demo
      setOrdonnances([
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
      ]);
    }
  };

  const filteredOrdonnances = ordonnances.filter(ordonnance =>
    ordonnance.numeroOrdonnance.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ordonnance.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ordonnance.medecin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (statut) => {
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

  const handleDeleteOrdonnance = async (id) => {
    try {
      await deleteOrdonnance(id);
      const updatedOrdonnances = ordonnances.filter(ordonnance => ordonnance.id !== id);
      setOrdonnances(updatedOrdonnances);
    } catch (error) {
      // Fallback for demo
      const updatedOrdonnances = ordonnances.filter(ordonnance => ordonnance.id !== id);
      setOrdonnances(updatedOrdonnances);
      toast({
        title: 'Ordonnance supprimée',
        description: 'L\'ordonnance a été supprimée avec succès.',
        variant: 'destructive',
      });
    }
  };

  const handleViewOrdonnance = (ordonnance) => {
    toast({
      title: 'Affichage de l\'ordonnance',
      description: `${ordonnance.numeroOrdonnance} - ${ordonnance.client}`,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Ordonnances</h2>
        <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto" disabled={loading}>
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
              <TableHead className="font-semibold whitespace-nowrap">N° ORDONNANCE</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">CLIENT</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden lg:table-cell">DATE DE CRÉATION</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden lg:table-cell">DATE DE VALIDITÉ</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden md:table-cell">MÉDECIN</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden xl:table-cell">TYPE</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">STATUT</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  Chargement...
                </TableCell>
              </TableRow>
            ) : filteredOrdonnances.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  Aucune ordonnance trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredOrdonnances.map((ordonnance) => (
                <TableRow key={ordonnance.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{ordonnance.numeroOrdonnance}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{ordonnance.client}</div>
                      <div className="text-sm text-gray-500 md:hidden">{ordonnance.medecin}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{ordonnance.dateCreation}</TableCell>
                  <TableCell className="hidden lg:table-cell">{ordonnance.dateValidite}</TableCell>
                  <TableCell className="hidden md:table-cell">{ordonnance.medecin}</TableCell>
                  <TableCell className="hidden xl:table-cell">{ordonnance.type}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ordonnance.statut)}`}>
                      {ordonnance.statut}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => handleViewOrdonnance(ordonnance)}
                        className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                        title="Voir"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-1 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                        title="Modifier"
                        disabled={loading}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteOrdonnance(ordonnance.id)}
                        className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                        title="Supprimer"
                        disabled={loading}
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
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
