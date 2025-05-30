
import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import ClientForm from './forms/ClientForm';

interface Client {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address?: string;
  actif: boolean;
  createdAt: string;
  updatedAt?: string;
}

const ClientsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const { toast } = useToast();

  // Données d'exemple avec la nouvelle structure
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Dupont',
      surname: 'Marie',
      email: 'marie.dupont@email.com',
      phone: '+33 6 12 34 56 78',
      address: '123 Rue de la Paix, Paris',
      actif: true,
      createdAt: '2023-01-15T00:00:00Z'
    },
    {
      id: '2',
      name: 'Martin',
      surname: 'Pierre',
      email: 'pierre.martin@email.com',
      phone: '+33 6 98 76 54 32',
      address: '456 Avenue des Champs, Lyon',
      actif: true,
      createdAt: '2023-03-22T00:00:00Z'
    },
    {
      id: '3',
      name: 'Bernard',
      surname: 'Sophie',
      email: 'sophie.bernard@email.com',
      phone: '+33 6 45 67 89 01',
      address: '789 Boulevard Central, Marseille',
      actif: false,
      createdAt: '2023-02-10T00:00:00Z'
    }
  ]);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (actif: boolean) => {
    return actif ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getStatusText = (actif: boolean) => {
    return actif ? 'Actif' : 'Inactif';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const handleAddClient = (data: any) => {
    const newClient: Client = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
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
        client.id === selectedClient.id ? { ...client, ...data, updatedAt: new Date().toISOString() } : client
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
      description: `${client.surname} ${client.name} - ${client.email}`,
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
              <TableHead className="font-semibold whitespace-nowrap hidden xl:table-cell">ADRESSE</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden xl:table-cell">DATE D'INSCRIPTION</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">STATUT</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  <div>
                    <div className="font-medium">{client.surname} {client.name}</div>
                    <div className="text-sm text-gray-500 md:hidden">{client.email}</div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{client.email}</TableCell>
                <TableCell className="hidden lg:table-cell">{client.phone}</TableCell>
                <TableCell className="hidden xl:table-cell">{client.address || '-'}</TableCell>
                <TableCell className="hidden xl:table-cell">{formatDate(client.createdAt)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.actif)}`}>
                    {getStatusText(client.actif)}
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
