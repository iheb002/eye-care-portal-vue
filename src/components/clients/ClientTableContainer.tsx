
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import ClientForm from '../forms/ClientForm';
import ClientTableView from './ClientTableView';
import TableHeader from '../shared/TableHeader';
import SearchBar from '../shared/SearchBar';

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

const ClientTableContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const { toast } = useToast();

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

  const handleEditClick = (client: Client) => {
    setSelectedClient(client);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      <TableHeader
        title="Clients"
        buttonText="Ajouter Client"
        onAddClick={() => setIsAddDialogOpen(true)}
      />

      <div className="flex items-center gap-4 mb-6">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Rechercher un client ..."
        />
      </div>

      <ClientTableView
        clients={filteredClients}
        totalCount={clients.length}
        onView={handleViewClient}
        onEdit={handleEditClick}
        onDelete={handleDeleteClient}
      />

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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

export default ClientTableContainer;
