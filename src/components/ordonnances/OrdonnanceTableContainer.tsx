
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import OrdonnanceTableView from './OrdonnanceTableView';
import TableHeader from '../shared/TableHeader';
import SearchBar from '../shared/SearchBar';

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

const OrdonnanceTableContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const [ordonnances, setOrdonnances] = useState<Ordonnance[]>([
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

  const filteredOrdonnances = ordonnances.filter(ordonnance =>
    ordonnance.numeroOrdonnance.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ordonnance.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ordonnance.medecin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteOrdonnance = (id: string) => {
    const updatedOrdonnances = ordonnances.filter(ordonnance => ordonnance.id !== id);
    setOrdonnances(updatedOrdonnances);
    toast({
      title: 'Ordonnance supprimée',
      description: 'L\'ordonnance a été supprimée avec succès.',
      variant: 'destructive',
    });
  };

  const handleViewOrdonnance = (ordonnance: Ordonnance) => {
    toast({
      title: 'Affichage de l\'ordonnance',
      description: `${ordonnance.numeroOrdonnance} - ${ordonnance.client}`,
    });
  };

  const handleEditOrdonnance = (ordonnance: Ordonnance) => {
    toast({
      title: 'Modification de l\'ordonnance',
      description: `${ordonnance.numeroOrdonnance} - ${ordonnance.client}`,
    });
  };

  const handleAddOrdonnance = () => {
    toast({
      title: 'Ajouter une ordonnance',
      description: 'Fonctionnalité en cours de développement',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      <TableHeader
        title="Ordonnances"
        buttonText="Ajouter Ordonnance"
        onAddClick={handleAddOrdonnance}
      />

      <div className="flex items-center gap-4 mb-6">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Rechercher une ordonnance ..."
        />
      </div>

      <OrdonnanceTableView
        ordonnances={filteredOrdonnances}
        totalCount={ordonnances.length}
        onView={handleViewOrdonnance}
        onEdit={handleEditOrdonnance}
        onDelete={handleDeleteOrdonnance}
      />
    </div>
  );
};

export default OrdonnanceTableContainer;
