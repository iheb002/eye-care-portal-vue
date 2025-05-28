
import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import ClientForm from './forms/ClientForm';

interface Client {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  dateInscription: string;
  derniereVisite: string;
  statut: string;
}

const ClientsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const { toast } = useToast();

  // Données d'exemple
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      nom: 'Dupont',
      prenom: 'Marie',
      email: 'marie.dupont@email.com',
      telephone: '+33 6 12 34 56 78',
      dateInscription: '2023-01-15',
      derniereVisite: '2023-11-20',
      statut: 'Actif'
    },
    {
      id: '2',
      nom: 'Martin',
      prenom: 'Pierre',
      email: 'pierre.martin@email.com',
      telephone: '+33 6 98 76 54 32',
      dateInscription: '2023-03-22',
      derniereVisite: '2023-11-18',
      statut: 'Actif'
    },
    {
      id: '3',
      nom: 'Bernard',
      prenom: 'Sophie',
      email: 'sophie.bernard@email.com',
      telephone: '+33 6 45 67 89 01',
      dateInscription: '2023-02-10',
      derniereVisite: '2023-09-15',
      statut: 'Inactif'
    }
  ]);

  const filteredClients = clients.filter(client =>
    client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'Actif':
        return 'bg-green-100 text-green-800';
      case 'Inactif':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddClient = (data: any) => {
    const newClient: Client = {
      id: Date.now().toString(),
      ...data,
      dateInscription: new Date().toISOString().split('T')[0],
      derniereVisite: new Date().toISOString().split('T')[0],
    };
    setClients([...clients, newClient]);
    setIsAddDialogOpen(false);
    toast({
      title: 'Client ajouté',
      description: 'Le client a été ajouté avec succès.',
    });
  };

  const handleEditClient = (data: any) => {
    if (selectedClient) {
      const updatedClients = clients.map(client =>
        client.id === selectedClient.id ? { ...client, ...data } : client
      );
      setClients(updatedClients);
      setIsEditDialogOpen(false);
      setSelectedClient(null);
      toast({
        title: 'Client modifié',
        description: 'Le client a été modifié avec succès.',
      });
    }
  };

  const handleDeleteClient = (id: string) => {
    const updatedClients = clients.filter(client => client.id !== id);
    setClients(updatedClients);
    toast({
      title: 'Client supprimé',
      description: 'Le client a été supprimé avec succès.',
      variant: 'destructive',
    });
  };

  const handleViewClient = (client: Client) => {
    toast({
      title: 'Affichage du client',
      description: `${client.prenom} ${client.nom} - ${client.email}`,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Clients</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter Client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau client</DialogTitle>
            </DialogHeader>
            <ClientForm
              onSubmit={handleAddClient}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Rechercher un client ..."
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
              <TableHead className="font-semibold whitespace-nowrap">NOM COMPLET</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden md:table-cell">EMAIL</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden lg:table-cell">TÉLÉPHONE</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden xl:table-cell">DATE D'INSCRIPTION</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden xl:table-cell">DERNIÈRE VISITE</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">STATUT</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  <div>
                    <div className="font-medium">{client.prenom} {client.nom}</div>
                    <div className="text-sm text-gray-500 md:hidden">{client.email}</div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{client.email}</TableCell>
                <TableCell className="hidden lg:table-cell">{client.telephone}</TableCell>
                <TableCell className="hidden xl:table-cell">{client.dateInscription}</TableCell>
                <TableCell className="hidden xl:table-cell">{client.derniereVisite}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.statut)}`}>
                    {client.statut}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => handleViewClient(client)}
                      className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                      title="Voir"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedClient(client);
                        setIsEditDialogOpen(true);
                      }}
                      className="p-1 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                      title="Modifier"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteClient(client.id)}
                      className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                      title="Supprimer"
                    >
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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <p className="text-sm text-gray-700">
          Affichage de 1 à {filteredClients.length} sur {clients.length} clients
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier le client</DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <ClientForm
              client={selectedClient}
              onSubmit={handleEditClient}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setSelectedClient(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientsTable;
