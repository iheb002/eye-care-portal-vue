
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import ActionButtons from '../shared/ActionButtons';
import StatusBadge from '../shared/StatusBadge';

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

interface ClientCardProps {
  client: Client;
  onView: (client: Client) => void;
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
}

const ClientCard: React.FC<ClientCardProps> = ({ client, onView, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <TableRow className="hover:bg-gray-50">
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
        <StatusBadge 
          status={client.actif ? 'Actif' : 'Inactif'} 
          variant={client.actif ? 'success' : 'error'} 
        />
      </TableCell>
      <TableCell>
        <ActionButtons
          onView={() => onView(client)}
          onEdit={() => onEdit(client)}
          onDelete={() => onDelete(client.id)}
        />
      </TableCell>
    </TableRow>
  );
};

export default ClientCard;
